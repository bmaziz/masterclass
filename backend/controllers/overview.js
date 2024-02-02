const db = require('../connection/connection');

exports.getoverview = (req, res) => {
    let qr = `SELECT COUNT(idEtudiant) AS countEtudiant FROM inscrireformation WHERE accepter = 1;
    SELECT COUNT(idFormation) AS countFormation FROM formation;
    SELECT COUNT(idFormateur) AS countFormateur FROM formateur`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
            // En cas d'erreur, renvoyer une réponse d'erreur avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données."
            });
        } else {
            // Vérifier s'il y a des résultats
            if (result.length > 0) {
                // Les résultats sont dans l'ordre des requêtes dans la requête SQL
                const countEtudiant = result[0][0].countEtudiant;
                const countFormation = result[1][0].countFormation;
                const countFormateur = result[2][0].countFormateur;

                // Envoyer les données en réponse avec le code de statut 200 (OK)
                return res.status(200).send({
                    message: "Données récupérées avec succès",
                    nombre_etudiants_inscrits: countEtudiant,
                    nombre_formations: countFormation,
                    nombre_formateur: countFormateur
                });
            } else {
                // Aucun résultat trouvé, renvoyer une réponse avec le code de statut 404 (Non trouvé)
                return res.status(404).send({
                    message: "Aucune donnée n'a été trouvée."
                });
            }
        }
    });
};
