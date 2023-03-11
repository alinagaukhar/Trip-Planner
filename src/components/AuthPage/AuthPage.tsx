import logo from '../assets/auth_logo.svg';
import { useNavigate } from "react-router-dom";
import { LoggedIn } from '../../contexts/loggedin-context';
import { useContext, useEffect } from 'react';

function AuthPage()  {
    const isLoggedIn= useContext(LoggedIn);
    const navigate = useNavigate();
    
   
    const redirectSignUp = () => {
        if (isLoggedIn) {
            navigate('/main');
        }
        else {
            navigate('/signup')
        }
    };

    const redirectSignIn = () => {
        if (isLoggedIn) {
            navigate('/main');
        }
        else {
            navigate('/signin')
        }
    }
    return (
        <div className='main'>
            <div className='content'>
                <h1>Let's Plan your Road trip!</h1>
                <button onClick={redirectSignUp}> Create new account </button>
                <br />
                <button onClick={redirectSignIn}> Log in </button>
            </div>
            {isLoggedIn ? <div>User logged in </div> : <></>}
        </div>
    )
}

export default AuthPage