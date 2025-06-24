const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const AnimalController = require('../controllers/AnimalController');

router.get('/', AnimalController.getAllAnimals); 
router.post('/', isAdmin, AnimalController.createAnimal); 
router.get('/:id', isAdmin, AnimalController.getAnimalById); 
router.put('/:id', isAdmin, AnimalController.updateAnimal); 
router.delete('/:id', isAdmin, AnimalController.deleteAnimal); 


module.exports = router;