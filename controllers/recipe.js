const { application } = require('express');
const ObjectId = require('mongodb').ObjectId;
const mongodb = require('../data/database');

let recipeController = {};

recipeController.readAll = async (req, res) => {
    let result = await mongodb.getDatabase()
        .db()
        .collection('recipes')
        .find()
        .toArray((err) => {
            if (err) { res.status(404).json({ message: err }); }
            return;
        });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
}

recipeController.readOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update a recipe.');
    }
    const recipeId = new ObjectId(req.params.id);

    let result = await mongodb.getDatabase()
        .db()
        .collection('recipes')
        .find({_id: recipeId})
        .toArray((err) => {
        if (err) {
            res.status(404).json({ message: err });
            return;
        }
    })

    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } else {
        res.status(404).json('An error occurred while retrieving from the database. Perhaps try a different ID?')
    }
}

recipeController.createOne = async (req, res) => {
    const date = new Date();
    formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        timeToCook: req.body.timeToCook,
        rating: req.body.rating,
        author: req.body.author,
        lastUpdate: formattedDate
    }

    let result = await mongodb.getDatabase().db().collection('recipes').insertOne(recipe);

    if(result.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the recipe.')
    }
}

recipeController.updateOne = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid document ID to update a recipe.');
    }
    const recipeId = new ObjectId(req.params.id);

    const date = new Date();
    formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    const recipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        recipe: req.body.recipe,
        timeToCook: req.body.timeToCook,
        rating: req.body.rating,
        author: req.body.author,
        lastUpdate: formattedDate
    }

    let result = await mongodb.getDatabase()
        .db()
        .collection('recipes')
        .replaceOne({_id: recipeId}, recipe);

    if(result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the recipe.')
    }
}

recipeController.deleteOne = async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must use a valid document ID to delete a recipe.');
        }
        const recipeId = new ObjectId(req.params.id);

        result = await mongodb.getDatabase()
            .db()
            .collection('recipes')
            .deleteOne({_id: recipeId});

        if(result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while updating the recipe.')
        }
}

module.exports = recipeController;