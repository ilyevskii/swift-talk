import React from 'react';
import {io} from "socket.io-client";

import {Login, Register, Home} from "pages";

import {useAuth} from "./contexts/Auth/AuthContext";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import {QueryClient, QueryClientProvider} from 'react-query';
import { Provider } from 'react-redux';
import {store} from 'store/store';

const queryClient: QueryClient = new QueryClient();

export const socket = io("http://localhost:3001");

function App(): JSX.Element {
  const {user}  = useAuth();

  return (
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <Router>
                  <Routes>
                      <Route path="/" element={user ? <Home socket={socket}/> : <Register />} />
                      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                  </Routes>
              </Router>
          </QueryClientProvider>
      </Provider>
  );
}

export default App;
