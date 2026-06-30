const db = require("./database");

class MemberRepository {

    getAll(callback) {
        db.all("SELECT * FROM Member", [], callback);
    }

    create(name, householdId, callback) {
        db.run(
            "INSERT INTO Member (name, householdId) VALUES (?, ?)",
            [name, householdId],
            callback
        );
    }

    delete(id, callback) {
        db.run(
            "DELETE FROM Member WHERE id = ?",
            [id],
            callback
        );
    }
}

module.exports = new MemberRepository();