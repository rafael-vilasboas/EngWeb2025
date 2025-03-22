var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/alunos')

/* GET alunos listing. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Aluno.list()
    .then(data => res.status(200).render("studentsListPage", {'slist': data, 'data': date}))
    .catch(erro => res.status(500).render("error", erro))
});

router.get('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  res.status(200).render("studentsFormPage", {'data': date})
})

router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Aluno.findById(req.params.id)
    .then(data => res.status(200).render('studentPage', {'aluno': data, 'data': date}))
    .catch(erro => res.status(500).render("error", erro))
});

router.post('/registo', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Aluno.insert(req.body)
    .then(data => res.status(201).redirect('/alunos'))
    .catch(erro => res.status(500).render("error", erro))
});

router.get('/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  Aluno.findById(req.params.id)
    .then(data => res.status(200).render("studentFormEditPage", {'data': date, 'aluno': data}))
    .catch(erro => res.status(500).render("error", erro))
})

router.post('/edit/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  return Aluno.update(req.params.id, req.body)
    .then(data => res.status(201).redirect("/alunos"))
    .catch(erro => res.status(500).render("error", erro))
});

router.put('/:id', function(req, res, next) {
  var date = new Date().toISOString().substring(0, 16)
  return Aluno.update(req.params.id, req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).render("error", erro))
});

router.get('/delete/:id', function(req, res, next) {
  return Aluno.delete(req.params.id)
    .then(data => res.status(201).redirect('/alunos'))
    .catch(erro => res.status(500).render("error", erro))
});

router.put('/:id/tpc/:idTpc', function(req, res, next) {
  return Aluno.inverteTpc(req.params.id, req.params.idTpc)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.status(500).render("error", erro))
});

module.exports = router;
