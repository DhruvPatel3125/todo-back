const model = require('../models/todo-model');
const { body, validationResult } = require('express-validator');

const validateTodo = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional({ values: 'falsy' }),
    body('priority').optional({ values: 'falsy' }).isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
    body('status').optional({ values: 'falsy' }).isIn(['pending','in-progress','completed']).withMessage('Status must be pending, in-progress, or completed'),
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateTodo}