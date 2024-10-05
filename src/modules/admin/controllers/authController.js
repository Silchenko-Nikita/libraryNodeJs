const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../../db/knexConfig');
require('dotenv').config()

const { SECRET_KEY } = process.env

async function registerUser(req, res) {
    const { nickname, firstName, lastName, birthdate, password } = req.query;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userToDb = {
            nickname,
            first_name: firstName,
            last_name: lastName,
            birthdate,
            password: hashedPassword,
        };

        const [newUser] = await db('users')
            .insert(userToDb)
            .returning(['id', 'nickname', 'first_name', 'last_name', 'birthdate']);

        const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '100d' });

        return res.status(201).json({ message: "User registered", token });
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

async function loginUser(req, res) {
    const { nickname, password } = req.query;

    try {
        const user = await db('users')
            .where({ nickname })
            .first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '100d' });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({ message: error.message || 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
