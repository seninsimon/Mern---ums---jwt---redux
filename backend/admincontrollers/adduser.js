const User = require("../models/usermodel")
const bcrypt = require("bcryptjs")





const adduser = async (req, res) => {
    const { userdatas } = req.body

    const hashedpassword = await bcrypt.hash(userdatas.password,10)


    try {

        const newuser = await User.create({
            username: userdatas.username,
            password: hashedpassword,
            email: userdatas.email,
            phonenumber: userdatas.phonenumber,
            imageurl: userdatas.imageurl

        })
        console.log('new user created :', newuser);
        res.status(200).json({ message: "new user created ", newuser })


    } catch (error) {
        console.log("error in adding user :", error);

        res.status(400).json({ message: "error in adding user" })
    }

}


module.exports = adduser