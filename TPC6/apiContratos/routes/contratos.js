var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.entidade) {
    Contrato.getContratosByEntidade(req.query.entidade)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
  }
  else if (req.query.tipo) {
    Contrato.getContratosByTipo(req.query.tipo)
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
  }
  else {
    Contrato.getContratos()
    .then(data => res.status(200).jsonp(data))
    .catch(error => res.status(500).jsonp(error))
  }
});

router.get('/entidades', function(req, res, next) {
  Contrato.getEntidades()
   .then(data => res.status(200).jsonp(data))
   .catch(error => res.status(500).jsonp(error))
});

router.get('/tipos', function(req, res, next) {
  Contrato.getTipos()
   .then(data => res.status(200).jsonp(data))
   .catch(error => res.status(500).jsonp(error))
});

router.get('/:id', function(req, res, next) {
  Contrato.getContratoById(req.params.id)
   .then(data => res.status(200).jsonp(data))
   .catch(error => res.status(500).jsonp(error))
});

router.post('/', function(req, res, next) {
  Contrato.newContrato(req.body)
   .then(data => res.status(201).jsonp(data))
   .catch(error => res.status(500).jsonp(error))
});

router.put('/:id', function(req, res, next) {
  Contrato.updateContrato(req.params.id, req.body)
   .then(data => res.status(201).jsonp(data))
   .catch(error => res.status(500).jsonp(error))
});

router.delete('/:id', function(req, res, next) {
  Contrato.deleteContrato(req.params.id)
   .then(data => res.status(200).jsonp(data))
   .catch(error => res.status(500).jsonp(error))
});

module.exports = router;
