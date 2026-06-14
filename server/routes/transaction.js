//import any needed libraries
const express = require("express")
const Transaction = require("../models/transaction") //accesses functions in user model file
const router = express.Router() //create router object to create routes for user

router
.post('/create', async (req, res) => {
    try{
        const transaction = await Transaction.createTransaction(req.body.amount, req.body.date, req.body.location, req.body.userId)
        res.send(transaction);
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.post('/get', async (req, res) => {
    try{
        const transaction = await Transaction.getTransaction(req.body.date)
        res.send(transaction);
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.put('/update', async (req, res) => {
    try{
        const transaction = await Transaction.updateAmount(req.body.id, req.body.amount)
        res.send(transaction);
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.delete('/delete', async (req, res) => {
    try{
        await Transaction.deleteTransaction(req.body.id)
        res.send({success: "Transaction deleted successfully."});
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})

module.exports = router //export router to be used in index.js file