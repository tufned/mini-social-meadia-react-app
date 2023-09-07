import React, { useEffect, useState } from 'react';
import LogIn from './components/logIn/LogIn';
import HomePage from './components/HomePage/HomePage';
import './style.css';

function App() {
  const [userData, setUserData] = useState('');
  const [userIsSignIn, setUserIsSignIn] = useState(false);

  const userDataPassing = (data) => {
    setUserData(data);
  }


  useEffect(() => {
    if (userData != '') {
      console.log(userData);
      setUserIsSignIn(true);
    }
  }, [userData])


  useEffect(() => {
    if (localStorage.getItem('userData') !== null) {
      setUserIsSignIn(true);
      console.log(true);
    } 
    else setUserIsSignIn(false);
  }, [])

  

  return (
    <React.Fragment>
      {userIsSignIn ? <HomePage /> : <LogIn userDataPassing={userDataPassing} />}
    </React.Fragment>
  );
}

export default App;
