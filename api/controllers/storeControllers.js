// Importing our Product and Category models.
const Product = require("../models/productModel")
const Category = require("../models/categoryModel")


// CRUD logic for routes and exporting them
module.exports.allProducts =  async (req, res) => {
    try {
        const allProducts = await Product.find() // getting all the products in the database
        res.json(allProducts) // Responding to the client request in json format
    } catch(e) {
        res.send("Error" + e) // catching errors and displaying them
    }
}

module.exports.showProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category") // Finding product through ID and Assigning category to Product
        res.json(product)
    } catch(e) {
        res.send("Error" + e)
    }
}

module.exports.createProduct = async (req, res) => {
    const {body} = req // Destructuring req.body
    const newProduct = new Product(body) // Creating new product
    const category = new Category(body) //Creating new category

    // checking if category of our product exists or not
    const productCategory = await Category.findOne({name: body.name})
    try {
        if(productCategory.name === category.name) {  // If exists the following bolck of code will be executed
            newProduct.category.push(productCategory)
        }
    } catch(e) {
        if(e instanceof TypeError){    // If category does not exists..Then making a new category and adding it to the product
            newProduct.category.push(category)
            await category.save()
        }
    } 
    await newProduct.save() // Saving the created new product
    res.json(newProduct)
}

module.exports.updateProduct = async(req, res) => {
    const {id} = req.params
    try {
        const currProduct = await Product.findByIdAndUpdate(id, {...req.body})
        await currProduct.save()
        res.json(currProduct)
        // res.send("Your product has been updated.")

    } catch(e){
        res.send("error" + e)
    }
}

module.exports.deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id) // findind the product by id and then deleting it.
        res.send("Your Product was deleted.")

    } catch(e){
        res.send("error" + e)
    }
}

