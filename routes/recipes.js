const router = require('express').Router();

const recipeController = require('../controllers/recipe');
const validator = require('../middleware/validate');

router.get('/', recipeController.readAll);
router.get('/:id', recipeController.readOne);

router.post('/', validator.saveRecipe, recipeController.createOne);

router.put('/:id', validator.saveRecipe, recipeController.updateOne);

router.delete('/:id', recipeController.deleteOne);

module.exports = router;