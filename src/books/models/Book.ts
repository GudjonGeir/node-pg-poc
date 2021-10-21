type Book = {
  id: number;
  name: string;
  publishDate?: Date;
};

type BookInsert = {
  name: string;
  publishDate?: Date;
};

type BookUpdate = {
  id: number;
  name: string;
  publishDate?: Date;
};

export { Book, BookInsert, BookUpdate };
