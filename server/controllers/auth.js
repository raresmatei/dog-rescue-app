import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';

require('dotenv').config();

export const signup = async (req, res) => {
    console.log('Signup Hit');
    try {
        // validation
        const { name, email, password, confirmPassword, city, street, number, role } = req.body;

        console.log(req.body);
  
        if (!name) {
            return res.json({
                error: 'Name is required',
            });
        }
        if (!email) {
            return res.json({
                error: 'Email is required',
            });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be 6 characters long',
            });
        }
        if (password !== confirmPassword) {
            return res.json({
                error: "Passwords don't match ",
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is taken',
            });
        }

        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = new User({ name, email, password: hashedPassword, city, street, number, role });
                
            await user.save((err, res)=>{
                if(err){
                    console.log('err');
                }
                else{
                    console.log(res);
                }
            });

            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });

            return res.json({
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role:user.role,
                    city: user.city,
                    street: user.street,
                    number: user.number
                },
            });
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
};

export const signin = async (req, res) => {
    // console.log(req.body);
    try {
        const { email, password } = req.body;
        // check if our db has user with that email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found',
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: 'Wrong password',
            });
        }
        // create signed token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send('Error. Try again.');
    }
};
