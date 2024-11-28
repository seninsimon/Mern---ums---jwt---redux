const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")



const login = async (req,res)=>
{
   
    const {email , password}  = req.body

    try {

        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message : "user does not exist"})

        
        const validpassword = await bcrypt.compare(password ,user.password)

        if(!validpassword) return res.status(400).json({message : "wrong password "})

        console.log("login successfull");
        
        const usertoken = jwt.sign({username : user.username , id : user._id},"secretkey")

        console.log("usertoken :",usertoken);

        res.status(200).json({message : "user logged in successfully" , token : usertoken , user:user })
        

        
        
    } catch (error) {
        
        console.log("error in userlogin :",error);
        
    }
}

module.exports = login 