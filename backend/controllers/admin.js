const db = require('../connection/connection');
const bcrypt = require('bcrypt');


//get all data
exports.Connect = (req, res) => {
    let username=req.params.username
    let pwd=req.params.pwd
    let qr = `select * from admin where username="${username}" and pwd="${pwd}"`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données l'admin."
            });
        }
        if (result.length > 0) {
            // Si des données sont trouvées, renvoyer une réponse avec le code de statut 200 (OK)
            return res.status(200).send({
                message: "Connecter avec succee.",
                data: result
            });
        } else {
            // Si aucune donnée n'est trouvée, renvoyer une réponse avec le code de statut 404 (Non trouvé)
            return res.send({
                message: "erreur."
            });
        }
    });
};