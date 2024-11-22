const express = require('express');
const router = express.Router();

const coffeesController = require('../../controllers/coffe/coffes_controllers');

router.get('/', coffeesController.getAllCoffees);
router.get('/:id', coffeesController.getCoffeeById);
/*router.post('/', coffeesController.createCoffee);
router.put('/:id', coffeesController.updateCoffee);
router.delete('/:id', coffeesController.deleteCoffee);*/

module.exports = router;