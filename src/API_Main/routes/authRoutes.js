const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');
const authController = require('../controllers/authController.js');

router.get('/auth/google', authController.googleAuth);

router.get('/logout', authController.googleLogout);

router.get('/oauth2/callback', authController.googleRedirect, authController.redirectOnSuccess);


router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Autenticação com sucesso');
  } else {
    res.send('Não estás autenticado. Necessário fazer login em /auth/google');
  }
});
module.exports = router;