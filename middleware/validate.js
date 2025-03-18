const validator = require('../helpers/validate');

let validationRules = {};

validationRules.XXXXXXX = (req, res, next) => {

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