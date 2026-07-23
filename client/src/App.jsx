import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import CreateTodos from './CreateTodos'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  
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

  useEffect(()=> {
    fetchTodos()
  },[])

  return(
    <>
      <div className='d-block'>
        <CreateTodos onTodoCreated={fetchTodos}/>
        {loading ? <div>Loading...</div> : (
          <div>
            {todos.map((todo) => (
              <div key={todo._id}>{todo.title}</div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App