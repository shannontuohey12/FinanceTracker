const mongoose = require("mongoose") // import mongoose library
const bcrypt = require('bcryptjs') // import bcrypt library for password hashing

const userSchema = new mongoose.Schema({ // create a schema for our user
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

//create mongoose model of schema
const User =mongoose.model("User", userSchema)

//create CRUD functions on model
//Create a user (sign up)
async function register(firstName, lastName, email, password) {
    const user = await getUser(email);
    if(user) {
        throw new Error('Email is already in use.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashed
    })
    return newUser._doc;

}
//Read a user (log in)
async function login(email, password) {
    const user = await getUser(email)
    if(!user) {
        throw new Error('User not found.');
    }

    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
    if(!isMatch) {
        throw new Error('Wrong password.');
    }
    return user._doc;
}

//Update a user (update profile)
async function updatePassword(id, password){
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.updateOne({ "_id": id }, {$set: { password: hashed }})
    return user;
}

//Detete a user (delete account)
async function deleteUser(id) {
    await User.deleteOne({"_id": id})
}
//utility functions

async function getUser(email) {
    return await User.findOne({ "email": email })
}

//export all functions we want to access in route files
module.exports = {register, login, updatePassword, deleteUser}