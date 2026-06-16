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

app.get("/household", (req, res) => {

    db.get(
        "SELECT * FROM Household LIMIT 1",
        [],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(row);
        }
    );

});

app.put("/household", (req, res) => {

    const { name } = req.body;

    if (!name || name.trim() === "") {
    return res.status(400).json({
        error: "Name darf nicht leer sein"
    });
}

    const now = new Date().toISOString();

    db.run(
        `
        UPDATE Household
        SET name = ?, updatedAt = ?
        WHERE id = 1
        `,
        [name, now],
        function(err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Haushalt aktualisiert"
            });
        }
    );

});

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});