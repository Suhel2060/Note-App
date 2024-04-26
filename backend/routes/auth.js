
const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const User = require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET="hiiamakale"

//Route 1: create a user using POST "/api/auth/createuser". Doesnot require Auth or no login required
router.post('/createuser', [
    body('email', 'Enter a valid email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'password must be at least more than 5 characters').isLength({ min: 5 }),


], async (req, res) => {
    //if there are errors return bad request and the errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,erros: errors.array() });
    }

    //check whether the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success=false;
            return res.status(400).json({success,error: 'the user with the email already exists' })
        }

        const salt =await bcrypt.genSalt(10);
        const securepass=await bcrypt.hash(req.body.password,salt);
        //create a new user
        user = await User.create({
            name: req.body.name,
            password: securepass,
            email: req.body.email
        })
        // .then(user=>res.json())
        // .catch(err=>{console.log(err) 
        //     res.json({error: 'please enter a unique value for email',message: err.message})
        // });
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET); 
        success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error: ")
    }

})

//Route 2:authenticate a user using POST "/api/auth/login". Doesnot require Auth or no login required
router.post('/login', [
    body('email', 'Enter a valid name').isEmail().exists(),
    body('password','Password cannot be empty').exists(),
], async (req, res) => {
    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    let success=false;

    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ success,erros: errors.array() });
 
    }
    const {email,password}=req.body;

    try {
 
        let user=await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error: "please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){     
             success=false;
            return res.status(400).json({success,error: "please try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
         success=true;
        res.json({success,authtoken});
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error: ")
    }
})

//Route 3:Get loggedin User Details using POST "/api/auth/getuser". login required
router.post('/getuser',fetchuser,async (req, res) => {
try {
    const userID=req.user.id;
    const user=await User.findById(userID).select('-password')
    res.send(user);
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error: ")
}
})
module.exports = router;