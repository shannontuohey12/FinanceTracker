//import any needed libraries
const express = require("express")
const Goal = require("../models/goal") //accesses functions in goal model file
const router = express.Router() //create router object to create routes for goal

router
.post('/create', async (req, res) => { //create goal with goalTitle, targetAmount, currentAmount, and userId
    try{
        const goal = await Goal.createGoal(req.body.goalTitle, req.body.targetAmount, req.body.currentAmount, req.body.userId)
        res.send(goal);
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.post('/get', async (req, res) => { //get goal by goalTitle
    try{
        const goal = await Goal.getGoal(req.body.goalTitle)
        res.send(goal);
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.put('/update', async (req, res) => { //update goal's target amount by ID
    try{
        const goal = await Goal.updateGoal(req.body.id, req.body.targetAmount)
        res.send(goal);
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.delete('/delete', async (req, res) => {
    try{
        await Goal.deleteGoal(req.body.id)
        res.send({success: "Goal deleted successfully."});
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})

module.exports = router //export router to be used in index.js file