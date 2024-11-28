const User = require('../models/usermodel')

const adminpanel = async (req, res) => {
    try {
        const users = await User.find()

        if (!users) return res.status(400).json({ message: "no users found" })

        res.status(200).json({ users })

    } catch (error) {

        console.log("error on fetching users");

        res.status(400).json({ message: "error in fetching users" })

    }
}

module.exports = adminpanel