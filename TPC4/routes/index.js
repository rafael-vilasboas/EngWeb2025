var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res) { //3 argumentos req, res, next, pedido, resposta e controlo da resposta para outra rotina (para a pipeline horizontal)
  var date = new Date().toISOString().substring(0, 16)
  res.render('index',
    { title: 'Cinema',
      data: date,
      voltar: "/"
    });
});

router.get('/filmes', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:3000/filmes')
    .then( resp => {
      res.render('filmes', {lfilmes: resp.data, title: 'Lista de filmes', data: date, voltar: "/"})
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

router.get('/ator/:id', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  ator = req.params.id
  axios.get('http://localhost:3000/filmes')
    .then( resp => {
      todosFilmes = resp.data
      filmes = todosFilmes.filter((f) => f['cast'].includes(ator) )
      res.render('ator', {title: 'Ator', data: date, ator: ator, filmes: filmes, voltar: "/filmes"})
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

router.get('/filme/:id', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  id = req.params.id
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then( resp => {
      filme = resp.data
      res.render('filme', {title: 'Filme', data: date, filme: filme, voltar: "/filmes"})
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

router.get('/filmes/editar/:id', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  const id = req.params.id
  axios.get(`http://localhost:3000/filmes/${id}`)
    .then( resp => {
      filme = resp.data
      res.render('filmeFormEdit', {title: 'Filme', data: date, filme: filme, voltar: "/filmes"})
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

router.post('/filmes/editar/:id', function(req, res) {
  const id = req.params.id
  let result = req.body
  if (result.year) result.year = parseInt(result.year, 10)
  if (result.cast) result.cast = result.cast.split(',').map(string => string.trim())
  if (result.genres) result.genres = result.genres.split(',').map(string => string.trim())
  axios.put(`http://localhost:3000/filmes/${id}`, result)
    .then( resp => {
      console.log(resp.data)
      res.redirect("/filmes")
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

router.get('/filmes/novo', function(req, res) {
  var date = new Date().toISOString().substring(0, 16)
  res.render('filmeFormCreate', {title: 'Novo Filme', data: date, voltar: "/filmes"})
})

router.post('/filmes/novo', function(req, res) {
  let result = req.body
  if (result.year) result.year = parseInt(result.year, 10)
  if (result.cast) result.cast = result.cast.split(',').map(string => string.trim())
  if (result.genres) result.genres = result.genres.split(',').map(string => string.trim())
  axios.post(`http://localhost:3000/filmes`, result)
    .then( resp => {
      console.log(resp.data)
      res.redirect("/filmes")
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

router.get('/filmes/apagar/:id', function(req, res) {
  const id = req.params.id
  axios.delete(`http://localhost:3000/filmes/${id}`)
    .then( resp => {
      console.log(resp.data)
      res.redirect("/filmes")
    })
    .catch(error => {
      console.log(error)
      res.render('error', {error: error})
    })
})

module.exports = router;
