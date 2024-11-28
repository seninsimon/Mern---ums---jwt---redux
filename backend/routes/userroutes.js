const express = require('express')
const router = express.Router()
const signup = require('../controllers/signup')
const login = require('../controllers/login')
const verifyusertoken = require('../jwt/userjwt')
const homepage = require('../controllers/homepage')
const verifyadmintoken = require('../jwt/adminjwt')
const adminlogin = require('../admincontrollers/adminlogin')
const adminpanel = require('../admincontrollers/adminpanel')
const edituser = require('../admincontrollers/edituser')
const deleteuser = require('../admincontrollers/deleteuser')
const profilepicture = require("../controllers/profilepicture")
const profile = require('../controllers/profile')
const adduser = require('../admincontrollers/adduser')


router.post('/signup',signup)
router.post('/login',login)
router.get('/home',verifyusertoken,homepage)
router.put('/profile',verifyusertoken,profilepicture)
router.get('/profile',verifyusertoken,profile)

//admin route

router.post('/adminlogin',adminlogin)
router.get("/adminpanel",verifyadmintoken,adminpanel)
router.put("/edituser/:id",verifyadmintoken,edituser)
router.delete("/deleteuser/:id",verifyadmintoken,deleteuser)
router.post('/adduser',verifyadmintoken,adduser)

module.exports =  router