const User = require('../models/usermodel')

const deleteuser = async (req,res)=>
{
     const {id} = req.params
     console.log(req.params);
     

   try {
     
    const deleteduser = await User.findByIdAndDelete(id)
    console.log("user deleted :", deleteduser );
    res.status(200).json({message : "user deleted successfully", deleteduser})
    

   } catch (error) {
    console.log('cant delete the user',error);
    res.status(400).json({message : "user deletion denied"})
    
   }
}

module.exports = deleteuser