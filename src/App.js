import React from 'react'
import Home from './components/Home';
import Recents from './components/Recents';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
            </Switch>
            <Switch>
                <Route exact path='/recents'>
                    <Recents />
                </Route>
            </Switch>
        </Router>
    )

}

export default App;
