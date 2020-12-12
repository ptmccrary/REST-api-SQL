'use strict';

const express = require('express');
const { User } = require('../models');

// Constructs router instance
const router = express.Router();

// GET currently authenticated user
router.get('/users', asyncHandler(async (req, res) => {
    res.status(200).json({
        firstName: req.currentUser.firstName,
        lastName: req.currentUser.lastName,
        emailAddress: req.currentUser.emailAddress,
    });
}));

// POST new user
router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

module.exports = router;