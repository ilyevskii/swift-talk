import React from 'react';
import {io} from "socket.io-client";

import {Login, Register, Home} from "./pages";

import {useAuth} from "./contexts/Auth/AuthContext";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

export const socket = io("http://localhost:3001");

function App() {
  const {user} = useAuth();

  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={user ? <Home socket={socket}/> : <Register />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          </Routes>
        </Router>
      </QueryClientProvider>
  );
}

export default App;
