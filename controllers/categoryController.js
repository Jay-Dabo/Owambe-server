// Model
const Category = require('../models/category')

exports.all = (req, res) => {
    Category.find()
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                res.status(200).json(docs)
            }
        })
        .catch(error => {
            res.status(500).send('Try again')
        })

}
exports.add = (req, res) => {
    let categoryData = req.body
    const category = new Category(categoryData)
    category
        .save()
        .then(category => {
            res.status(201).send(`${category.name} added successfully`)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.getSingleCategory = (req, res) => {
    const id = req.params.categoryId
    Category.findById(id)
        .exec()
        .then(doc => {
            if (doc){
                res.status(200).json(doc)
            }else{
                res.status(404).send("No category found")
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })   
}
exports.updateCategory = (req, res) => {
    const id = req.params.categoryId
    const updateOps = {};
    
    for (const object of req.body) {
        console.log(`${Object.keys(object)}:  object`);
        updateOps[object.propName] = object.value
    }

    Category.findByIdAndUpdate(id, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).send('Category updated')
        })
        .catch(err => {
            console.log(err)
            res.status(400).send('Try again')
        })
}

exports.deleteCategory = (req, res) => {
    const id = req.params.categoryId
    Category.findByIdAndRemove(id)
        .exec()
        .then(result => {
            res.status(200).send('Category Removed')
        })
        .catch(err => {
            res.status(400).send('Try again')
        })
}