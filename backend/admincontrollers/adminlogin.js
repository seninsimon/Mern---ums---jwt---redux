const Admin = require('../models/adminmodel')
const jwt = require("jsonwebtoken")

const adminlogin = async (req, res) => {
    const { adminname, adminpassword } = req.body
    try {

        const admin = await Admin.findOne({ adminname })
        if (!admin) return res.status(400).json({ message: "no admin found" })

        if (admin.adminpassword === adminpassword) {

            const token = jwt.sign({ name: admin.adminname, id: admin._id }, "secretkey")

            res.status(200).json({ message: "admin logged in " , admintoken : token })
        }



    } catch (error) {

        console.log("admin login error", error);
        res.status(400).json({ message: "admin login error" })

    }

}

module.exports = adminlogin