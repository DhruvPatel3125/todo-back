import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import CreateTodos from './CreateTodos'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [editTodo, setEditTodo] = useState(null)

  const fetchTodos = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:3000/api/todos')
      setTodos(res.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = (todo) => {
    setEditTodo(todo)
  }

  const handleCancelEdit = () => {
    setEditTodo(null)
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/delete-todo/${id}`)
      if (res.status === 200) {
        if (editTodo && editTodo._id === id) {
          setEditTodo(null)
        }
        fetchTodos()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Todo App</h1>
      <CreateTodos 
        onTodoCreated={fetchTodos} 
        editTodo={editTodo} 
        onCancelEdit={handleCancelEdit} 
      />
      {loading ? (
        <div className="text-center text-gray-500 py-4">Loading...</div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div key={todo._id} className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center text-gray-800 text-sm">
              <div>
                <div className="font-medium">{todo.title}</div>
                {todo.description && <div className="text-xs text-gray-500">{todo.description}</div>}
              </div>
              <div className="flex items-center gap-2">
                {todo.priority && (
                  <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-700 capitalize">
                    {todo.priority}
                  </span>
                )}
                <button onClick={() => handleEditClick(todo)} className="text-xs px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Update</button>
                <button onClick={() => handleDelete(todo._id)} className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App