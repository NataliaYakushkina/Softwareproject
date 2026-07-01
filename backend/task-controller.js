const taskRepository = require("./task-repository");

class TaskController {

    getTasks(req, res) {

        const week = req.query.week;

        const weekPattern = /^\d{4}-W\d{2}$/;

        if (week && !weekPattern.test(week)) {
            return res.status(400).json({
                error: "Ungültiges Wochenformat. Beispiel: 2026-W24"
            });
        }

        if (week) {

            taskRepository.getByWeek(week, (err, rows) => {

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json(rows);

            });

        } else {

            taskRepository.getAll((err, rows) => {

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.json(rows);

            });

        }

    }

    createTask(req, res) {

        const {
            title,
            description,
            week,
            assignedMemberId,
            createdByMemberId,
            householdId
        } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Titel darf nicht leer sein"
            });
        }

        taskRepository.create(
            title,
            description,
            week,
            assignedMemberId,
            createdByMemberId,
            householdId,
            function (err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.status(201).json({
                    message: "Aufgabe erstellt"
                });

            }
        );

    }

    updateTask(req, res) {

        const id = req.params.id;

        const {
            title,
            description,
            week,
            assignedMemberId
        } = req.body;

        taskRepository.update(
            id,
            title,
            description,
            week,
            assignedMemberId,
            function (err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json({
                    message: "Aufgabe aktualisiert"
                });

            }
        );

    }

    updateTaskStatus(req, res) {

        const id = req.params.id;
        const { status } = req.body;

        taskRepository.updateStatus(
            id,
            status,
            function (err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json({
                    message: "Status aktualisiert"
                });

            }
        );

    }

    deleteTask(req, res) {

        const id = req.params.id;

        taskRepository.delete(
            id,
            function (err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json({
                    message: "Aufgabe gelöscht"
                });

            }
        );

    }

}

module.exports = new TaskController();