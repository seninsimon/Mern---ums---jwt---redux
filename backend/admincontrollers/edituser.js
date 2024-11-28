const User = require("../models/usermodel")


const edituser = async (req, res) => {
    const { id } = req.params
    const updateddata = req.body
    try {

        const updateduser = await User.findByIdAndUpdate(id, updateddata)
        console.log("updated data :", updateduser);
        res.status(200).json({ message: "user updated successfully", updateduser })




    } catch (error) {
        console.log("update unsuccessfull", error);

    }
}

module.exports = edituser;