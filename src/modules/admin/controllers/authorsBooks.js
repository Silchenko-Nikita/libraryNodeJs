const db = require('../../../db/knexConfig');
const { CREATED, UPDATED, DELETED} = require('../../../constants');

async function getAuthorsByBook(req, res) {
    const { bookId } = req.params;

    try {
        const authors = await db('authors')
            .join('authors_books', 'authors.id', 'authors_books.author_id')
            .where('authors_books.book_id', bookId)
            .select('authors.*');

        return res.status(200).json({ authors });
    } catch (error) {
        console.error('Error in authors_books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function getBooksByAuthor(req, res) {
    const { authorId } = req.params;

    try {
        const books = await db('books')
            .join('authors_books', 'books.id', 'authors_books.book_id')
            .where('authors_books.author_id', authorId)
            .select('books.*');

        return res.status(200).json({ books });
    } catch (error) {
        console.error('Error in authors_books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function addAuthorToBook(req, res) {
    const { bookId, authorId } = req.params;

    try {
        // Check if the association already exists
        const existingAssociation = await db('authors_books')
            .where({ book_id: bookId, author_id: authorId })
            .first();

        if (existingAssociation) {
            return res.status(400).json({ message: 'Association already exists' });
        }

        await db('authors_books').insert({
            book_id: bookId,
            author_id: authorId
        });

        return res.status(201).json({ message: 'Author added to book' });
    } catch (error) {
        console.error('Error in authors_books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function removeAuthorFromBook(req, res) {
    const { bookId, authorId } = req.params;

    try {
        const association = await db('authors_books')
            .where({ book_id: bookId, author_id: authorId })
            .first();

        if (!association) {
            return res.status(404).json({ message: 'Association not found' });
        }

        await db('authors_books')
            .where({ book_id: bookId, author_id: authorId })
            .del();

        return res.status(200).json({ message: 'Author removed from book' });
    } catch (error) {
        console.error('Error in authors_books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

module.exports = {
    getAuthorsByBook,
    getBooksByAuthor,
    addAuthorToBook,
    removeAuthorFromBook
};
