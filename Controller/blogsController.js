const {BlogsModel} = require('../Models/blogsModel');
const {authorModel} = require('../Models/authorModel');
const createBlog = async function(req,res) {
    try {
        let data =  req.body
        let {title , body , authorId , category} = data
        if(!title)  return res.status(404).send({error : "title not found"})
        if(!body)  return res.status(404).send({error : "body not found"})
        if(!authorId)  return res.status(404).send({error : "authorId not found"})
        if(!category)  return res.status(404).send({error : "category not found"})
        if(isValidObjectId(authorId)) {
            let author = await authorModel.findById(authorId)
            if(!author) return res.status(404).send({error : "author not found"})
            else {
                let createBlog = await BlogsModel.create(data)
                res.status(201).send({Blogs : create})
            }
        }
        else {
            res.status(401).send({error : "Author id is not valid"})
        }
    }catch(error) {
        res.status(500).send({error : error})
    }
}