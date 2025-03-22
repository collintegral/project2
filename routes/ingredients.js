const router = require('express').Router();

const ingredientController = require('../controllers/ingredient');
const validator = require('../middleware/validate');

router.get('/', ingredientController.readAll);
router.get('/:id', ingredientController.readOne);

router.post('/', validator.saveIngredient, ingredientController.createOne);

router.put('/:id', validator.saveIngredient, ingredientController.updateOne);

router.delete('/:id', ingredientController.deleteOne);

module.exports = router;