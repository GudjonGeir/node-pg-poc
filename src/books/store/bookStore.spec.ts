import BookStore from "./bookStore";
import { Pool } from "pg";
import { BookInsert, BookUpdate } from "../models/Book";
import { AuthorInsert, AuthorUpdate } from "../models/Author";

describe("bookStore", () => {
  const pool = new Pool({
    user: "postgres",
    host: "127.0.0.1",
    database: "postgres",
    port: 5432,
  });
  const store = new BookStore(pool);

  describe("addBook", () => {
    it("should add a book", async () => {
      const book: BookInsert = {
        name: "The Fellowship of the Ring",
        publishDate: new Date("1954-06-29T00:00:00.000Z"),
      };
      const result = await store.addBook(book);
      expect(result.name).toEqual(book.name);
      expect(result.publishDate?.toISOString()).toEqual(
        book.publishDate?.toISOString()
      );
    });

    it("should add a without publishDate", async () => {
      const book: BookInsert = {
        name: "The Fellowship of the Ring",
      };
      const result = await store.addBook(book);
      expect(result.name).toEqual(book.name);
      expect(result.publishDate).toEqual(null);
    });
  });

  describe("getBook", () => {
    it("should get a book that exists", async () => {
      const book: BookInsert = {
        name: "The Two Towers",
        publishDate: new Date("1954-11-11T00:00:00.000Z"),
      };
      const insertedBook = await store.addBook(book);

      const result = await store.getBook(insertedBook.id);
      expect(result).not.toBeNull();
      expect(result?.name).toEqual(book.name);
      expect(result?.publishDate?.toISOString()).toEqual(
        book.publishDate?.toISOString()
      );
    });

    it("should return null if book does not exist", async () => {
      const result = await store.getBook(-1);
      expect(result).toBeNull();
    });
  });

  describe("updateBook", () => {
    it("should update a book that exists", async () => {
      const book: BookInsert = {
        name: "The Two Towers",
        publishDate: new Date("1954-11-11T00:00:00.000Z"),
      };
      const insertedBook = await store.addBook(book);

      const bookUpdate: BookUpdate = {
        id: insertedBook.id,
        name: "The Return of the King",
        publishDate: new Date("1955-10-20T00:00:00.000Z"),
      };
      await store.updateBook(bookUpdate);

      const result = await store.getBook(insertedBook.id);
      expect(result).not.toBeNull();
      expect(result?.name).toEqual(bookUpdate.name);
      expect(result?.publishDate?.toISOString()).toEqual(
        bookUpdate.publishDate?.toISOString()
      );
    });

    it("should not update a book that does not exists", async () => {
      const bookUpdate: BookUpdate = {
        id: -1,
        name: "The Return of the King",
        publishDate: new Date("1955-10-20T00:00:00.000Z"),
      };
      await expect(store.updateBook(bookUpdate)).rejects.toThrow(
        "Book with id -1 not found"
      );
    });
  });

  describe("addAuthor", () => {
    it("should add a book", async () => {
      const author: AuthorInsert = {
        name: "J. R. R. Tolkien",
        dateOfBirth: "1892-01-03",
        bio: "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.",
      };
      const result = await store.addAuthor(author);
      expect(result.name).toEqual(author.name);
      expect(result.dateOfBirth).toEqual(author.dateOfBirth);
      expect(result.bio).toEqual(author.bio);
    });

    it("should add a without dateOfBirth", async () => {
      const author: AuthorInsert = {
        name: "J. R. R. Tolkien",
        bio: "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.",
      };
      const result = await store.addAuthor(author);
      expect(result.name).toEqual(author.name);
      expect(result.dateOfBirth).toBeNull();
      expect(result.bio).toEqual(author.bio);
    });

    it("should add a book without bio", async () => {
      const author: AuthorInsert = {
        name: "J. R. R. Tolkien",
        dateOfBirth: "1892-01-03",
      };
      const result = await store.addAuthor(author);
      expect(result.name).toEqual(author.name);
      expect(result.dateOfBirth).toEqual(author.dateOfBirth);
      expect(result.bio).toBeNull();
    });
  });

  describe("getAuthor", () => {
    it("should get an author that exists", async () => {
      const author: AuthorInsert = {
        name: "J. R. R. Tolkien",
        dateOfBirth: "1892-01-03",
        bio: "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.",
      };
      const insertedAuthor = await store.addAuthor(author);

      const result = await store.getAuthor(insertedAuthor.id);
      expect(result).not.toBeNull();
      expect(result?.name).toEqual(author.name);
      expect(result?.dateOfBirth).toEqual(author.dateOfBirth);
      expect(result?.bio).toEqual(author.bio);
    });

    it("should return null if book does not exist", async () => {
      const result = await store.getAuthor(-1);
      expect(result).toBeNull();
    });
  });

  describe("updateAuthor", () => {
    it("should update an author that exists", async () => {
      const author: AuthorInsert = {
        name: "J. R. R. Tolkien",
        dateOfBirth: "1892-01-03",
        bio: "John Ronald Reuel Tolkien CBE FRSL was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.",
      };
      const insertedAuthor = await store.addAuthor(author);

      const authorUpdate: AuthorUpdate = {
        id: insertedAuthor.id,
        name: "C. S. Lewis",
        dateOfBirth: "1898-11-29",
        bio: "Clive Staples Lewis was a British writer and lay theologian. He held academic positions in English literature at both Oxford University and Cambridge University",
      };
      await store.updateAuthor(authorUpdate);

      const result = await store.getAuthor(insertedAuthor.id);
      expect(result).not.toBeNull();
      expect(result?.name).toEqual(authorUpdate.name);
      expect(result?.dateOfBirth).toEqual(authorUpdate.dateOfBirth);
      expect(result?.bio).toEqual(authorUpdate.bio);
    });

    it("should not update a book that does not exists", async () => {
      const authorUpdate: AuthorUpdate = {
        id: -1,
        name: "C. S. Lewis",
        dateOfBirth: "1898-11-29",
        bio: "Clive Staples Lewis was a British writer and lay theologian. He held academic positions in English literature at both Oxford University and Cambridge University",
      };
      await expect(store.updateAuthor(authorUpdate)).rejects.toThrow(
        "Author with id -1 not found"
      );
    });
  });

  afterAll(() => {
    pool.end();
  });
});
