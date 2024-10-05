const db = require('../../../db/knexConfig');
const { CREATED, UPDATED, DELETED} = require('../../../constants');

async function getBookFromDB(id) {
    return db.select("*").from('books').where("id", id).first();
}

async function getAllBooks(req, res) {
    try {
        const books = await db.select("*").from('books');
        console.log(books);
        return res.status(200).json({ books });
    } catch (error) {
        console.error('Error in books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function getBookById(req, res) {
    const { id } = req.params;

    try {
        const book = await getBookFromDB(id);

        if (!book) {
            return res.status(404).json({ "message": "entity not found" });
        }

        console.log(book);
        return res.status(200).json({ book });
    } catch (error) {
        console.error('Error in books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function createBook(req, res) {
    const { name, publishDate } = req.query;

    const objToDb = { name: name, publish_date: publishDate };

    try {
        const newBook = await db("books").insert(objToDb).returning("*");
        console.log(newBook);
        return res.status(201).json({ message: CREATED, newBook });
    } catch (error) {
        console.error('Error in books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function updateBook(req, res) {
    const { id, name, publishDate } = req.query;

    const objToDb = { name: name, publish_date: publishDate };

    try {
        const book = await getBookFromDB(id);

        if (!book) {
            return res.status(404).json({ "message": "entity not found" });
        }

        const updatedBook = await db("books").update(objToDb).where("id", id).returning("*");
        console.log(updatedBook);
        return res.status(200).json({ message: UPDATED, updatedBook });
    } catch (error) {
        console.error('Error in books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function deleteBook(req, res) {
    const { id } = req.query;

    try {
        const book = await getBookFromDB(id);

        if (!book) {
            return res.status(404).json({ "message": "entity not found" });
        }

        await db("books").where("id", id).delete();

        return res.status(200).json({ message: DELETED });
    } catch (error) {
        console.error('Error in books.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };