const {Router} = require("express");
const {getAllAuthors, createAuthor, updateAuthor, deleteAuthor, getAuthorById} = require("../controllers/authors");
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require("../controllers/books");
const {getAuthorsByBook, getBooksByAuthor, addAuthorToBook, removeAuthorFromBook} = require('../controllers/authorsBooks');
const {authenticateToken} = require('../../../helper/helper');

function createLibraryRouter() {
    const router = Router()
    router.get("/authors", getAllAuthors)
    router.get("/author/:id", getAuthorById)
    router.post("/author", authenticateToken, createAuthor)
    router.put("/author", authenticateToken, updateAuthor)
    router.delete("/author", authenticateToken, deleteAuthor)

    router.get("/books", getAllBooks)
    router.get("/book/:id", getBookById)
    router.post("/book", authenticateToken, createBook)
    router.put("/book", authenticateToken, updateBook)
    router.delete("/book", authenticateToken, deleteBook)

    router.get('/books/:bookId/authors', getAuthorsByBook);
    router.get('/authors/:authorId/books', getBooksByAuthor);
    router.post('/books/:bookId/authors/:authorId', authenticateToken, addAuthorToBook);
    router.delete('/books/:bookId/authors/:authorId', authenticateToken, removeAuthorFromBook);

    //
    // router.get("/employees", )
    // router.post("/employee", )
    // router.put("/employee", )
    // router.delete("/employee", )
    return router
}

module.exports = {
    createLibraryRouter
}