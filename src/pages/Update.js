import React, {useContext, useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import Navbar from '../components/Navbar'
import { mainContext } from '../context/MainContext'
export const Update = () => {
    const {docId} = useParams()
    const {getOneTodo, oneTodo, saveEditedTodo}  = useContext(mainContext)
    const [todo, setTodo] = useState(oneTodo)
    const history = useHistory()
    
    useEffect(()=>{
        setTodo(oneTodo)
    }, [oneTodo])

    useEffect(() => {
        getOneTodo(docId)
    }, [])

    function handleClick(e){
        e.preventDefault();
        saveEditedTodo(todo, docId)
        history.push('/')
    }

    function handleChange(e){
        setTodo({...todo, todo: {
            ...todo.todo,
            title: e.target.value
        }})
    }

    return (
        <div>
            <Navbar/>
            {
            todo && <div>
                <input type="text" onChange={handleChange} value={todo.todo.title} />{" "}
                <button onClick={handleClick}>Save</button>
                </div>
            }
        </div>
    )
}
