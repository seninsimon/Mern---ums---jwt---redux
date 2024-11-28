const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    adminname : {
        type : String,
        required : true
    },
    adminpassword : {
        type : String,
        required : true
    }
})

const Admin = mongoose.model("Admin",adminSchema)

module.exports = Admin;