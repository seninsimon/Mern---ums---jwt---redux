

const home = async (req,res)=>
{

    console.log("home page");
    
    res.status(200).json({message : "welcome to homepage"})

}

module.exports = home