const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// signup route handler
exports.signup = async (req, res) => {
    try {
        // get data
        const { name, email, password, role } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing password",
            });
        }

        // create entry for user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        // response
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later",
        });
    }
}


//Login route handler
exports.login = async (req, res) => {
    try{
        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details carefully",
            });
        }
        //check for the registered user
        let user = await User.findOne({email});
        //if not a registered user

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found, please signup",
            });
        }


        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }

        //password matching and generate a JWT token
        if(await bcrypt.compare(password, user.password)) {
            //password matched
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h',
            });
            user.token = token;
            user.password = undefined; 
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }

            // res.cookie("token", token, options).status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:"Login successful",
                
            // });

            res.status(200).json({
                success:true, 
                token,
                user,
                message:"Login successful",
                
            })
            

        }
        else{
            //password not matched
            return res.status(403).json({
                success:false,
                message:"Incorrect password",
            });
        }

    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success:false,
            message:"Error in user login",
        });

    }
}