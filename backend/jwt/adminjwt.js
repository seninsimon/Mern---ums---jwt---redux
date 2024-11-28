const jwt = require('jsonwebtoken')

const verifyadmintoken = (req , res , next) =>
{
    const token = req.headers.authorization?.split(" ")[1]

    console.log("admin token :", token);

    if(!token) return res.status(400).json({message : "access denied"})

    try {
        
       const decoded = jwt.verify(token,"secretkey")

       console.log("admin decoded : ",decoded);
       
       req.admin = decoded

       next()

    } catch (error) {
        
        console.log("error : ",error);

        res.status(400).json({message : " authorization denied token invalid"})
        
    }  
    
}

module.exports = verifyadmintoken