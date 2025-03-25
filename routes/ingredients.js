const router = require('express').Router();

const ingredientController = require('../controllers/ingredient');
const validator = require('../middleware/validate');

const isAuthenticated = require("../middleware/authenticate");

router.get('/', isAuthenticated, ingredientController.readAll);
router.get('/:id', ingredientController.readOne);

router.post('/', isAuthenticated, validator.saveIngredient, ingredientController.createOne);

router.put('/:id', isAuthenticated, validator.saveIngredient, ingredientController.updateOne);

router.delete('/:id', isAuthenticated, ingredientController.deleteOne);

module.exports = router;