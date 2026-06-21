const mongoose = require("mongoose") // import mongoose library

const goalSchema = new mongoose.Schema({ // create a schema for our goal
  goalTitle: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  userId: { type: Number, required: true } //foreign key to user model
});

//create mongoose model of schema
const Goal = mongoose.model("Goal", goalSchema)
//create CRUD functions on model
//Create a goal
async function createGoal(goalTitle, targetAmount, currentAmount, userId) {
    const goal = await Goal.create({
        goalTitle: goalTitle,
        targetAmount: targetAmount,
        currentAmount: currentAmount,
        userId: userId
    });
    return goal;
}
//Read a goal (get goal by ID)
async function getGoal(goalTitle) {
    const goal = await Goal.findOne({ goalTitle: goalTitle });
    return goal;
}
//Update a goal
async function updateGoal(id, targetAmount) {
    const goal = await Goal.updateOne({ "_id": id }, {$set: { targetAmount: targetAmount }})
    return goal;
}

//Delete a goal
async function deleteGoal(id) {
    return await Goal.findByIdAndDelete(id);
}

//export all functions we want to access in route files
module.exports = {createGoal, getGoal, updateGoal, deleteGoal}