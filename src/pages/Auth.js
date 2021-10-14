import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { mainContext } from '../context/MainContext'



export default function Auth() {

    const {authUser, setUser, user} = useContext(mainContext)

    const history = useHistory()

    useEffect(() => {
        setUser()     
    }, []);

    if (user){
        history.push('/')
    }

    return (
        <div className="auth"> 
            <div className="auth-block">
                <h2>Sign up to use our app</h2>
                <button onClick={authUser}>Enter with Google</button>
            </div>
        </div>
    )
}
