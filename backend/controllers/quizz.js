const db = require('../connection/connection')
//delete Quiz
exports.deleteQuiz = (req, res) => {
    let idQuiz = req.params.idQuiz;
    let qr = `delete from quiz where idQuiz=${idQuiz}`;
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: 'data deleted'
        })
    })
}

//Ajouter Quiz 
exports.postQuiz = (req, res) => {
    console.log(req.body);
    let idFormation = req.params.idFormation
    let qr = `insert into Quiz(idFormation) values(${idFormation})`
    db.query(qr, (err, result) => {

        if (err) {
            console.error(err);
            // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
            return res.status(500).send({
                message: "Une erreur s'est produite lors de l'insertion des données de Quiz."
            });
        }

        // Envoyer une réponse avec le code de statut 201 pour indiquer que les données ont été insérées avec succès
        idQuiz = result.insertId;
        for (let index = 0; index < req.body.length; index++) {
            let question = req.body[index].question;
            let qr2 = `insert into question(question,idQuiz) values("${question}",${idQuiz})`
            db.query(qr2, (err, result2) => {

                if (err) {
                    console.error(err);
                    // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
                    return res.status(500).send({
                        message: "Une erreur s'est produite lors de l'insertion des données de Quiz."
                    });
                }
                idQuestion = result2.insertId
                for (let index2 = 0; index2 < req.body[index].reponses.length; index2++) {
                    let reponse = req.body[index].reponses[index2].reponse;
                    let verite = req.body[index].reponses[index2].verite;
                    let qr = `insert into reponse(reponse,verite,idQuestion) values("${reponse}",${verite},${idQuestion})`
                    db.query(qr, (err2, result1) => {
                        if (err) {
                            console.error(err);
                            // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
                            return res.status(500).send({
                                message: "Une erreur s'est produite lors de l'insertion des données de Quiz."
                            });
                        }
                    })

                }

            })


        }

    })
    return res.status(201).send({
        message: "Quiz insérées avec succès."
    });

};
exports.postQuestion = (req, res) => {
    idQuiz = req.params.idQuiz;
    let question = req.body.question;
    let qr2 = `insert into question(question,idQuiz) values("${question}",${idQuiz})`
    db.query(qr2, (err, result2) => {

        if (err) {
            console.error(err);
            // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
            return res.status(500).send({
                message: "Une erreur s'est produite lors de l'insertion des données de Quiz."
            });
        }
        idQuestion = result2.insertId
        for (let index2 = 0; index2 < req.body.reponses.length; index2++) {
            let reponse = req.body.reponses[index2].reponse;
            let verite = req.body.reponses[index2].verite;
            let qr = `insert into reponse(reponse,verite,idQuestion) values("${reponse}",${verite},${idQuestion})`
            db.query(qr, (err2, result1) => {
                if (err) {
                    console.error(err);
                    // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
                    return res.status(500).send({
                        message: "Une erreur s'est produite lors de l'insertion des données de Quiz."
                    });
                }
            })

        }

    })





    return res.status(201).send({
        message: "Question insérées avec succès."
    });

};
//Ajouter question
// exports.postQuestion = (req, res) => {
//     let idQuiz = req.params.idQuiz
//     let question = req.body.question;
//     let reponses = req.body.reponses;
//     let qr = `insert into question(libelle,idQuiz) values("${question}",${idQuiz})`
//     db.query(qr, (err, result) => {

//         if (err) {
//             console.error(err);
//             // Envoyer une réponse avec le code de statut 500 en cas d'erreur interne du serveur lors de l'insertion des données
//             return res.status(500).send({
//                 message: "Une erreur s'est produite lors de l'insertion des données de Quiz."
//             });
//         }
//         console.log(result.insertId);
//         for (let index = 0; index < reponses.length; index++) {
//             const element = reponses[index];
//             let qr = `insert into reponse(libelle,verite,idQuestion) values("${element.reponse}",${element.verite},${result.insertId})`
//             db.query(qr, (err2, result1) => {

//             })

//         }
//         // Envoyer une réponse avec le code de statut 201 pour indiquer que les données ont été insérées avec succès
//         return res.status(201).send({
//             message: "Question insérées avec succès."
//         });
//     })

// };
//get questions by quiz
exports.getQuestionByQuiz = (req, res) => {
    let idQuiz = req.params.idQuiz;
    let qrQuestions = `SELECT * FROM question WHERE idQuiz = ${idQuiz}`;

    // Query for questions
    db.query(qrQuestions, (err, questions) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des questions."
            });
        }

        if (questions.length === 0) {
            return res.status(404).send({
                message: "Aucune question trouvée pour cette Quiz."
            });
        }

        let processedQuestions = [];

        // Fetch answers for each question
        questions.forEach(question => {
            let qrAnswers = `SELECT * FROM reponse WHERE idQuestion = ${question.idQuestion}`;
            db.query(qrAnswers, (err, answers) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send({
                        message: "Une erreur s'est produite lors de la récupération des réponses."
                    });
                }
                question.reponses = answers;
                processedQuestions.push(question);

                // Check if all questions have been processed
                if (processedQuestions.length === questions.length) {
                    res.status(200).send({
                        message: "Questions et réponses récupérées avec succès.",
                        data: processedQuestions
                    });
                }
            });
        });
    });
};
//get Quiz by Quiz;
exports.getQuizByFormation = (req, res) => {
    let idFormation = req.params.idFormation;
    let qrQuiz = `SELECT idQuiz FROM quiz WHERE idFormation = ${idFormation}`;

    // Query for questions
    db.query(qrQuiz, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des questions."
            });
        }
        else {
            // Vérifier s'il y a des résultats
            if (result.length > 0) {
                // Les résultats sont dans l'ordre des requêtes dans la requête SQL

                // Envoyer les données en réponse avec le code de statut 200 (OK)
                return res.status(200).send({
                    message: "Données récupérées avec succès",
                    data: result
                })
            }
            else {
                // Aucun résultat trouvé, renvoyer une réponse avec le code de statut 404 (Non trouvé)
                return res.status(404).send({
                    message: "Aucune donnée n'a été trouvée."
                });
            }
        }
    })
}
exports.putQuestion = (req, res) => {
    let idQuestion = req.params.idQuestion;
    let question = req.body.question;
    let reponses = req.body.reponses
    let qr = `UPDATE question SET question="${question}" WHERE idQuestion=${idQuestion}`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Erreur lors de la mise à jour de la question"
            });

        }
        for (let index = 0; index < reponses.length; index++) {
            let reponse = reponses[index].reponse;
            let verite = reponses[index].verite;
            let idReponse = reponses[index].idReponse
            let qr2 = `UPDATE reponse SET reponse="${reponse}",verite="${verite}" WHERE idReponse=${idReponse}`;
            db.query(qr2, (err2, result2) => {
                if (err2) {
                    console.log(err2);
                    res.status(500).send({
                        message: "Erreur lors de la mise à jour de la question"
                    });

                }
            })

        }
        res.send({
            message: "Question mise à jour avec succès"
        });
    });
}

