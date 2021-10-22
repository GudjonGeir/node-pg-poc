type Author = {
  id: number;
  name: string;
  dateOfBirth?: string;
  bio?: string;
};

type AuthorInsert = {
  name: string;
  dateOfBirth?: string;
  bio?: string;
};
export { Author, AuthorInsert };
