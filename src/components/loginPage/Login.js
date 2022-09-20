import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { inputUsername, inputPassword, loggingIn, logout, register, changeSignUp, changeInvalidLogin } from '../../store/userReducer';
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import './Login.css';

function Login() {
    const username = useSelector((state) => state.user.username);
    const password = useSelector((state) => state.user.password);
    const signingUp = useSelector((state) => state.user.signingUp);
    const invalidLogin = useSelector(state => state.user.invalidLogin);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        let user = {
            username: username,
            password: password
        }
        dispatch(loggingIn(user));
        if(localStorage.getItem("token")!==null && localStorage.getItem("token")!=="Bearer undefined"){
            dispatch(changeInvalidLogin(false))
        }
        else{
            dispatch(changeInvalidLogin(true))
        }
        navigate("/resource", {replace: true});
    }
    
    const handleRegister = () => {
        let user = {
            username: username,
            password: password
        }
        dispatch(register(user));
    }

    return (
        <div className='Login'>
            {!signingUp
            ?<div>
                <h1 className="heading">Login</h1>
                <div className="input">
                    <label className="text">Username</label>
                    <br/>
                    <input type="text" autoComplete="off" placeholder="user123" value={username} name="username" onChange={(e) => dispatch(inputUsername(e.target.value))}/>
                </div>
                <div className="input">
                    <label className="text">Password</label>
                    <br/>
                    <input type="password" autoComplete="off" placeholder="******" value={password} name="password"onChange={(e) => dispatch(inputPassword(e.target.value))}/>
                </div>
                <div className="submitBtn">
                    <input type="submit" id="loginBtn" value="Login" onClick={() => handleLogin()}/>
                </div> 
                <div className="submitBtn">
                    <input type="submit" id="loginBtn" value="Sign Up" onClick={() => dispatch(changeSignUp(true))}/>
                </div> 
                <div>
                    {invalidLogin
                    ? <p className='Formvalid'>Incorrect username/password.</p>
                    : console.log()
                    }
                </div>
            </div>

            :<div>
                <h1 className="heading">Register</h1>
                <div className="input">
                    <label className="text">Username</label>
                    <br/>
                    <input type="text" autoComplete="off" placeholder="user123" name="username" onChange={(e) => dispatch(inputUsername(e.target.value))}/>
                </div>
                <div className="input">
                    <label className="text">Password</label>
                    <br/>
                    <input type="password" autoComplete="off" placeholder="******" name="password"onChange={(e) => dispatch(inputPassword(e.target.value))}/>
                </div>
                <div className="submitBtn">
                    <input type="submit" id="loginBtn" value="Register" onClick={() => handleRegister()}/>
                </div> 
                <div className="submitBtn">
                    <input type="submit" id="loginBtn" value="Already have an account?" onClick={() => dispatch(changeSignUp(false))}/>
                </div> 
            </div>
        }
        </div>
    );
}
export default Login;