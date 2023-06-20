const express = require('express');
const router = express.Router();
const blog = require('../models/blog');

router.get('/', async (req, res) => {
    try {
        const blogs =  await blog.find().populate('user');
        res.send(blogs);
    } catch (error) {
        res.status.send('something went wrong');
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, author, body, hidden } = req.body;
        await blog.create({
            title,
            author,
            body,
            hidden,
            user: '64904cb4ecef9327ed19c394'
        })
        res.send('success')
    } catch (error) {
        res.satus(400).send('something went wrong')
    }
})

module.exports = router