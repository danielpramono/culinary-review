import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const {username, email, password} = req.body
    const hashedPass = bcryptjs.hashSync(password, 10)
    try {
        const newUser = new User({username, email, password: hashedPass});
        await newUser.save();
        res.status(200).send({success: true, massage: "Berhasil menambahkan user"})
    } catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000){
            return res.status(400).json({success: false ,message: "User already exist", err})
        }
        return res.status(401).send({success: false, message: "Error saat menambahkan user", err})
    }
};