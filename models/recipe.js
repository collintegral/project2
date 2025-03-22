//KEEPING THIS REFACTORED CODE SOLELY FOR REFERENCE

const mongodb = require('../data/database');

let recipeModel = {};

recipeModel.readAllRecipes = async () => {
    const response = await mongodb.getDatabase()
    .db()
    .collection('recipes')
    .find().toArray();

    console.log(response);
    return response;
}

recipeModel.readRecipe = async (id) => {
    const response = await mongodb.getDatabase()
    .db()
    .collection('recipes')
    .find({_id: id});

    return response;
}

recipeModel.createRecipe = async (recipe) => {
    const response = await mongodb.getDatabase()
    .db()
    .collection('recipes')
    .insertOne(recipe);

    return response.acknowledged;
}

recipeModel.updateRecipe = async (id, recipe) => {

    const response = await mongodb.getDatabase()
    .db()
    .collection('recipes')
    .replaceOne({_id: id}, recipe);

    return response.modifiedCount > 0;
}

recipeModel.deleteRecipe = async (id) => {


    const response = await mongodb.getDatabase()
    .db()
    .collection('recipes')
    .deleteOne({_id: id}, recipe);

    return response.deletedCount > 0;
}

//module.exports = recipeModel;