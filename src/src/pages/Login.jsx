import axios from "axios";
import googleLogo from '../images/google.png';
import { useState, useContext } from "react";
import '../css/Login.css';

const Login = () => {

    const [axiosError, setAxiosError] = useState(null);

    const handleGoogleAuth = () => {
        window.location.href = `http://${window.location.hostname}:3000/auth/google`;
    };

    return (
        <div className="formWrapper">
            <div className="loginBox">
                <h1>Login com Google</h1>
                <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="googleButton"
                >
                    <img src={googleLogo} alt="Google logo" />
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
