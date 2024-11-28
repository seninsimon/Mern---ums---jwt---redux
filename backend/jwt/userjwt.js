const jwt = require('jsonwebtoken')

const verifyusertoken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    console.log("user token : ", token);

    if (!token) return res.status(400).json({ message: "no token" })

    try {
        const decoded = jwt.verify(token, "secretkey")

        req.user = decoded

        console.log("decoded data from token :", decoded);

        next()

    } catch (error) {

           console.log("something happend in authenticating",error);

           return res.status(400).json({message : "authorization is denied , token invalid"})
           
    }
}

module.exports = verifyusertoken