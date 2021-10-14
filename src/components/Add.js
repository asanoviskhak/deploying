import React, { useContext, useState } from 'react'
import { mainContext } from '../context/MainContext'

export const Add = () => {
    const {addTodo} = useContext(mainContext)

    const [todo, setTodo] = useState({
        id: Date.now(),
        title: "",
    })

    function handleClick(e){
        e.preventDefault();
        addTodo(todo)
        setTodo({
            id: Date.now(),
            title: "",
        })
    }

    function handleChange(e){
        setTodo({...todo, title: e.target.value})
    }
    return (
        <div>
            <input type="text" onChange={handleChange} />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}
