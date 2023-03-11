import React, {useState, useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss';
import AuthPage from './components/AuthPage/AuthPage'; 
import Signup from './components/SignUp/SignUp';
import { Routes, Route } from "react-router-dom";
import Signin from './components/SignIn/SignIn';
import Dashboard from './components/Welcome/Dashboard';
import Main from './components/Main/Main';
import { auth } from './utils/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { LoggedIn } from './contexts/loggedin-context';
import TripPage from './components/Trips/TripPage/TripPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<string>('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(user ? user.uid : '');
    });
  }, []);

  return (
    <ChakraProvider>
      <LoggedIn.Provider value={isLoggedIn}>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="welcome" element={<Dashboard />} />
          <Route path="main" element={<Main />} />
          <Route path="/main/:tripId" element={<TripPage/>} />
        </Routes>
      </LoggedIn.Provider>
    </ChakraProvider>
  );
}

export default App;
