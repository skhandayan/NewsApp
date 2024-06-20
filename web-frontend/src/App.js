import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Registration from './containers/Registration';
import Profile from './containers/Profile';
import Authors from './containers/authors';


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/signup" element={<Registration/>} />
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/profile" element={<Profile/>} />
                <Route exact path="/authors" element={<Authors/>} />
            </Routes>
        </Router>
    );
}

export default App;
