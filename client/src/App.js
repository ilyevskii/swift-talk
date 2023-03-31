import React from 'react';
import {io} from "socket.io-client";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"
import Register from "./pages/Register/Register";
import { useContext } from "react";
import { AuthContext } from "./contexts/Auth/AuthContext";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
export const socket = io("http://localhost:3001");
function App() {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={user ? <Home /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            </Routes>
        </Router>
    );
}

export default App;
