const mongoose = require('mongoose');

const todoSchema  = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
    },
    status:{
        type:String,
        enum:['pending','in-progress','completed'],
    }
},{
    timestamps:true
})


module.exports = mongoose.model('TODO',todoSchema)