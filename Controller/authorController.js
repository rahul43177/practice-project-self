const {authorModel} = require('../Models/authorModel')
const {hashPassword} = require('../bcrypt/hasingPassword')
try {
    const createAuthor = async function(req,res) {
        let data = req.body
        let {fname , lname , title , email , password } = data
        if(!fname) return res.status(404).send({error : 'fname not found'})
        if(!lname) return res.status(404).send({error : 'lname not found'})
        if(!title) return res.status(404).send({error : 'title not found'})
        if(!email) return res.status(404).send({error : 'email not found'})
        if(!password) return res.status(404).send({error : 'password not found'})

        let str = /^([...(a-z)])/gi
        if(!fname.match(str))  return res.status(400).send({error : "Invalid first name"})
        if(!lname.match(str)) return res.status(400).send({error : "Invalid last name"})
        if(!email.match(/^([...(a-z)])+([/0-9/])+@([/a-z/])+\.(com|in|org)$/gi)) {
             res.status(500).send({erorr : "Invalid email address"})
        }
        data.email = email.toLowerCase()

        const hash = await hashPassword(password) 
        let author = await authorModel.findOne({email : email})
        if(author) return res.status(201).send({error : "Email Id already exists"})
        let create = await authorModel.create({fname , lname , title ,email , passowrd : hash})
        res.status(200).send({author : create})
     }
}catch(err) {
    res.status(500).send({status : false , erorr : err})
}
module.exports = {createAuthor}