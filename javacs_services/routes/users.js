var express = require('express');
var router = express.Router();
const models = require('../models/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
  try {
    models.users.findAll().then(result => {
      res.json(result);
    }).catch(error => {
      res.status(500).json(error);
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno");
  }
});

router.get('/getid/:email', function (req, res, next) {
  try {
    models.users.findAll({
      where: {
        email: req.params.email
      }
    }).then(result => {
      res.json(result)
    }).catch(error => {
      res.status(500).json(error);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/exists/:email', function (req, res, next) {
  try {
    models.users.findAll({
      where: {
        email: req.params.email
      }
    }).then(result => {
      var existsInUsers = result.length > 0;
      models.student.findAll({
        where: {
          userId: result[0].id
        }
      }).then(_result => {
        res.json({
          users: existsInUsers,
          student: _result.length > 0
        })
      }).catch(error => {
        res.json({
          users: true,
          student: false
        });
      });
    }).catch(error => {
      res.json({
        users: false,
        student: false
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:userId', function (req, res, next) {
  try {
    models.users.findAll({
      where: {
        id: req.params.userId
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

router.post('/', function (req, res, next) {
  const user = req.body;
  try {
    models.users.create({
      nombre: user.name,
      email: user.email,
      apellido: user.lastName
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

router.put("/:id", function (req, res, next) {
  const user = req.body;
  try {
    models.users.update({
      nombre: user.name,
      email: user.email,
      apellido: user.lastName
    }, {
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result)
    }).catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno");
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    models.users.destroy({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json(result);
    }).catch(error => {
      console.error(error);
      res.status(500).json(error);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal error");
  }
});

module.exports = router;
