import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainContextProvider from './context/MainContext'
import Auth from './pages/Auth'
import Main from './pages/Main'
import { Update } from './pages/Update'

export default function Routes() {
    return (
        <MainContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/auth" component={Auth}/>
                    <Route exct path="/update/:docId" component={Update}/>
                </Switch>
            </BrowserRouter>
       </MainContextProvider>
    )
}
