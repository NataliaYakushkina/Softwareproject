const db = require("./database");

class TaskRepository {

    getAll(callback) {

        db.all(
            "SELECT * FROM Task",
            [],
            callback
        );

    }

    getByWeek(week, callback) {

        db.all(
            "SELECT * FROM Task WHERE week = ?",
            [week],
            callback
        );

    }

    create(title, description, week, assignedMemberId, createdByMemberId, householdId, callback) {

        db.run(
            `
            INSERT INTO Task
            (title, description, status, week, assignedMemberId, createdByMemberId, householdId)
            VALUES (?, ?, 'open', ?, ?, ?, ?)
            `,
            [
                title,
                description,
                week,
                assignedMemberId,
                createdByMemberId,
                householdId
            ],
            callback
        );

    }

    update(id, title, description, week, assignedMemberId, callback) {

        db.run(
            `
            UPDATE Task
            SET
                title = ?,
                description = ?,
                week = ?,
                assignedMemberId = ?
            WHERE id = ?
            `,
            [
                title,
                description,
                week,
                assignedMemberId,
                id
            ],
            callback
        );

    }

    updateStatus(id, status, callback) {

        db.run(
            `
            UPDATE Task
            SET status = ?
            WHERE id = ?
            `,
            [
                status,
                id
            ],
            callback
        );

    }

    delete(id, callback) {

        db.run(
            "DELETE FROM Task WHERE id = ?",
            [id],
            callback
        );

    }

}

module.exports = new TaskRepository();