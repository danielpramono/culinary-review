import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandle } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body
    const hashedPass = bcryptjs.hashSync(password, 10)
    try {
        const newUser = new User({username, email, password: hashedPass});
        await newUser.save();
        res.status(200).send({success: true, massage: "Berhasil menambahkan user"})
    } catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000){
            return next(err)
        }
        return next(errorHandle(300, 'Gagal menambahkan user'))
    }
};