const mongoose = require("mongoose") // import mongoose library

const transactionSchema = new mongoose.Schema({ // create a schema for our transaction
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: String, required: true }
});

//create mongoose model of schema
const Transaction =mongoose.model("Transaction", transactionSchema)
//create CRUD functions on model
//Create a transaction
async function createTransaction(amount, date, location, userId) {
    const transaction = await Transaction.create({
        amount: amount,
        date: date,
        location: location,
        userId: userId
    });
    return transaction;
}
//Read a transaction (get transaction by date)
async function getTransaction(date) {
    const transaction = await Transaction.findOne({ date: date });
    return transaction;
}
//Update a transaction
async function updateAmount(id, amount) {
    const transaction = await Transaction.updateOne({ "_id": id }, {$set: { amount: amount }})
    return transaction;
}

//Delete a transaction
async function deleteTransaction(id) {
    return await Transaction.findByIdAndDelete(id);
}

//export all functions we want to access in route files
module.exports = {createTransaction, getTransaction, updateAmount, deleteTransaction}