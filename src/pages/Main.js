import React, {useContext, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Add } from '../components/Add'
import { List } from '../components/List'
import Navbar from '../components/Navbar'
import { mainContext } from '../context/MainContext'

export default function Main() {
    const {user, setUser, logOut}  = useContext(mainContext)

    const history = useHistory()
    useEffect(() => {
        setUser()
        
    }, [])
    if (!user){
        history.push("/auth")
    }
    return (
        <div>
            <Navbar/>
            <Add/>
            <List/>
        </div>
    )
}
