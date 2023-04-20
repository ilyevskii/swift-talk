import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import React, {useEffect} from 'react';
import {io} from "socket.io-client";

import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import {store} from 'store/store';

import {Login, Register, Home} from "pages";
import {useAuth} from "./contexts/Auth/AuthContext";
import {useSocket} from "hooks";

const queryClient: QueryClient = new QueryClient();
export const socket: any = io("http://localhost:3001");

function App(): JSX.Element {
  const {user}  = useAuth();
  const {setSocket} = useSocket();

  useEffect(() => {
      setSocket(socket);
  }, [])

  return (
      <Provider store={store}>
          <QueryClientProvider client={queryClient}>
              <Router>
                  <Routes>
                      <Route path="/" element={user ? <Home/> : <Register />} />
                      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                  </Routes>
              </Router>
          </QueryClientProvider>
      </Provider>
  );
}

export default App;
