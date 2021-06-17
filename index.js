const { urlencoded, json } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const EtudiantRoute = require('./routes/etudiant.js')
const cors = require('cors')


const app = express()

mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true, useUnifiedTopology: true },
    console.log('Connected to DataBase Tasks'))

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())
app.use('/api/etudiant', EtudiantRoute)











app.listen(5000, console.log('Server listen in 5000'))