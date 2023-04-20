import Database from 'better-sqlite3';

const loggedInUser = {
    username: "",
    isAdmin: false
}
const database = new Database('library.db')

export { loggedInUser, database }
