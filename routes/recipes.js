const router = require('express').Router();

const recipeController = require('../controllers/recipe');
const validator = require('../middleware/validate');

const isAuthenticated = require('../middleware/authenticate');

router.get('/', recipeController.readAll);
router.get('/:id', recipeController.readOne);

router.post('/', isAuthenticated, validator.saveRecipe, recipeController.createOne);

router.put('/:id', isAuthenticated, validator.saveRecipe, recipeController.updateOne);

router.delete('/:id', isAuthenticated, recipeController.deleteOne);

module.exports = router;