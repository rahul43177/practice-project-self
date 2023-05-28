const bcrypt = require('bcrypt');

const hashPassword = async function(password) {
    try {
        let salt = 10
        let hash = await bcrypt.hash(password , salt)
        return hash
    }catch(error) {
        res.status(500).send({error : error.message});
    }
}

const comparePassword = async function(password,hash) {
    let check = await bcrypt.compare(password, hash)
    return check
}

module.exports = {hashPassword,comparePassword}
