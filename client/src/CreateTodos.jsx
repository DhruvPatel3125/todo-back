import axios from "axios"
import { useState, useEffect } from "react"

function CreateTodos({ onTodoCreated, editTodo, onCancelEdit }){
    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
    })

    useEffect(() => {
        if (editTodo) {
            setForm({
                title: editTodo.title || '',
                description: editTodo.description || '',
                priority: editTodo.priority || 'medium',
                dueDate: editTodo.dueDate ? editTodo.dueDate.slice(0, 16) : ''
            })
        } else {
            setForm({
                title: '',
                description: '',
                priority: 'medium',
                dueDate: ''
            })
        }
    }, [editTodo])

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleClick = async () => {
        if (!form.title.trim()) return
        try {
            if (editTodo) {
                await axios.put(`http://localhost:3000/api/update-todo/${editTodo._id}`, form)
                if (onCancelEdit) onCancelEdit()
            } else {
                await axios.post('http://localhost:3000/api/create-todo', form)
            }
            if (onTodoCreated) {
                onTodoCreated()
            }
            setForm({
                title: '',
                description: '',
                priority: 'medium',
                dueDate: ''
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col gap-3 mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">
                {editTodo ? 'Edit Todo' : 'Add New Todo'}
            </h2>
            <input 
                type="text" 
                placeholder="Add a Title of a TODO" 
                name="title" 
                value={form.title} 
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <textarea 
                placeholder="Add a description" 
                name="description" 
                value={form.description} 
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
                <select 
                    name="priority" 
                    value={form.priority} 
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 flex-1"
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <input 
                    type="datetime-local" 
                    name="dueDate" 
                    value={form.dueDate} 
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 flex-1"
                />
            </div>
            <div className="flex gap-2">
                <button 
                    onClick={handleClick}
                    className={`py-2 px-4 rounded text-sm font-medium text-white transition flex-1 ${editTodo ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {editTodo ? 'Update Todo' : 'Add Todo'}
                </button>
                {editTodo && (
                    <button 
                        onClick={() => {
                            if (onCancelEdit) onCancelEdit()
                            setForm({ title: '', description: '', priority: 'medium', dueDate: '' })
                        }}
                        className="py-2 px-4 rounded text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    )
}

export default CreateTodos