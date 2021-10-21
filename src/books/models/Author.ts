
type Author = {
  id: number,
  name: string,
  dateOfBirth?: string
}

type AuthorInsert = {
  name: string,
  dateOfBirth?: string
}
export {
  Author,
  AuthorInsert,
}
