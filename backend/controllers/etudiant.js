const db = require('../connection/connection');
const bcrypt = require('bcrypt');


//get all data
exports.getAllEtudiant = (req, res) => {
    let qr = "select * from etudiant  ";
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données des étudiants."
            });
        }
        if (result.length > 0) {
            // Si des données sont trouvées, renvoyer une réponse avec le code de statut 200 (OK)
            return res.status(200).send({
                message: "Données de tous les étudiants récupérées avec succès.",
                data: result
            });
        } else {
            // Si aucune donnée n'est trouvée, renvoyer une réponse avec le code de statut 404 (Non trouvé)
            return res.status(404).send({
                message: "Aucune donnée d'étudiant n'a été trouvée."
            });
        }
    });
};

//connexion
exports.connexion = (req, res) => {
    let email = req.params.email;
    let password = req.params.password;

    // Rechercher l'utilisateur dans la base de données par email
    let qr = `SELECT * FROM etudiant WHERE email = ?`;
    db.query(qr, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la recherche de l'utilisateur."
            });
        }

        // Vérifier si l'utilisateur existe
        if (result.length === 0) {
            return res.status(404).send({
                message: "Aucun utilisateur avec cet e-mail n'a été trouvé."
            });
        }

        // Récupérer le mot de passe hashé de l'utilisateur trouvé
        const hashedPassword = result[0].password;

        // Vérifier si le mot de passe fourni correspond au mot de passe hashé dans la base de données
        bcrypt.compare(password, hashedPassword, (bcryptErr, bcryptResult) => {
            if (bcryptErr) {
                console.error(bcryptErr);
                return res.status(500).send({
                    message: "Une erreur s'est produite lors de la vérification du mot de passe."
                });
            }

            // Si les mots de passe correspondent
            if (bcryptResult) {
                
                

                // Renvoyer le token JWT
                return res.status(200).send({
                    message: "Connexion réussie.",
                    data:result
                     
                });
            } else {
                // Si les mots de passe ne correspondent pas
                return res.status(401).send({
                    message: "Mot de passe incorrect."
                });
            }
        });
    });
};
//get formation by idEtudiant
exports.getFormationByIdEtudiant = (req, res) => {
    let idEtudiant = req.params.idEtudiant;
    let qr = `SELECT formation.*, inscrireformation.accepter FROM formation
              INNER JOIN inscrireformation ON inscrireformation.idFormation = formation.idFormation
              WHERE idEtudiant = ${idEtudiant}`;
              
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des formations de l'étudiant."
            });
        }
        if (result.length > 0) {
            // Si des formations sont trouvées, renvoyer une réponse avec le code de statut 200 (OK)
            return res.status(200).send({
                message: "Formations de l'étudiant récupérées avec succès.",
                data: result
            });
        } else {
            // Si aucune formation n'est trouvée, renvoyer une réponse avec le code de statut 404 (Non trouvé)
            return res.status(200).send({
                message: "Aucune formation trouvée pour cet étudiant."
            });
        }
    });
};

//get single data
exports.getEtudiantById = (req, res) => {
    let idEtudiant = req.params.idEtudiant;
    let qr = `SELECT * FROM etudiant WHERE idEtudiant = ${idEtudiant}`;
    
    db.query(qr, (err, result) => {
        if (err) {
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la récupération des données de l'étudiant."
            });
        }
        if (result.length > 0) {
            // Si un étudiant est trouvé, renvoyer une réponse avec le code de statut 200 (OK)
            return res.status(200).send({
                message: "Données de l'étudiant récupérées avec succès.",
                data: result
            });
        } else {
            // Si aucun étudiant n'est trouvé, renvoyer une réponse avec le code de statut 404 (Non trouvé)
            return res.status(404).send({
                message: "Aucun étudiant trouvé avec cet identifiant."
            });
        }
    });
};

//create data
exports.createEtudiant = (req, res) => {
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let numTel = req.body.numTel;
    let email = req.body.email;
    let password = req.body.password;

    // Vérifier si l'email est déjà utilisé
    let qr1 = `SELECT * FROM etudiant WHERE email = ?`;
    db.query(qr1, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la vérification de l'email."
            });
        }
        if (result.length > 0) {
            return res.status(400).send({
                message: "L'email est déjà utilisé."
            });
        } else {
            bcrypt.hash(password, 10, (hashErr, hash) => {
                if (hashErr) {
                    console.error(hashErr);
                    return res.status(500).send({
                        message: "Une erreur s'est produite lors du cryptage du mot de passe."
                    });
                }
                // Insérer les données de l'étudiant
                let qr2 = `INSERT INTO etudiant(nom, prenom, numTel, email, password) VALUES (?, ?, ?, ?, ?)`;
                db.query(qr2, [nom, prenom, numTel, email, hash], (err1, result1) => {
                    if (err1) {
                        console.error(err1);
                        return res.status(500).send({
                            message: "Une erreur s'est produite lors de l'insertion des données de l'étudiant."
                        });
                    }
                     // Générer un token JWT
                    

                    return res.status(201).send({
                        message: "Données insérées avec succès.",
                        
                    });
                });
            })

        }
    });
};
//update etudiant
exports.updateEtudiant = (req, res) => {
    let idEtudiant = req.params.idEtudiant;
    let nom = req.body.nom;
    let email=req.body.email
    let prenom=req.body.prenom
    let numTel=req.body.numTel
    let image=req.body.image
    let qr = `update etudiant set nom="${nom}",prenom="${prenom}",email="${email}",numTel="${numTel}",image="${image}" where idEtudiant=${idEtudiant}`
    db.query(qr, (err, result) => {
        if (err) { console.log(err); }
        res.send({
            message: "data updated"
        })
    })
};
//delete single data
exports.deleteEtudiant = (req, res) => {
    let idEtudiant = req.params.idEtudiant;
    let qr = `DELETE FROM etudiant WHERE idEtudiant="${idEtudiant}"`;
    
    db.query(qr, (err, result) => {
        if (err) { 
            console.error(err);
            // En cas d'erreur, renvoyer une réponse avec le code de statut 500 (Erreur interne du serveur)
            return res.status(500).send({
                message: "Une erreur s'est produite lors de la suppression des données de l'étudiant."
            });
        }
        // Si la suppression est réussie, renvoyer une réponse avec le code de statut 200 (OK)
        return res.status(200).send({
            message: 'Données de l\'étudiant supprimées avec succès.'
        });
    });
};
exports.changerMotDePasse = (req, res) => {
    let idEtudiant = req.params.idEtudiant;
    let ancienMotDePasse = req.body.ancienMotDePasse;
    let nouveauMotDePasse = req.body.nouveauMotDePasse;
  
    console.log(ancienMotDePasse);
  
    // Rechercher l'étudiant dans la base de données par son identifiant
    let qr = `SELECT * FROM etudiant WHERE idEtudiant = ?`;
    db.query(qr, [idEtudiant], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({
          message:
            "Une erreur s'est produite lors de la recherche de l'étudiant.",
        });
      }
  
      // Vérifier si l'étudiant existe
      if (result.length === 0) {
        return res.status(404).send({
          message: "Aucun étudiant avec cet identifiant n'a été trouvé.",
        });
      }
  
      // Récupérer le mot de passe hashé de l'étudiant trouvé
      const hashedPassword = result[0].password;
  
      // Vérifier si l'ancien mot de passe fourni correspond au mot de passe hashé dans la base de données
      bcrypt.compare(
        ancienMotDePasse,
        hashedPassword,
        (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            console.error(bcryptErr);
            return res.status(500).send({
              message:
                "Une erreur s'est produite lors de la vérification du mot de passe.",
            });
          }
  
          // Si les mots de passe correspondent
          if (bcryptResult) {
            // Hasher le nouveau mot de passe
            bcrypt.hash(nouveauMotDePasse, 10, (hashErr, hash) => {
              if (hashErr) {
                console.error(hashErr);
                return res.status(500).send({
                  message:
                    "Une erreur s'est produite lors du cryptage du nouveau mot de passe.",
                });
              }
  
              // Mettre à jour le mot de passe dans la base de données
              let updateQuery = `UPDATE etudiant SET password = ? WHERE idEtudiant = ?`;
              db.query(
                updateQuery,
                [hash, idEtudiant],
                (updateErr, updateResult) => {
                  if (updateErr) {
                    console.error(updateErr);
                    return res.status(500).send({
                      message:
                        "Une erreur s'est produite lors de la mise à jour du mot de passe.",
                    });
                  }
  
                  return res.status(200).send({
                    message: "Mot de passe mis à jour avec succès.",
                  });
                }
              );
            });
          } else {
            // Si les mots de passe ne correspondent pas
            return res.status(401).send({
              message: "Ancien mot de passe incorrect.",
            });
          }
        }
      );
    });
  };
