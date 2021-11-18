const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const config = require('../config');

const {
    check,
    validationResult,
    sanitizeParam,
    buildCheckFunction
} = require('express-validator');

const User = mongoose.model('User');

module.exports = router;

router.post('/', [
    check('username').not().isEmpty().trim(),
    check('password').not().isEmpty().trim(),
], login);

async function login(req, res) {

    var inData = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    try {

        var user = await User.findOne({
            email: inData.username
        }).select('+email +role');
        
        if (user) {
            if(user.validatePassword(inData.password)) {

                let u = user.toJSON();
                delete u['password'];
                delete u['salt'];

                var token = jwt.sign(u, config.secret, {
                    expiresIn: '30d'
                });
                token = 'bearer ' + token;

                return res.status(200).json({
                    user: u,
                    token: token,
                });
            } else {
                return res.status(401).json({
                    message: 'Invalid password'
                });
            }
        }
        else {
            return res.status(401).json({
                errors: [{
                    msg: 'User not found'
                }]
            });
        }

    } catch (err) {

        return res.send(501).json({
            errors: [{
                msg: err
            }]
        });

    }
}