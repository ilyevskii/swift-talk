import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import React from 'react';
import {io} from "socket.io-client";

import {QueryClient, QueryClientProvider} from 'react-query';

import {Login, Register, Home} from "pages";
import {useAuth} from "./contexts/Auth/AuthContext";
import {useThemeSwitcher} from "./hooks/storeHooks/useThemeSwitcher";

const queryClient: QueryClient = new QueryClient();
export const socket: any = io("http://localhost:3001");

function App(): JSX.Element {
  const {user}  = useAuth();
  const {isLightTheme} = useThemeSwitcher();

  return (
      <QueryClientProvider client={queryClient}>
          <div className={isLightTheme ? 'light-theme': 'dark-theme'}>
              <Router>
                  <Routes>
                      <Route path="/" element={user ? <Home socket={socket}/> : <Register />} />
                      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                  </Routes>
              </Router>
          </div>
      </QueryClientProvider>
  );
}

export default App;
