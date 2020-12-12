const express = require('express');
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const { Course, User } = require('../models');

// Constructs router instance
const router = express.Router();

// GET list of all courses + user that owns each course
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName', 'emailAddress']
        }
    });

    res.status(200).json(courses);
}));

// GET specific course + user that owns it
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: {
            model: User,
            attributes: ['firstName', 'lastName', 'emailAddress']
        }
    });

    if (course) {
        res.status(200).json(course)
    } else {
        res.status(404).json({message: 'Course not found'});
    }
}));

// POST create new course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
        let course = await Course.create(req.body);
        return res.status(201).location(`/courses/${course.id}`).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

// PUT update corresponding course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    try {
        if (course && course.userId === req.currentUser.id) {
            await course.update(req.body);
            return res.status(204).location('/');
        } else {
            return res.status(403)
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
    res.status(204).json();
}));

// DELETE delete corresponding course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        if (req.currentUser.id !== course.userId) {
            res.status(403).end();
        } else {
            await course.destroy();
            return res.status(204).end()
        }
    } else {
        const error = new Error('Course not found');
        err.status = 404;
        throw error
    }
}));

module.exports = router;