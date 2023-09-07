import './AuthInput.css'

function AuthInput(props) {
    const inputStylesHandler = e => {
        const val = e.target.value.trim();
        if (val.length > 0) {
            e.target.classList.add('auth-input_onfocus');
            e.target.classList.remove('auth-input_error')
        }
        else {
            e.target.classList.remove('auth-input_onfocus');
        }
    }


    let errorMessage = '';
    if (props.isSignUp) {
        if (props.inputError[props.label.toLowerCase()]) {
            errorMessage = <p className='error-message'>{props.inputError[props.label.toLowerCase()]}</p>
        }
    } 
    else {
        if (props.inputError[props.label.toLowerCase()]) {
            errorMessage = <p className='error-message'>{props.inputError[props.label.toLowerCase()]}</p>
        }
    }


    return (
        <div className="input-shell">
            <p className="input-label">{props.label}</p>
            <input 
                ref={props.useRef} 
                onInput={inputStylesHandler} 
                type="text" 
                className='auth-input'
                placeholder={props.placeholder}
            />
            {errorMessage}
        </div>
    );
}

export default AuthInput;