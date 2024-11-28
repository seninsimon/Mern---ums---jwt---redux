const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')



const signup = async (req, res) => {
    const { username, password, email, confirmpassword , phonenumber ,imageurl } = req.body
    try {

        if (password !== confirmpassword) return res.status(400).json({ message: "password does not match" })

        const user = await User.findOne({ username })

        console.log("user already exists");
        
        if (user) return res.status(400).json({ message: "user already exists" })

        const hashedpassword = await bcrypt.hash(password, 10)

        const newuser = await User.create({
            username, password: hashedpassword, email , phonenumber ,imageurl
        })

        console.log("new user created :", newuser);

        res.status(200).json({message : "user created successfully",newuser})



    } catch (error) {

        console.log("error is sign up :", error);


    }
}

module.exports = signup