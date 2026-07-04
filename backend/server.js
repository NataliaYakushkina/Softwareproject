const express = require("express");
const cors = require("cors");
require("./schema");

const db = require("./database");
const initializeDatabase = require("./init");
const memberController = require("./member-controller");
const taskController = require("./task-controller");

const fairness = require("./fairness");

fairness.getSuggestion((err, member) => {
    console.log(member);
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
    res.json({
        message: "backend funktioniert"
    });
});

app.get("/members", (req, res) => {
    memberController.getMembers(req, res);
});

app.post("/members", (req, res) => {
    memberController.createMember(req, res);
});

app.delete("/members/:id", (req, res) => {
    memberController.deleteMember(req, res);
});


app.get("/tasks", (req, res) => {
    taskController.getTasks(req, res);
});

app.post("/tasks", (req, res) => {
    taskController.createTask(req, res);
});

app.put("/tasks/:id", (req, res) => {
    taskController.updateTask(req, res);
});

app.patch("/tasks/:id/status", (req, res) => {
    taskController.updateTaskStatus(req, res);
});

app.delete("/tasks/:id", (req, res) => {
    taskController.deleteTask(req, res);
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