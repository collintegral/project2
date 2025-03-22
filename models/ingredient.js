//KEEPING THIS REFACTORED CODE SOLELY FOR REFERENCE

const mongodb = require('../data/database');

let ingredientModel = {};

ingredientModel.readAllingredients = async () => {
    const response = await mongodb.getDatabase()
    .db()
    .collection('ingredients')
    .find();

    return response;
}

ingredientModel.readingredient = async (id) => {
    const response = await mongodb.getDatabase()
    .db()
    .collection('ingredients')
    .find({_id: id});

    return response;
}

ingredientModel.createingredient = async (ingredient) => {
    const response = await mongodb.getDatabase()
    .db()
    .collection('ingredients')
    .insertOne(ingredient);

    return response.acknowledged;
}

ingredientModel.updateingredient = async (id, ingredient) => {

    const response = await mongodb.getDatabase()
    .db()
    .collection('ingredients')
    .replaceOne({_id: id}, ingredient);

    return response.modifiedCount > 0;
}

ingredientModel.deleteingredient = async (id) => {


    const response = await mongodb.getDatabase()
    .db()
    .collection('ingredients')
    .deleteOne({_id: id}, ingredient);

    return response.deletedCount > 0;
}

//module.exports = ingredientModel;