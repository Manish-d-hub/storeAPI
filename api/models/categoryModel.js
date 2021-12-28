const mongoose = require("mongoose") // Importing Mongoose
const {Schema, model} = mongoose  //Destructuring Schema and Model


// Making Category Schema.
const categorySchema = new Schema({

    name: String

})

// Exporting Category Schema.
module.exports = model("Category", categorySchema)