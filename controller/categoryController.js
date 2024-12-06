const Category = require('../models/categoryModel')


exports.addCategory = async (req, res) => {

    let categoryExists = await Category.findOne({category_name: req.body.category_name});
    if(categoryExists){
        return res.status(400).json({error: 'Category already exists'})  // Return an error if category already exists in the database. 400 status code means bad request. 404 means not found. 200 means OK. 201 means created. 204 means no content. 500 means server error. 503 means service unavailable. 504 means gateway timeout. 301 means moved permanently. 302 means moved temporarily. 304 means not modified. 401 means unauthorized. 403 means forbidden. 405 means method not allowed. 406 means not acceptable. 410 means gone. 411 means length required. 412 means precondition failed. 413 means payload too large. 414 means request-uri too long. 41
    }
    let categoryToAdd = await Category.create({
        category_name: req.body.category_name
    })

    if(!categoryToAdd){
        return res.status(400).json({error: 'Something went wrong'})
    }

    res.send(categoryToAdd)
}

/*
    CRUD
    create(newObj) - inserts the new object into the database

    find() - Returns all data
    findById(id) - Returns a single data
    findOne(filterObj) - returns data that matches the given filter

    findByIdAndUpdate(id, updatingObj, options) - Updates a single data
        id - which to update
        updatingObj - what to update
        options - options like new: true to return updated data

    findByIdAndDelete(id) - Deletes a single data
*/

exports.getAllCategories = async (req,res)  => {
    let categories = await Category.find()
    if(!categories){
        return res.status(404).json({error: 'No categories found'})  // Return an error if no categories found in the database. 400 status code means bad request. 404 means not found. 200 means OK. 201 means created. 204 means no content. 500 means server error. 503 means service unavailable. 504 means gateway timeout. 301 means moved permanently. 302 means moved temporarily. 304 means not modified. 401 means unauthorized. 403 means forbidden. 405 means method not allowed. 406 means not acceptable. 410 means gone. 411 means length required. 412 means precondition failed. 413 means payload too large. 414 means request-uri too long. 41
    }
    res.send(categories)
}

exports.getCategoryDetails = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if(!category){
        return res.status(400).json({error: "Something Went Wrong"})
    }
    res.send(category)
}

exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, {new: true})
    //if no new:true, the data will be updated but returns old data
    if(!categoryToUpdate){
        return res.status(400).json({error: "Something Went Wrong"})
    }
    res.send(categoryToUpdate)
}

exports.deleteCategory = async (req, res) => {
    Category.findByIdAndDelete(req.params.id)
     .then(deletedCategory =>{
        if(!deletedCategory){
            return res.status(400).json({error: "Something Went Wrong"})
        }
        res.send({message: "Category Deleted Successfully"})
     })
     .catch(error => {
        return res.status(400).json({ error: error })
     })
}