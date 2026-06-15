const express = require("express");
require("./schema");

const db = require("./database");
const initializeDatabase = require("./init");

const app = express();
const PORT = 3000;

app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.json({
        message: "backend funktioniert"
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});