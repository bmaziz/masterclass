
const db=require('../connection/connection')

//get all data
exports.getAllFormateur =(req, res) => {
    let qr = "SELECT * FROM formateur";
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données des formateurs."
            });
        }
        // Si des données sont trouvées, renvoyer une réponse avec le code de statut 200 (OK) et les données des formateurs
        if (result.length > 0) {
            return res.status(200).send({
                message: "Données de tous les formateurs récupérées avec succès.",
                data: result
            });
        } else {
            // Si aucune donnée n'est trouvée, renvoyer une réponse avec le code de statut 404 (Non trouvé)
            return res.status(404).send({
                message: "Aucune donnée de formateur trouvée."
            });
        }
    });
};


//get single data
exports.getFormateurById = (req, res) => {
    let idFormateur = req.params.idFormateur;
    let qr = `SELECT * FROM formateur WHERE idFormateur = ${idFormateur}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération du formateur."
            });
        }
        // Si le formateur est trouvé, renvoyer une réponse avec le code de statut 200 (OK) et les données du formateur
        if (result.length > 0) {
            return res.status(200).send({
                message: "Données du formateur récupérées avec succès.",
                data: result[0]
            });
        } else {
            // Si le formateur n'est pas trouvé, renvoyer une réponse avec le code de statut 404 (Non trouvé)
            return res.status(404).send({
                message: "Aucun formateur trouvé avec cet identifiant."
            });
        }
    });
};

//create data
exports.postFormateur = (req, res) => {
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let numTel = req.body.numTel;
    let email=req.body.email
    let qr = `INSERT INTO formateur(nom, prenom, numTel,email) VALUES ("${nom}", "${prenom}", "${numTel}","${email}")`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la création du formateur."
            });
        }
        // Si la création du formateur est réussie, renvoyer une réponse avec le code de statut 201 (Créé) et un message indiquant que les données ont été insérées avec succès
        return res.status(201).send({
            message: "Données du formateur insérées avec succès."
        });
    });
};

//update formateur
exports.updateFormateur= (req, res) =>  {
    let idFormateur=req.params.idFormateur;
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let numTel = req.body.numTel;
    let email=req.body.email
    let qr=`update formateur set nom="${nom}",prenom="${prenom}",numTel="${numTel}",email="${email}" where idFormateur=${idFormateur}`
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        res.send({
            message:"data updated"
        })
    })
};
//delete single data
exports.deleteFormateur = (req, res) => {
    let idFormateur = req.params.idFormateur;
    let qr = `DELETE FROM formateur WHERE idFormateur="${idFormateur}"`;
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la suppression du formateur."
            });
        }
        // Si la suppression du formateur est réussie, renvoyer une réponse avec le code de statut 200 (OK) et un message indiquant que les données ont été supprimées avec succès
        return res.status(200).send({
            message: "Données du formateur supprimées avec succès."
        });
    });
};
