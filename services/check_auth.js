const {User} = require('../models/models')

function check_auth(id){
    console.log(id)
    User.findById(id,(err,user)=>{
        if (err){
            console.log(err)
            return false
        }
        if(user){
            console.log('true')
            return true
        }
    })
}

module.exports = check_auth