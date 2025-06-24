const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const JaulaController = require('../controllers/JaulaController');

router.get('/', JaulaController.getAllJaulas);
router.post('/', isAdmin, JaulaController.createJaula);
router.get('/:id', isAdmin, JaulaController.getJaulaById);
router.put('/:id', isAdmin, JaulaController.updateJaula);
router.delete('/:id', isAdmin, JaulaController.deleteJaula);

router.get('/:jaulaId/animais', isAdmin, JaulaController.getAnimalsByJaula);

module.exports = router;