const User = require("../models/user");

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

module.exports = { signupUser };
