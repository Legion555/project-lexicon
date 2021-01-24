import React from 'react';
import axios from 'axios';
import '../styles/Login.scss'
import { useDispatch } from 'react-redux';
import { updateView, updateUserData } from '../actions';


const Login = () => {
    const dispatch = useDispatch();

    const [authView, setAuthView] = React.useState('login');
    
    const [errorHandle, setErrorHandle] = React.useState([]);
    //Login
    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    //Register
    const [regName, setRegName] = React.useState('');
    const [regEmail, setRegEmail] = React.useState('');
    const [regPassword, setRegPassword] = React.useState('');

    //Login existing user - pass
    const login = (e, email, password) => {
        e.preventDefault();
        const details = {
            email: email,
            password: password
        }
        axios.post('/api/users/login', details)
        .then(res => {
            if (res.data === 'success') {
                axios.get('/api/users', {
                    params: {
                        email: loginEmail
                    }
                })
                .then(res => {
                    //set user data
                    dispatch(updateUserData(res.data[0]));
                    //redirect to dashboard
                    dispatch(updateView('dashboard'));
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
            } else {
                let match = res.data.match(/"([^"]*)"/);
                let error = [];
                switch (match[1]) {
                    case 'email':
                        error = ['login-email', res.data];
                        setErrorHandle(error);
                        setLoginEmail('');
                        break;
                    case 'password':
                        error = ['login-password', res.data];
                        setErrorHandle(error);
                        setLoginPassword('');
                        break;
                    default:
                        console.log('something went wrong...');
                }
            }
            console.log(res.data)
            // if (res.data.length > 15) {
            //     //Get User Data
            //     axios.get('/api/users', {
            //         params: {
            //             email: loginEmail
            //         }
            //     })
            //     .then(res => {
            //         //set user data
            //         const newUserData = res.data;
            //         props.setUserData(newUserData);
            //         //set headers
            //         const userToken = res.headers["auth-token"];
            //         sessionStorage.setItem('userToken', userToken);
            //         //redirect to home
            //         props.setIsLoggedIn(true);
            //         props.setView('home');
            //     })
            //     .catch(err => {
            //         console.log("Error: " + err);
            //     })
            // } else {
            //     let match = res.data.match(/"([^"]*)"/);
            //     let error = [];
            //     switch (match[1]) {
            //         case 'email':
            //             error = ['login-email', res.data];
            //             setErrorHandle(error);
            //             setLoginEmail('');
            //             break;
            //         case 'password':
            //             error = ['login-password', res.data];
            //             setErrorHandle(error);
            //             setLoginPassword('');
            //             break;
            //         default:
            //             console.log('something went wrong...');
            //     }
            // }
        })
    }
    const practiceLogin = (e) => {
        e.preventDefault();
        const details = {
            email: 'practice@gmail.com',
            password: 'practice123'
        }
        axios.post('/api/users/login', details)
        .then(res => {
            axios.get('/api/users', {
                params: {
                    email: 'practice@gmail.com'
                }
            })
            .then(res => {
                //set user data
                dispatch(updateUserData(res.data[0]));
                //redirect to dashboard
                dispatch(updateView('dashboard'));
            })
            .catch(err => {
                console.log("Error: " + err);
            })
        })
    }

    //Register new user
    const register = (e) => {
        e.preventDefault();
        const payload = {
            name: regName,
            email: regEmail,
            password: regPassword
        }
        axios.post('/api/users/register', payload)
        .then(res => {
            if (res.data === 'success') {
                setAuthView('login');
                setErrorHandle('registered');
            } else {
                let match = res.data.match(/"([^"]*)"/);
                let error = [];
                switch (match[1]) {
                    case 'name':
                        error = ['register-name', res.data];
                        setErrorHandle(error);
                        setRegName('');
                        break;
                    case 'email':
                        error = ['register-email', res.data];
                        setErrorHandle(error);
                        setRegEmail('');
                        break;
                    case 'password':
                        error = ['register-password', res.data];
                        setErrorHandle(error);
                        setRegPassword('');
                        break;
                    default:
                        console.log('something went wrong...');
                }
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div  className="auth">
            <div className="auth__container">
                <h1><span onClick={() => setAuthView('login')} className={authView === 'login' ? 'active' : undefined}>Login</span> | <span onClick={() => setAuthView('register')} className={authView === 'register' ? 'active' : undefined}>Register</span></h1>
                {authView === 'login' &&
                <div className="login__container">
                    <form>
                        <input type="text" required placeholder={errorHandle[0] === 'login-email' ? errorHandle[1] : 'Email'}
                            value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                        <input type="password" required placeholder={errorHandle[0] === 'login-password' ? errorHandle[1] : 'Password'}
                            value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>

                        <button className="submit" onClick={(e) => login(e, loginEmail, loginPassword)}>Login</button>
                    </form>
                    {errorHandle === 'registered' &&
                    <p>Successfully registered!<br/>Please login.</p>
                    }
                    <button className="login-practice" onClick={(e) => practiceLogin(e)}>Login with practice account</button>
                </div>
                }
                {authView === 'register' &&
                <div className="register__container">
                    {errorHandle !== 'registered' &&
                    <form className="input-main">
                        <input type="text" required placeholder={errorHandle[0] === 'register-name' ? errorHandle[1] : 'Name'}
                            value={regName} onChange={(e) => setRegName(e.target.value)}></input>
                        <input type="text" required placeholder={errorHandle[0] === 'register-email' ? errorHandle[1] : 'Email'}
                            value={regEmail} onChange={(e) => setRegEmail(e.target.value)}></input>
                        <input type="password" required placeholder={errorHandle[0] === 'register-password' ? errorHandle[1] : 'Password'}
                            value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></input>
                        
                        <button className="submit" onClick={(e) => register(e, regName, regEmail, regPassword)}>Register</button>
                    </form>
                    }
                </div>
                }
            </div>
        </div>
    )
};

export default Login