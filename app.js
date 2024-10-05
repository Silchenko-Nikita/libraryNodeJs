const express = require('express');
const { Router } = require('express');
const cors = require('cors');
const { createLibraryRouter } = require("./src/modules/admin/routes/routes");
const { registerUser, loginUser } = require('./src/modules/admin/controllers/authController');
const { validateRegistrationFields } = require("./registrationValidator.js")

const app = express();

app.use(cors());

function addApiRoutes() {
    const router = Router();
    router.use("/library", createLibraryRouter());
    return router;
}

app.post('/api/register', validateRegistrationFields, registerUser);
app.post('/api/login', loginUser);

app.use("/api", addApiRoutes());

app.get("/", (req, res) =>
    res.status(200).json("Health check works"));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
