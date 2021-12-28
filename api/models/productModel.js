const mongoose = require("mongoose") // Importing Mongoose
const {Schema, model} = mongoose  //Destructuring Schema and Model


// Making our Product Schema
const productSchema = new Schema({

    productName: {
        type: String,
        required: true
    },
    qtyPerUnit: {
        type: Number,
        required: true,
        min: 0
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0
    },
    unitInStock: {
        type: Number,
        required: true,
        min: 0
    },
    discontinued: {
        type: Boolean,
        required: true,
    },

    category: [
        {
            type: Schema.Types.ObjectId, // Initiating category from caterogy Schema
             ref: "Category"             // Referencing from category
            }
        ]
})


// Exporting out product schema
module.exports = model("Product", productSchema)
