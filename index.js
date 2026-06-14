require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.dbURL)
.then(() => console.log("DB Connected!!"))
.catch(error => console.log(error));


const express = require("express")
const app = express()
const path = require('path')

const userRoutes = require("./server/routes/user") //import user routes to be used in app.use below
const transactionRoutes = require("./server/routes/transaction") //import transaction routes to be used in app.use below

app.use(express.json())

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.use('/user', userRoutes) //use user routes for any url that starts with /users
app.use('/transaction', transactionRoutes) //use transaction routes for any url that starts with /transactions

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`))

/*
    Example: To call our getUsers function in our user.js model file, we first
    include the domain name or port number if using local host:
    http://localhost:3000/

    Next, include the appropriate url from app.use above. For user routes, we 
    will user /users since: app.use('/users', userRoutes)
    http://localhost:3000/users

    Last, call the appropriate route in the user.js route file. Place in browser 
    url if a GET request, otherwise, use Postman:
    http://localhost:3000/users/
*/