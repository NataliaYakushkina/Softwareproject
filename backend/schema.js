const db = require("./database");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS Household (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            createdAt TEXT,
            updatedAt TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Member (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            householdId INTEGER,
            joinedAt TEXT,
            role TEXT,

            FOREIGN KEY (householdId) REFERENCES Household(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            assignedMemberId INTEGER,
            householdId INTEGER,
            status TEXT DEFAULT 'open',
            week TEXT,
            createdAt TEXT,
            completedAt TEXT,
            createdByMemberId INTEGER,

            FOREIGN KEY (assignedMemberId) REFERENCES Member(id),
            FOREIGN KEY (householdId) REFERENCES Household(id),
            FOREIGN KEY (createdByMemberId) REFERENCES Member(id)
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS HouseholdSettings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            householdId INTEGER,
            theme TEXT,
            weekStartDay INTEGER,
            updatedAt TEXT,

            FOREIGN KEY (householdId) REFERENCES Household(id)
        )
    `);

    console.log("Datenbanktabellen erstellt.");
});