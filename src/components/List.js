import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { mainContext } from '../context/MainContext'

export const List = () => {
    const {getTodos, todos, deleteTodo} = useContext(mainContext)
    console.log(todos)
    useEffect(() => {
        getTodos()
    }, [])

    return todos?(
        <div>
            <ul>
                {todos.map(item=>(
                    <li key={item.docId}>
                        {item.todo.title } {" "}
                        <button onClick={()=>deleteTodo(item.docId)}> Delete</button> | {" "}
                        <Link to={`/update/${item.docId}`}> 
                            <button>
                                Edit
                            </button>
                            
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    ): (
       <div>
           <h3>Loading...</h3>
       </div>
    )
}
