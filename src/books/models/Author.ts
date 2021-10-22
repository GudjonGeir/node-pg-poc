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

type AuthorUpdate = {
  id: number;
  name: string;
  dateOfBirth?: string;
  bio?: string;
};
export { Author, AuthorInsert, AuthorUpdate };
