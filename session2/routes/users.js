var express = require('express');
const { body , validationResult} = require('express-validator')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const validateRequest = [
  body('company').notEmpty().withMessage('company name is required'),
  body('address').notEmpty(),
  body('companymail').isEmail()
]

router.post('/',validateRequest , function(req, res, next) {
const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
    
  }

  
  // console.log('the req',req.body);
  // const { company } = req.body
  res.send(`Hello, ${req.query.person}!`);
});



module.exports = router;
