import React, {useContext, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { mainContext } from '../context/MainContext'

export default function Navbar() {

    const {user, setUser, logOut}  = useContext(mainContext)

    const history = useHistory()

    useEffect(() => {
        setUser()
    }, [])

    
    

    return (
        <div className="navbar">
            <div>Main</div>
            <div>
                {user ? (
                    <div>
                        <strong>{user.displayName}</strong>
                        <button onClick={logOut}>Sign out</button>
                    </div>
                ):null}
                
            </div>
            
        </div>
    )
}
