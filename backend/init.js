const db = require("./database");

function initializeDatabase() {

    db.get(
        "SELECT * FROM Household LIMIT 1",
        [],
        (err, row) => {

            if (err) {
                console.error("Fehler bei Initialisierung:", err.message);
                return;
            }

            if (!row) {

                const now = new Date().toISOString();

                db.run(
                    `
                    INSERT INTO Household
                    (name, createdAt, updatedAt)
                    VALUES (?, ?, ?)
                    `,
                    ["Mein Haushalt", now, now],
                    function(err) {

                        if (err) {
                            console.error("Fehler beim Anlegen des Haushalts:", err.message);
                            return;
                        }

                        console.log("Default-Haushalt erstellt.");
                    }
                );

            } else {
                console.log("Haushalt existiert bereits.");
            }

        }
    );

}

module.exports = initializeDatabase;