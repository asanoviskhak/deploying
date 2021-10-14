import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@firebase/firestore'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import React from 'react'
import { auth, firestore } from '../Firebase'


export const mainContext = React.createContext()

const INIT_STATE = {
    user: {},
    todos: null,
    oneTodo: null
}

const reducer = (state=INIT_STATE, action) => {

    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        case "GET_TODOS":
            return{
                ...state,
                todos: action.payload
            }
        case "GET_ONE_TODO":
            return{
                ...state,
                oneTodo: action.payload
            }
        default: 
        return state
    }
    
}

export default function MainContextProvider({children}) {
    
    const [state, dispatch] = React.useReducer(reducer, INIT_STATE);

    const provider = new GoogleAuthProvider();
    
    const authUser = async () => {
        try {
            const user = await signInWithPopup(auth, provider)
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }
    

    const setUser = () =>{
        onAuthStateChanged(auth, (user)=>{
            if (user){
                dispatch({
                    type: "SET_USER",
                    payload: user
                })
            }else{
                dispatch({
                    type: "SET_USER",
                    payload: user
                })
            }
        })
    }

    const logOut = () =>{
        try {
            signOut(auth)
        } catch (error) {
            console.log(error)
        }
    } 

    const addTodo = async (todo) => {
        try {
            await addDoc(collection(firestore, "todos"), {
                todo,
                userId: state.user.uid
            })
            getTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const getTodos = async ()=>{
        onAuthStateChanged(auth, async(user)=>{
            if(user){
                try {
                    const todosRef = collection(firestore, 'todos')
                    const q = query(todosRef, where("userId", "==", user.uid))
                    const querySnapshot = await getDocs(q)
                    const todos = []
                    querySnapshot.forEach((item) =>{
                        todos.push({...item.data(), docId: item.id})
                    })
                    todos.sort((a,b)=>a.todo.id - b.todo.id)
                    dispatch({
                        type:"GET_TODOS",
                        payload: todos
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
        
    }

    const deleteTodo = async (docId) => {
        await deleteDoc(doc(firestore, "todos", docId));
    }

    const getOneTodo = async(docId) => {
        const ref = doc(firestore, "todos", docId);
        const docData = await getDoc(ref);
        let data = docData.data();
        dispatch({
            type: "GET_ONE_TODO",
            payload: data
        })
    }

    const saveEditedTodo = async (editedTodo, docId) => {
        const ref = doc(firestore, "todos", docId)
        await updateDoc(ref, editedTodo)
        getTodos()
    }

    return (
        <mainContext.Provider value={{ 
            authUser, 
            setUser ,
            logOut,
            addTodo,
            getTodos,
            deleteTodo,
            getOneTodo,
            saveEditedTodo,
            user: state.user,
            todos: state.todos,
            oneTodo: state.oneTodo
            }}>
            { children }    
        </mainContext.Provider>
    )
}
