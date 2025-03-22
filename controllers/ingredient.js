const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

let ingredientController = {};

ingredientController.readAll = async (req, res) => {
    let result = await mongodb.getDatabase()
        .db()
        .collection('ingredients')
        .find()
        .toArray((err) => {
        if (err) {
            res.status(404).json({ message: err });
            return;
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

ingredientController.readOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update an ingredient.');
    }
    const ingredientId = new ObjectId(req.params.id);

    let result = await mongodb.getDatabase()
        .db()
        .collection('ingredients')
        .find({_id: ingredientId})
        .toArray((err) => {
        if (err) {
            res.status(404).json({ message: err });
            return;
        }
    });

    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } else {
        res.status(404).json('An error occurred while retrieving from the database. Perhaps try a different ID?')
    }
}

ingredientController.createOne = async (req, res) => {
    const date = new Date();
    formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    const ingredient = {
        name: req.body.name,
        description: req.body.description,
        vegan: req.body.vegan
    }

    let result = await mongodb.getDatabase()
        .db()
        .collection('ingredients')
        .insertOne(ingredient);

    if(result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the ingredient.')
    }
}

ingredientController.updateOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update an ingredient.');
    }
    const ingredientId = new ObjectId(req.params.id);

    const date = new Date();
    formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

    const ingredient = {
        name: req.body.name,
        description: req.body.description,
        vegan: req.body.vegan
    }

    let result = await mongodb.getDatabase()
        .db()
        .collection('ingredients')
        .replaceOne({_id: ingredientId}, ingredient);

    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the ingredient.')
    }
}

ingredientController.deleteOne = async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid document ID to delete an ingredient.');
        }
        const ingredientId = new ObjectId(req.params.id);

        let result = await mongodb.getDatabase()
            .db()
            .collection('ingredients')
            .deleteOne({_id: ingredientId});

        if(result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while updating the ingredient.')
        }
}

module.exports = ingredientController;