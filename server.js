const express = require("express") // importing Express 
const mongoose = require("mongoose") //Importing Mongoose
const bodyParser = require('body-parser') // Importing body parser
require("dotenv").config()

const productRoute = require("./api/routes/storeRoutes") // Importing our routes.


const dbUrl = "mongodb://localhost:27017/storeApp" || process.env.DB_URL
// connects to db
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// checks for connection error to db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})


const app = express() // Initiating Express app
const port = process.env.PORT || 3000 // Making a port for server

//Initiate body parser
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())


// Using Imported Product rourtes
app.use("/products", productRoute)


// Adding a middleware to Handle errors
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})


// Making our server listen on the specified port
app.listen(port, () => {
    console.log("LISTENING ON PORT 3000!! ")
})
