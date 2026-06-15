const express = require("express");
require("./schema");

const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "backend funktioniert"
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});