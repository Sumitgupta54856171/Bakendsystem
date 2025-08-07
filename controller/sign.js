const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

const register = async (req, res) => {
    const { username, email, password,role } = req.body;
    console.log(req.body)
    if(!username && !email && !password && !role){
        return res.status(400).json({ message: 'All fields are required' });
    }

console.log("User next 1");
    try {
        console.log("User next 2");
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        console.log("User next 3");
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user({ username, email, password: hashedPassword,role,isverified:true });
        newUser.save()
        .then(()=>{
            console.log("User next 4");
            console.log("User created successfully");
            res.status(201).json({ message: 'User created successfully' });
        })
        .catch((err)=>{
            console.log(err)
            res.status(500).json({ message: 'Internal server error' });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const login = async (req, res) => {
    const { email, password,role} = req.body;
    console.log(req.body)
    if(!email && !password && !role){
        return res.status(400).json({ message: 'All fields are required' });
    }
    console.log("next work 1")
    try {
        console.log("next work 2")
        const users = await user.findOne({ email:email });
        console.log(users)
        if (!users) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        console.log("next work 3")
        
        console.log("next work 4")
        const payload ={
            userId: users._id,
            role: users.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.jwt_sceret,
            maxAge: 30*24*60*60*1000,
        });
        console.log("next work 5")
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = { register, login };