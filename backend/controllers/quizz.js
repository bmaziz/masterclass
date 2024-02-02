const db = require('../connection/connection')
//Ajouter question
exports.postQuestion = (req, res) => {
    let idFormation=req.params.idFormation
    let question=req.body.question;
    let reponses=req.body.reponses;
    let qr=`insert into question(libelle,idFormation) values("${question}",${idFormation})`
    db.query(qr, (err, result) => {
        
        if (err) {
            console.error(err);
            // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
            return res.status(500).send({
                message: "Une erreur s'est produite lors de l'insertion des données de formation."
            });
        }
        console.log(result.insertId);
        for (let index = 0; index < reponses.length; index++) {
            const element = reponses[index];
            let qr=`insert into reponse(libelle,verite,idQuestion) values("${element.reponse}",${element.verite},${result.insertId})`
            db.query(qr, (err2, result1) => {
                
            })        
            
        }
       // Envoyer une réponse avec le code de statut 201 pour indiquer que les données ont été insérées avec succès
       return res.status(201).send({
        message: "Question insérées avec succès."
    });
    })

};
//get