const {getAllTodos,createTodo,getTodoById,updateTodo,deleteTodo} = require('../controller/todo-controller')
const { validateTodo } = require('../validation/todo-validation')
const express = require('express');
const router = express.Router();

router.get('/todos',getAllTodos);
router.post('/create-todo', validateTodo, createTodo);
router.get('/todo/:id',getTodoById);
router.put('/update-todo/:id', validateTodo, updateTodo);
router.delete('/delete-todo/:id',deleteTodo);

module.exports = router;
