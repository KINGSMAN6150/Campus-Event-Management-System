const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signupUser = async(req,res) => {
    try {
        const{ name, email, password, role} = req.body;
        
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already exists with this mail"});
        }

        const user = await User.create({
        name,
        email,
        password,
        role,
    });

    res.status(201).json({
        message: "User Created Succesfully!!",
        token :  generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}
catch (error){
    res.status(500).json({message : "User was not created. Try again"})
}
};


const loignUser = async(req,res) => {
    try {
        const{ email, password} = req.body;
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "User does not exist with this mail"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

    res.status(200).json({
        message: "User Logged In Succesfully!!",
        token :  generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}
catch (error){
    res.status(500).json({message : "Login failed. Try again"})
}
}



module.exports = { signupUser, loignUser };