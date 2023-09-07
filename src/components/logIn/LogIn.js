import { useEffect, useRef, useState } from 'react';
import './LogIn.css';
import AuthInput from './AuthInput/AuthInput';

function LogIn({ userDataPassing }) {
    const [isSignUp, setIsSignUp] = useState(false);
    
    const [signInInputValues, setSignInInputValues] = useState({
        email: '',
        password: ''
    });
    const [signUpInputValues, setSignUpInputValues] = useState({
        name: '',
        email: '',
        password: ''
    });


    const [singInInputError, setSingInInputError] = useState({
        email: null,
        password: null
    });
    const [singUpInputError, setSingUpInputError] = useState({
        name: null,
        email: null,
        password: null
    });


    const emailInp_SignIn = useRef();
    const paswInp_SignIn = useRef();

    const nameInp_SignUp = useRef();
    const emailInp_SignUp = useRef();
    const paswInp_SignUp = useRef();



    // const inputValPassing_signIn__email = val => {
    //     setSignInInputValues(prevState => {
    //         return {
    //             ...prevState,
    //             email: val,
    //         }
    //     })
    // } 



    const formsTypeSwipeHandler = (e) => {
        if (e.target.classList.contains('sing-up-but') && isSignUp == false) {
            setIsSignUp(true);
            emailInp_SignIn.current.value = '';
            paswInp_SignIn.current.value = '';
            emailInp_SignIn.current.classList.remove('auth-input_onfocus');
            paswInp_SignIn.current.classList.remove('auth-input_onfocus');
            emailInp_SignIn.current.classList.remove('auth-input_error');
            paswInp_SignIn.current.classList.remove('auth-input_error');
            
        }
        else if (e.target.classList.contains('sign-in-but')) {
            setIsSignUp(false);
            nameInp_SignUp.current.value = '';
            emailInp_SignUp.current.value = '';
            paswInp_SignUp.current.value = '';
            nameInp_SignUp.current.classList.remove('auth-input_onfocus');
            emailInp_SignUp.current.classList.remove('auth-input_onfocus');
            paswInp_SignUp.current.classList.remove('auth-input_onfocus');
            
            nameInp_SignUp.current.classList.remove('auth-input_error');
            emailInp_SignUp.current.classList.remove('auth-input_error');
            paswInp_SignUp.current.classList.remove('auth-input_error');
        }
    }



    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (isSignUp) {
            if (signUpInputsCheckout() != true) return false;

            setSignUpInputValues({
                name: nameInp_SignUp.current.value,
                email: emailInp_SignUp.current.value,
                password: paswInp_SignUp.current.value
            });
        }
        else {
            if (signInInputsCheckout() != true) return false;

            setSignInInputValues({
                email: emailInp_SignIn.current.value,
                password: paswInp_SignIn.current.value
            });
        }

    }





    const signUpInputsCheckout = () => {
        const singUpCheckout = [false, false, false];

        if (nameInp_SignUp.current.value.trim().length > 2) {
            singUpCheckout[0] = true;
        }
        else {
            setSingUpInputError(prevState => {
                return {
                    ...prevState,
                    name: 'Name must contain more then 2 letters'
                }
            })
            nameInp_SignUp.current.classList.add('auth-input_error');
        }


        if (emailInp_SignUp.current.value.includes('@') && emailInp_SignUp.current.value.includes('.')) {
            singUpCheckout[1] = true;
        }
        else {
            setSingUpInputError(prevState => {
                return {
                    ...prevState,
                    email: 'Please write valid email'
                }
            })
            emailInp_SignUp.current.classList.add('auth-input_error');
        }


        const paswVal = paswInp_SignUp.current.value.trim();
        if (paswVal.length > 5 && /[A-Z]/.test(paswVal)) {
            singUpCheckout[2] = true;
        }
        else {
            setSingUpInputError(prevState => {
                return {
                    ...prevState,
                    password: 'Password must contain more then 6 symbols and at least 1 capital letter'
                }
            })
            paswInp_SignUp.current.classList.add('auth-input_error');
        }


        if (singUpCheckout[0] && singUpCheckout[1] && singUpCheckout[2]) {
            return true;
        }
    }




    const signInInputsCheckout = () => {
        const singInCheckout = [false, false];

        const emailInputVal = emailInp_SignIn.current.value.trim();
        const paswInputVal = paswInp_SignIn.current.value.trim();

        if (emailInputVal.length > 2) {
            singInCheckout[0] = true;
        }
        else {
            setSingInInputError(prevState => {
                return {
                    ...prevState,
                    email: 'Please enter your email'
                }
            })
            emailInp_SignIn.current.classList.add('auth-input_error');
        }
        if (paswInputVal.length > 5) {
            singInCheckout[1] = true;
        }
        else {
            setSingInInputError(prevState => {
                return {
                    ...prevState,
                    password: 'Please enter your password'
                }
            })
            paswInp_SignIn.current.classList.add('auth-input_error');
        }
        
        if (singInCheckout[0] && singInCheckout[1]) return true;
    }





    const dataBase = 'https://mini-social-meadia-react-app-default-rtdb.firebaseio.com/users-auth-data.json';

    
    useEffect(() => {
        if (signUpInputValues.name != '' || signUpInputValues.email != '' || signUpInputValues.password != '') {
            console.log(signUpInputValues);
        }

    }, [signUpInputValues])
    

    useEffect(() => {
        const fetchAsync = async () => {
            const response = await fetch(dataBase);
            const responseData = await response.json();

            for (let key in responseData) {
                if (responseData[key].email == signInInputValues.email && responseData[key].password == signInInputValues.password) {
                    userDataPassing(responseData);
                    localStorage.setItem('userData', JSON.stringify(responseData));
                }
            }
        }


        if (signInInputValues.email != '' || signInInputValues.password != '') {  
            fetchAsync();
        }
    }, [signInInputValues])





    return (
        <div className="LogIn-page">
            <div className="LogIn-page_decor">
                <h1 className='the-title'>Social Media</h1>
                <p className='the-title-extra'>the hole new horizon of possibilities </p>
            </div>
            <div className="LogIn-page_forms-shell">
                <div className="swap-buts-area">
                    <div onClick={formsTypeSwipeHandler} className="swap-buts-shell">
                        <button className="sign-in-but swap-but">Sign In</button>
                        <button className="sing-up-but swap-but">Sign Up</button>
                        <div className={`swap-but_active-layer 
                            ${isSignUp ? 'swap-but_active-layer__sign-up' : ''}
                        `}>
                            {isSignUp ? 'Sign Up' : 'Sign In'} 
                        </div>
                    </div>
                </div>
                <form onSubmit={formSubmitHandler} className="inputs-area">
                    {isSignUp ? (
                        <>
                            <AuthInput 
                                isSignUp={isSignUp}
                                label='Name'
                                placeholder='Saul Goodman'
                                useRef={nameInp_SignUp}
                                inputError={singUpInputError}
                            />
                            <AuthInput 
                                isSignUp={isSignUp}
                                label='Email'
                                placeholder='email@gmail.com'
                                useRef={emailInp_SignUp}
                                inputError={singUpInputError}
                            />
                            <AuthInput 
                                isSignUp={isSignUp}
                                label='Password'
                                placeholder='*******'
                                useRef={paswInp_SignUp}
                                inputError={singUpInputError}
                            />
                        </>
                    ) : (
                        <>
                            <AuthInput 
                                isSignUp={isSignUp}
                                label='Email'
                                placeholder='email@gmail.com'
                                useRef={emailInp_SignIn}
                                inputError={singInInputError}
                                />
                            <AuthInput 
                                isSignUp={isSignUp}
                                label='Password'
                                placeholder='*******'
                                useRef={paswInp_SignIn}
                                inputError={singInInputError}
                            />
                        </> 
                    )}  
                    <button type="submit" className="logIn-submit-but">
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;