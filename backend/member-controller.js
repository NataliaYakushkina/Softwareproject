const memberRepository = require("./member-repository");

class MemberController {

    getMembers(req, res) {
        memberRepository.getAll((err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        });
    }

    createMember(req, res) {

        const { name, householdId } = req.body;

        if (!name || name.trim() === "") {
            return res.status(400).json({
                error: "Name darf nicht leer sein"
            });
        }

        memberRepository.create(
            name,
            householdId,
            function(err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.status(201).json({
                    id: this.lastID,
                    name,
                    householdId
                });
            }
        );
    }

    deleteMember(req, res) {

        memberRepository.delete(
            req.params.id,
            function(err) {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json({
                    message: "Mitglied gelöscht"
                });
            }
        );
    }
}

module.exports = new MemberController();