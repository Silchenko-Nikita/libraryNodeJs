function validateRegistrationFields(req, res, next) {
    const { nickname, firstName, lastName, birthdate, password } = req.query;

    if (!nickname || !password) {
        return res.status(400).json({ message: 'Required fields: nickname, password' });
    }

    if (nickname.length > 32 || (firstName && firstName.length > 32) || (lastName && lastName.length > 32)) {
        return res.status(400).json({ message: 'Nickname, firstName, and lastName should not exceed 32 characters' });
    }

    if (birthdate && isNaN(Date.parse(birthdate))) {
        return res.status(400).json({ message: 'Invalid birthdate format' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    next();
}

module.exports = { validateRegistrationFields };