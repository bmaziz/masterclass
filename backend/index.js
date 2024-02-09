const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const formationRoute= require('./routes/formation')
const formateurRoute= require('./routes/formateur');
const etudiantRoute= require('./routes/etudiant.js');
const overviewRoute=require('./routes/overview');
const quizzRoute=require('./routes/quizz')
 app.use(cors());
app.use(bodyparser.json());
app.use('/quiz',quizzRoute);
app.use('/overview',overviewRoute);
app.use('/formateur',formateurRoute);
app.use('/formation',formationRoute);
app.use('/etudiant',etudiantRoute);


app.listen(3000, () => {
    console.log('server running');
})
