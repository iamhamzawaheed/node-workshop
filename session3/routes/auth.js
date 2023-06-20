const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require('../models/user');
const verifyToken  = require('../middleware/auth');

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        console.log(oldUser.firstName);
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { userid: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );

        user.token = token;

        res.status(201).json(user);
    } catch (error) {
        res.send('something went wrong')
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email }).lean();

        if (user && (await bcrypt.compare(password, user.password))) {

            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        res.send('error')
    }
})

router.get('/protect', verifyToken,  (req,res)=> {
    try {
        console.log('user email',  req.user.email)
        res.send('yes')
    } catch (error) {
        
    }
})

module.exports = router;