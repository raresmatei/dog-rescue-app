import User from '../models/user';
import { hashPassword, comparePassword } from '../helpers/auth';
import jwt from 'jsonwebtoken';
import { client } from '../index';

require('dotenv').config();

export const signup = async (req, res) => {
    console.log('Signup Hit');
    try {
        // validation
        console.log(req.body);
        const { name, email, password, confirmPassword, city, street, number, role } = req.body;
        console.log('dsafds');
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
        console.log('here');
        const exist = await client.db('db').collection('users').findOne({ email });
        console.log('exist: ', exist);
        if (exist) {
            return res.json({
                error: 'Email is taken',
            });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        try {
            const user = await client
                .db('db')
                .collection('users')
                .insertOne({ name, email, password: hashedPassword, city, street, number });

            console.log('user:', user);

            // create signed token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });
            //   console.log(user);
            const { password, ...rest } = user;
            return res.json({
                token,
                user: rest,
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
        const user = await client.db('db').collection('users').findOne({ email });
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
