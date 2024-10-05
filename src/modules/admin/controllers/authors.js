const db = require('../../../db/knexConfig');
const { CREATED, UPDATED, DELETED} = require('../../../constants');

async function getAuthorFromDB(id) {
    return db.select("*").from('authors').where("id", id).first();
}

async function getAllAuthors(req, res) {
    try {
        const authors = await db.select("*").from('authors');
        console.log(authors);
        return res.status(200).json({ authors });
    } catch (error) {
        console.error('Error in authors.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function getAuthorById(req, res) {
    const { id } = req.params;

    try {
        const author = await getAuthorFromDB(id);

        if (!author) {
            return res.status(404).json({ "message": "entity not found" });
        }

        console.log(author);
        return res.status(200).json({ author });
    } catch (error) {
        console.error('Error in authors.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function createAuthor(req, res) {
    const { firstName, lastName, birthdate } = req.query;

    const objToDb = { first_name: firstName, last_name: lastName, birthdate };

    try {
        const newAuthor = await db("authors").insert(objToDb).returning("*");
        console.log(newAuthor);
        return res.status(201).json({ message: CREATED, newAuthor });
    } catch (error) {
        console.error('Error in authors.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function updateAuthor(req, res) {
    const { id, firstName, lastName, birthdate } = req.query;

    const objToDb = { first_name: firstName, last_name: lastName, birthdate };

    try {
        const author = await getAuthorFromDB(id);

        if (!author) {
            return res.status(404).json({ "message": "entity not found" });
        }

        const updatedAuthor = await db("authors").update(objToDb).where("id", id).returning("*");
        console.log(updatedAuthor);
        return res.status(200).json({ message: UPDATED, updatedAuthor });
    } catch (error) {
        console.error('Error in authors.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

async function deleteAuthor(req, res) {
    const { id } = req.query;

    try {
        const author = await getAuthorFromDB(id);

        if (!author) {
            return res.status(404).json({ "message": "entity not found" });
        }

        await db("authors").where("id", id).delete();

        return res.status(200).json({ message: DELETED });
    } catch (error) {
        console.error('Error in authors.js', error);
        return res.status(400).json({ message: error.message || error });
    }
}

module.exports = { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };