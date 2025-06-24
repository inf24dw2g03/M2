const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const FuncionarioController = require('../controllers/FuncionarioController');

router.get('/', FuncionarioController.getAllFuncionarios);
router.post('/', isAdmin, FuncionarioController.createFuncionario);
router.get('/:id', isAdmin, FuncionarioController.getFuncionarioById);
router.put('/:id', isAdmin, FuncionarioController.updateFuncionario);
router.delete('/:id', isAdmin, FuncionarioController.deleteFuncionario);

module.exports = router;