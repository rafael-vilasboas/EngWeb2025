var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
  axios.get('http://localhost:16000/contratos').then(resp => {
    res.render('contratos', {title: 'contratos', contratos: resp.data, titulo: "Lista de contratos"})
  })
  .catch(error => {
    console.log(error);
    res.render('error', {error: error})
  }); 
});

router.get('/entidades/:id', function(req, res) {
  axios.get(`http://localhost:16000/contratos?entidade=${req.params.id}`).then(resp => {
    var somatorio = resp.data.map(contrato => contrato.precoContratual).reduce((acc, preco) => acc + preco);
    res.render('entidade', {nipc: req.params.id, nome: resp.data[0]['entidade_comunicante'], sum : somatorio, contratos: resp.data})
  })
  .catch(error => {
    console.log(error);
    res.render('error', {error: error})
  }); 
});


router.get('/:id', function(req, res) {
  axios.get(`http://localhost:16000/contratos/${req.params.id}`).then(resp => {
    res.render('contrato', {title: req.params.id, contrato: resp.data})
  })
  .catch(error => {
    console.log(error);
    res.render('error', {error: error})
  }); 
});

module.exports = router;