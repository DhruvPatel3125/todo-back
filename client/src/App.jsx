import { useEffect, useState } from 'react'
import axios from 'axios'
import './app.css'
import CreateTodos from './CreateTodos'
function App() {
  const [todo,setTodo] = useState('')
  const [ todos, setTodos] = useState([])
  const [loading,setLoading] = useState(false)
  
  useEffect(()=> {
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
    fetchTodos()
  },[])
return(
  <>
    <div className='d-block'>
      <CreateTodos/>
      {loading ? <div>Loading...</div> : (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>{todo.title}</div>
          ))}
        </div>
      )}
    </div>
  </>
)
}

export default App