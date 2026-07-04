const db = require("./database");

class Fairness {

    getSuggestion(callback) {

        db.all(
            "SELECT * FROM Member",
            [],
            (err, members) => {

                if (err) {
                    return callback(err);
                }

                if (members.length === 0) {
                    return callback(null, null);
                }

                let bestMember = null;
                let lowestCompleted = Number.MAX_SAFE_INTEGER;

                let remaining = members.length;

                members.forEach((member) => {

                    db.get(
                        `
                        SELECT COUNT(*) AS completed
                        FROM Task
                        WHERE assignedMemberId = ?
                        AND status = 'completed'
                        `,
                        [member.id],
                        (err, row) => {

                            if (err) {
                                return callback(err);
                            }

                            if (row.completed < lowestCompleted) {
                                lowestCompleted = row.completed;
                                bestMember = member;
                            }

                            remaining--;

                            if (remaining === 0) {
                                callback(null, bestMember);
                            }

                        }
                    );

                });

            }
        );

    }

}

module.exports = new Fairness();