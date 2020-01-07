var conn = require('./../inc/db');
var express = require('express');
var router = express.Router();
var menus = require('./../inc/menus')
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results =>{
    
    res.render('index', { 
      title: 'Restaurante Saboroso',
      menus: results,
      isHome: true
    });

  });
  
});

//Rota get /contacts
router.get('/contacts', function (req, res, next) {
  
  contacts.render(req, res);
});

//Rota post /contacts
router.post('/contacts', function (req, res, next) {
  
  if(!req.body.name){
    contacts.render(req, res, "Digite seu nome")
  
  } else if(!req.body.email){
    contacts.render(req, res, "Digite seu e-mail")
  } else {

    contacts.save(req.body);

    req.body= {};

    contacts.render(req, res, null, "Contato enviado, em breve entraremos em contato");
  }
  
  
});
//////////////////////////////////////////////////////////////////////////////////////
//Rota get /menus
router.get('/menus', function (req, res, next) {
  
  menus.getMenus().then(results =>{

    res.render('menu', {
      title: 'Menus - Restaurante saboroso',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });
  });
  
});
///////////////////////////////////////////////////////////////////////////////////////////
//Rota get/reservation
router.get('/reservation', function (req, res, next) {
  
  reservations.render(req, res)

});
// rota post reservation
router.post('/reservation', function (req, res, next) {
  
  if( !req.body.name){
    reservations.render(req, res, "Digite o Nome");

  } else if( !req.body.email){
    reservations.render(req, res, "Digite o Email");

  } else if( !req.body.people){
    reservations.render(req, res, "Informe o número de pessoas");

  } else if( !req.body.date){
    reservations.render(req, res, "Informe a data");

  } else if( !req.body.time){
    reservations.render(req, res, "Informe a Hora");

  } else{

    reservations.save(req.body).then(results=>{

      req.body = {};
      
      reservations.render(req, res, null, "Reserva realizada com sucesso!");
    }).catch(err=>{
      reservations.render(req, res, err.message);
    });
  }
});
///////////////////////////////////////////////////////////////////////////////////////////

//Rota get /services
router.get('/services', function (req, res, next) {
  
  res.render('services', {
    title: 'Serviços - Restaurante saboroso',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!'
  });
});

module.exports = router;
