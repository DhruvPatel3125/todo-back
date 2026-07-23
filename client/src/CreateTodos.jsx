import axios from "axios"
import { useState } from "react"

function CreateTodos(){
    const [form,setForm] = useState({
        name:'',
        description:'',
        priority:'',
        dueDate:''})
    const [todo,setTodo] = useState('')
    const handleChange = (e) => {
        setForm((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
    const handleClick = async() => {
        try {
            const res = await axios.post('http://localhost:3000/api/create-todo',form)
            setTodo(res.data.data)
        } catch (error) {
            console.error(error)
        }
    }
    return(
        <div className="flex justify-center">
        <input type="text" placeholder="Add a Title of a TODO" name="name" value={form.name} onChange={handleChange}/>
        <textarea type="text" placeholder="Add a description" name="description" value={form.description} onChange={handleChange}/>
        <select name="priority" onChange={handleChange}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
        <input type="datetime-local" name="dueDate" value={form.dueDate} onChange={handleChange}/>
        <button onClick={handleClick}>Click</button>
        </div>
    )
}

export default CreateTodos