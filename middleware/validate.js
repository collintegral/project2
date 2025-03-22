const validator = require('../helpers/validate');

let validationRules = {};

validationRules.saveRecipe = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        ingredients: 'required|array',
        recipe: 'required|array',
        timeToCook: 'required|numeric',
        rating: 'required|integer|min:0|max:5',
        author: 'required|string'
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err
            });
        }
    });
}

validationRules.saveIngredient = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        description: 'required|string',
        vegan: 'required|boolean',
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if (status) {
            next();
        } else {
            res.status(412).send({
                success: false,
                message: 'Validation failed.',
                data: err
            });
        }
    });
}

module.exports = validationRules;