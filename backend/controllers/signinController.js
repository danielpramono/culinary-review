import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandle } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandle(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandle(401, 'Password Invalid'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };