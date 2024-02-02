
const db = require('../connection/connection')

//get all data
exports.getAllFormation = (req, res) => {
    let qr = "select idFormation,titre,image,icone,description from formation";
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données de formation."
            });
        }
        if (result.length > 0) {
            // Envoyer une réponse avec le code de statut 200 pour indiquer une réussite et renvoyer les données de formation
            return res.status(200).send({
                message: "Données de formation récupérées avec succès.",
                data: result
            });
        } else {
            // Envoyer une réponse avec le code de statut 404 si aucune formation n'est trouvée
            return res.status(404).send({
                message: "Aucune formation n'a été trouvée."
            });
        }
    });
};


//get single data
exports.getFormationById = (req, res) => {
    let idFormation = req.params.idFormation;
    let qr = `SELECT * FROM formation WHERE idFormation = ${idFormation}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données de la formation."
            });
        }
        if (result.length === 0) {
            return res.status(404).send({
                message: "La formation avec l'ID spécifié n'existe pas."
            });
        }

        let formation = result[0];
        let qr2 = `
            SELECT idEtudiant, accepter FROM inscrireformation WHERE idFormation = ${idFormation};
            SELECT titre, description FROM programme WHERE idFormation = ${idFormation};
            SELECT type,description FROM objectif WHERE idFormation=${idFormation}
        `;
        db.query(qr2, (err2, result2) => {
            if (err2) {
                console.log(err2);
                return res.status(500).send({
                    message: "Une erreur s'est produite lors de la récupération des détails de la formation."
                });
            }

            formation.participants = result2[0];
            formation.programme = result2[1];
            formation.objectifs=result2[2]  

            res.status(200).send({
                message: "Détails de la formation récupérés avec succès.",
                data: formation
            });
        });
    });
};
//create data
exports.createFormation = (req, res) => {
    let titre = req.body.titre;
    let prix = req.body.prix;
    let totalheure = req.body.totalheure;
    let totalmois = req.body.totalmois;
    let description = req.body.description;
    let idFormateur = req.body.idFormation;
    let dateDebut = req.body.dateDebut;
    let qr = `insert into formation(titre,prix,totalheure,totalmois,description,idFormateur,dateDebut)
    values("${titre}",${prix},${totalheure},${totalmois},'${description}',${idFormateur},'${dateDebut}')`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
            return res.status(500).send({
                message: "Une erreur s'est produite lors de l'insertion des données de formation."
            });
        }
       // Envoyer une réponse avec le code de statut 201 pour indiquer que les données ont été insérées avec succès
       return res.status(201).send({
        message: "Données de formation insérées avec succès."
    });
    })
}
//update Formation
exports.updateFormation = (req, res) => {
    let idFormation = req.params.idFormation;
    let titre = req.body.titre;
    let qr = `update formation set titre="${titre}" where idFormation=${idFormation}`
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: "data updated"
        })
    })
};
//delete single data
exports.deleteFormation = (req, res) => {
    let idFormation = req.params.idFormation;
    let qr = `delete from formation where idFormation="${idFormation}"`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'data deleted'
        })
    })
}
