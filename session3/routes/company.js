const express = require('express');
const { body, validationResult } = require('express-validator')
const Company = require("../models/company");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { id } = req.query;
        const param = {};
        if (id) {
            param._id = id
        }
        console.log(param)
        const company = await Company.find(param);
        res.send(company)
    } catch (e) {
        res.status(500).send('something went wrong')
    }
})
const validateRequestBody = [
    body('company').notEmpty().withMessage('company name is required'),
    body('location').notEmpty(),
    body('owner').notEmpty(),
    body('contact').notEmpty(),
    body('email').isEmail(),
]
router.post('/', validateRequestBody, async (req, res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });

        }
        const { company, location, owner, contact, email } = req.body;
        const user = await Company.create({ company: company, location: location, owner: owner, contact: contact, email: email });
        res.status(200).send(user);
    } catch (error) {
        res.status(200).send('something went wrong');
    }

    // console.log(company)
    // console.log('the req',req.body);
    // const { company } = req.body
    // res.send(`Hello, ${req.query.person}!`);
});

router.put('/', async (req, res) => {
    try {
        const { id, email } = req.body;
        console.log(id);
        await Company.updateOne(
            { _id: id },
            {
                $set: {
                    email: email,
                },
            }
        );
        res.send('updated')
    } catch (error) {
        res.send('something went wrong')
    }
})

router.delete('/', async (req, res) => {
    try {
        const del = await Company.findOneAndDelete({ _id: '6489be4ccefa5594c5786204' });
        res.send(del)
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

module.exports = router;