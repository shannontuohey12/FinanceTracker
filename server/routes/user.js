//import any needed libraries
const express = require("express")
const User = require("../models/user") //accesses functions in user model file
const router = express.Router() //create router object to create routes for user

router
.post('/login', async (req, res) => {
    try{
        const user = await User.login(req.body.email, req.body.password)
        res.send({...user, password: undefined});
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.post('/register', async (req, res) => {
    try{
        const user = await User.register(req.body.firstName, req.body.lastName, req.body.email, req.body.password)
        res.send({...user, password: undefined});
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.put('/update', async (req, res) => {
    try{
        const user = await User.updatePassword(req.body.id, req.body.password)
        res.send({...user, password: undefined});
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})
.delete('/delete', async (req, res) => {
    try{
        await User.deleteUser(req.body.id)
        res.send({success: "User deleted successfully."});
    }
    catch(error) {
        res.status(401).send({message: error.message});
}
})

module.exports = router //export router to be used in index.js file