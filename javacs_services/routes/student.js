var express = require('express');
var router = express.Router();
const models = require('../models/index');
const request = require('request')

router.post('/add', function (req, res, next) {
    const body = req.body;

    try {
        models.users.findAll({
            where: {
                id: body.userId
            }
        }).then(_result => {
            if (_result.length == 0) {
                res.status(500).send("User not exists");
                return;
            }

            models.student.findAll({
                where: {
                    userId: body.userId
                }
            }).then(result => {
                if (result.length > 0) {
                    res.status(500).send("User already is a student");
                    return;
                }

                models.student.create({
                    userId: body.userId,
                    progress: 0
                }).then(__result => {
                    models.users.update({
                        userId: __result.id
                    }, {
                        where: {
                            id: body.userId
                        }
                    });
                    res.json(__result);
                }).catch(error => {
                    res.status(500).json(error);
                });
            }).catch(error => {
                res.status(500).json(error);
            });
        }).catch(error => {
            res.status(500).json(error);
        })
    } catch (error) {
        res.status(500).send("Internal error");
    }
});

router.put('/responses/addCorrect/:userId', function (req, res, next) {
    try {
        models.student.findAll({
            where: {
                userId: req.params.userId
            }
        }).then(result => {
            let exists = false;
            console.log(result);
            var data = result[0].dataValues;

            if (!data.responses) {
                data.responses = "";
            }

            data.responses.split("|").forEach(response => {
                if (response == req.body.questionId) exists = true;
            });

            if (!exists) {

                if (data.responses.length > 0)
                    models.student.update({
                        progress: data.progress + 1,
                        responses: data.responses + "|" + req.body.questionId
                    }, {
                        where: {
                            userId: req.params.userId
                        }
                    }).then(__response => {
                        res.json(__response);
                    }).catch(error => {
                        console.error(error);
                        res.status(500).json(error)
                    });
                else
                    models.student.update({
                        progress: data.progress + 1,
                        responses: req.body.questionId
                    }, {
                        where: {
                            userId: req.params.userId
                        }
                    }).then(__response => {
                        res.json(__response)
                    }).catch(error => {
                        console.error(error);
                        res.status(500).json(error);
                    });
            }
            else {
                res.json({
                    response: "Exits"
                })
            }
        }).catch(error => {
            console.error(error);
            res.status(500).json(error);
        });
    } catch (error) {
        res.status(500).send("Error interno");
    }
});

router.get('/responses/:userId', function (req, res, next) {
    try {
        models.student.findAll({
            where: {
                userId: req.params.userId
            }
        }).then(result => {
            if (result[0].responses.length == 0) {
                res.json([]);
            }

            res.json(result[0].progress.split('|'));
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        res.status(500).send("Error interno");
    }
});

router.get('/:userId', function (req, res, next) {
    try {
        models.student.findAll({
            where: {
                userId: req.params.userId
            }
        }).then(result => {
            models.question.findAll().then(_result => {
                var __result = {
                    progress: result[0].progress,
                    total: _result.length,
                    progress_percent: result[0].progress / _result.length
                }
                res.json(__result);
            }).catch(error => {
                res.status(500).json(error);
            });
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (error) {
        res.status(500).send("Error interno");
    }
});

router.get('/student/checker', function(req, res, next) {
    res.send("Student services are workink");
});

router.put('/progress/update/:userId', function (req, res, next) {
    const body = req.body;
    try {
        models.student.findAll({
            where: {
                userId: req.params.userId
            }
        }).then(_result => {
            models.student.update({
                progress: _result[0].progress + 1
            }, {
                where: {
                    userId: req.params.userId
                }
            }).then(result => {
                res.json(result);
            }).catch(error => {
                res.status(500).json(error);
            })
        }).catch(error => {
            res.status(500).json(error);
        })
    } catch (error) {
        res.status(500).send("Error interno");
    }
});

module.exports = router;