const todoModel = require('../models/todo-model');

const getAllTodos = async (req, res) => {
    try {
        const todos = await todoModel.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTodo = async (req,res) => {
    try {
        const {title,description,priority,status} = req.body;
        const newTodo = new todoModel({
            title,
            description,
            priority,
            status
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getTodoById = async (req,res) => {
    try {
        const todo = await todoModel.findById(req.params.id);
        if(!todo){
            return res.status(404).json({message:'Todo not found'});
        }
        res.status(200).json(todo);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateTodo = async (req,res) => {
    try {
        const {title,description,priority,status} = req.body;
        const todo = await todoModel.findByIdAndUpdate(req.params.id,{
            title,
            description,
            priority,status
        })
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteTodo = async (req,res) => {
    try {
        const todo = await todoModel.findByIdAndDelete(req.params.id);
        if(!todo){
            return res.status(404).json({message:'Todo not found'});
        }
        res.status(200).json({message:'Todo deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo
}