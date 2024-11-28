const User = require('../models/usermodel');

const changeprofile = async (req, res) => {

    console.log("request body has :",req.body);
    console.log("req user from jwt has :", req.user);

    const { imageurl } = req.body;
    
    
    const { id } = req.user;

    try {
        const user = await User.findByIdAndUpdate(id, { imageurl }, { new: true })
        console.log("updated userdata :,",user);
        
        res.status(200).json({
            message: 'Image URL updated successfully', userdata: user,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error updating profile picture' });
    }
};

module.exports = changeprofile;
