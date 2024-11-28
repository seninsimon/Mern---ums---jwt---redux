const User = require('../models/usermodel')

const profile = async (req, res) => {

    const { id } = req.user

    try {

        const user = await User.findById(id)
        console.log("user : ", user);
        res.status(200).json({ message: "user fetched successfully", userdata: user })


    } catch (error) {
        console.log("error in fetching :", error);
        res.status(400).json({ message: "error in fetching" })
    }

}



module.exports = profile