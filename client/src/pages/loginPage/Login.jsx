import React, { useState } from "react";

// importing Link
import { Link, useHistory } from "react-router-dom";

// redux, dispatch
import { useDispatch } from "react-redux";
import axiosApiInstance from "../../util/APIinstance";
import { loginUser } from "../../redux/actions/userActions";

// validation errors
import { ValidationErrorLogin } from "../../components/validation/ValidationError";

// importing NavBanner, FormBanner
import NavBanner from "../../components/navBanner/NavBanner";
import FormBanner from '../../components/formBanner/FormBanner';

// styling
import "./Login.scss";

export default function Login() {

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [ status, setStatus ] = useState('login');
    const [ errors, setErrors ] = useState({});
    const [alertMessage, setAlertMessage] = useState("hidden");
    const [alertMessageError, setAlertMessageError] = useState("hidden");

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
    }

    // Dispatch actions
    const dispatch = useDispatch();
    const history = useHistory();


    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const checkErrors = ValidationErrorLogin(values);
        if (Object.keys(checkErrors).length !== 0 ) {
            setErrors(checkErrors);
        }
        else {
            setErrors(ValidationErrorLogin(values));
            axiosApiInstance.post('/api/user/login', values)
                .then(response => {
                    if (response.status === 200) {
                        dispatch(loginUser(response.data.user, response.data.token));
                        // console.log(response);
                    }
                })
                .then(view => {
                    setStatus('in process...');
                    e.target.reset();
    
                    setTimeout(() => {
                        setStatus("login");
                    }, 3000);
    
                    // redirect to login
                    setTimeout(() => {
                        setAlertMessage('alert');
                    }, 3000);

                    setTimeout(() => {
                        setAlertMessage('hidden');
                    }, 6000);

                    setTimeout(() => {
                        history.push('/movies');
                    }, 8000);
                })
                .catch(error => {
                    setAlertMessageError('error');
                    e.target.reset();

                    setTimeout(() => {
                        setAlertMessageError('hidden');
                    }, 4000)
                });
        }
    };

    return (
        <React.Fragment>
            <NavBanner>
                <div className="container-button">
                    <Link to='/'><button className="registration-btn" title='return to main page'>return home</button></Link>
                </div>
            </NavBanner>
            <section className="registration">
                <FormBanner title='Login with your existing account to get'>
                    <div className={alertMessage}>{values.username} successfully logged in.</div>
                    <div className={alertMessageError}>{values.username}, unfortunately, an error occurred. Please try again later! </div>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <label htmlFor="username">username * {errors.username && <span className='error-para'>{errors.username}</span> }</label>
                        <input type="text" name="username" onChange={handleChange} />

                        <label htmlFor="password">password * {errors.password && <span className='error-para'>{errors.password}</span> }</label>
                        <input type="password" name="password" onChange={handleChange} />

                        <button className='submit-btn' type="submit" title='Please submit'>{status}</button>
                    </form>
                </FormBanner>
            </section>
        </React.Fragment>
    );
}
