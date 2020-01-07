var express = require('express');
var users = require('../inc/users');
var router = express.Router();
var moment = require('moment');

moment.locale('pt-br');

var admin  = require('../inc/admin/admin');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');

ignoredroutes = ['/login'];

router.use(function(req, res, next){

    if(ignoredroutes.indexOf(req.url) == -1 && !req.session.user){
         res.redirect('/admin/login')
    } else{
        next();
    }
    
});

router.use( function (req, res, next) {
    
    req.menus = admin.getMenus(req);

    next();
});

//Rota inicial do admin
router.get('/', function (req, res, next) {
    
    admin.dashboard().then(data=>{


        res.render('admin/index',{
            user: req.session.user.name,
            email: req.session.user.email,
            menus: req.menus,
            data
        });
    }).catch(err=>{

        console.log(err);
    });
});
///////////////////////////////////////////////////////////////////////////// login, logout
router.get('/login', function (req, res, next) {
    
    users.render(req, res, null);
});

router.post('/login', function (req, res, next) {
  if(!req.body.email){
    users.render(req, res, "Preencha o campo email");
  } else if(!req.body.password){
    users.render(req, res, "Preencha o campo senha");
  }else{
    
    users.login(req.body.email, req.body.password).then(user=>{

        req.session.user = user;
        res.redirect('/admin');
    }).catch(err =>{

        users.render(req, res, err.message || err);
    });
  }
    
})

router.get('/logout', function (req, res, next) {
    
    delete req.session.user;
    
    res.redirect('/admin/login');
});
//////////////////////////////////////////////////////////////////////////////// contacts
router.get('/contacts', function (req, res, next) {
    
    res.render('admin/contacts',{
        user: req.session.user.name,
        email: req.session.user.email,
        menus: req.menus  
    });
});
/////////////////////////////////////////////////////////////////////////////////emails
router.get('/emails', function (req, res, next) {
    
    res.render('admin/emails',{
        user: req.session.user.name,
        email: req.session.user.email,
        menus: req.menus  
    });
});
/////////////////////////////////////////////////////////////////////////////////menus
router.get('/menus', function (req, res, next) {
    
    menus.getMenus().then(data =>{

        res.render('admin/menus',{
            user: req.session.user.name,
            email: req.session.user.email,
            menus: req.menus ,
            data
        });
    });
    
});
router.post('/menus', function (req, res, next){

    menus.save(req.fields, req.files).then(results=>{

        res.send(results);
    }).catch(err=>{

        res.send(err)
    });
});
router.delete('/menus/:id', function(req,res,next){

    menus.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);
    })
})
////////////////////////////////////////////////////////////////////////////////reservas
router.get('/reservations', function (req, res, next) {
    

    reservations.getReservations().then(data=>{

        res.render('admin/reservations',{
            date: {},
            user: req.session.user.name,
            email: req.session.user.email,
            menus: req.menus,
            data,
            moment
        });
    });

});

router.post('/reservations', function (req, res, next){

    reservations.save(req.fields).then(results=>{

        res.send(results);
    }).catch(err=>{

        res.send(err)
    });
});

router.delete('/reservations/:id', function(req,res,next){

    reservations.delete(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);
    })
})





/////////////////////////////////////////////////////////////////Usuarios

router.get('/users', function (req, res, next) {
    
    res.render('admin/users',{
        user: req.session.user.name,
        email: req.session.user.email,
        menus: req.menus  
    });
});

module.exports = router;