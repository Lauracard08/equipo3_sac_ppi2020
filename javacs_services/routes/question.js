var express = require('express');
var router = express.Router();
const models = require('../models/index');

router.get('/', function (req, res, next) {
    try{
        models.question.findAll().then(result => {
            res.json(result)
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
});

router.get('/:id', function (req, res, next) {
    try {
        models.question.findAll({
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
});

router.get('/getCategory/:category', function (req, res, next) {
    try {
        models.question.findAll({
            where: {
                categoria: req.params.category
            }
        }).then(result => {
            res.json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch(error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
});

router.post('/', function (req, res, next) {
    const body = req.body;
    try {
        models.question.create({
            pregunta: body.question,
            respuestas: body.answers,
            respuesta: body.answer,
            categoria: body.category
        }).then(result => {
            res.json(result);
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch(error) {
        console.error(error);
        res.status(500).send("Error interno");
    }
});

module.exports = router;