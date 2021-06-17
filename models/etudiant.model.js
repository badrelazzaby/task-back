const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EtudiantSchema = new Schema({
    name: {
        type: String,
        max: 200,
        min: 4,
        // required: true
    }
});

const Etudiant = mongoose.model('Etudiant', EtudiantSchema)
module.exports = Etudiant;