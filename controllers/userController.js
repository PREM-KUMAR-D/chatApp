const bcrypt = require('bcrypt');


const User = require('../models/user');



exports.addPostUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const pass = req.body.password;
    const saltRounds = 10;

    try {

        const hashedPass = await bcrypt.hash(pass,saltRounds);

        const data = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPass
        });

        
        res.status(201).json({message:"User created" , success: true});
        
        
    } catch (error) {
        console.log(error);
        
        if (error.toString() === 'SequelizeUniqueConstraintError: Validation error') {
            res.status(403).json({ message: "Email already exists! Please Signup with new email"  , success: false});
            return;
        }

        return res.status(500).json({ success: false, message: "Something went wrong" });
    }



}