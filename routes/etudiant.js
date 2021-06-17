const express = require('express')
const router = express.Router()
const Etudiant = require('../models/etudiant.model.js')
const fs = require('fs')
const xml2js = require('xml2js')
const path = require('path');

//Ajouter Etudiant
router.post('/add-name', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.send("nothing to post")
    } else {
        const etudiant = new Etudiant({
            name: req.body.name
        })
        await etudiant
            .save()
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.send("Cannot add name", { message: error.messgae });
            })
    }

});

// generate XML
router.get('/getXML', async (_, res) => {

    var text = {
        username: "   badr",
        role: "developper     ",
        adress: "hdidoepepkfjfjdspadkf",
        annee: "2021"
    }
    const dirPath = 'resources/TEST.xml';

    try {
        var builder = new xml2js.Builder()

        var xml = builder.buildObject(text)
        console.log("-----XML-----");
        console.dir(xml)
        xml2js.parseString(xml, { trim: true }, (err, result) => {
            console.log("-----convert XML-----");
            console.dir(result)
        })
        fs.writeFile(dirPath, xml, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Saved');
                res.download(dirPath)
            }
        })
    } catch (error) {
        console.log(error);
    }






})

//Get tout les etudiants
router.get('/all-etudiant', async (req, res) => {
    await Etudiant.find().then(data => {
        res.send(data)
    })
        .catch(err => {
            res.send("Cannot get all etudiant", { message: err.message })
        })
});

//Get Etudiant By ID
router.get('/:Id', async (req, res) => {
    await Etudiant.findById(req.params.Id)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send("not found with ID" + req.params.Id)
        })
});

//Modifier un etudiant exist
router.put('/:Id', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.send("nothing to update")
    } else {
        await Etudiant.findByIdAndUpdate(req.params.Id, {
            name: req.body.name
        }, { new: true })
            .then((data) => {
                res.send(data)
            })
            .catch(err => {
                res.send("cannot update with Id" + req.params.Id)
            })
    }

});

//Supprimer un etudiant exist
router.delete('/:Id', async (req, res) => {
    await Etudiant.findByIdAndDelete(req.params.Id)
        .then(() => {
            res.send("Deleted")
        })
        .catch(err => {
            res.send("can't delete with Id" + req.params.Id)
        })
});

module.exports = router;