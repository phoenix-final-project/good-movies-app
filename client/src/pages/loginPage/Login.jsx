import React, { useState } from "react";

// importing Link
import { Link, useHistory } from "react-router-dom";

// redux, dispatch
import { useDispatch } from "react-redux";
import axiosApiInstance from "../../util/APIinstance"; 
import { loginUser } from "../../redux/actions/userActions";

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
    const [alertMessage, setAlertMessage] = useState("hidden");
    const [alertMessageError, setAlertMessageError] = useState("hidden");
    const [errorMessageDatabase, setErrorMessageDatabase] = useState("");

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
        axiosApiInstance.post('/api/user/login', values)
            .then(response => {
                if (response.status === 200) {
                    dispatch(loginUser(response.data.user, response.data.token));
                    window.localStorage.setItem('username', response.data.user.username);
                    window.localStorage.setItem('user_id', response.data.user._id);
                    window.localStorage.setItem('token', response.data.token);
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
                    history.push('/protected-movies');
                }, 8000);
            })
            .catch(error => {
                if (error.response.data.message) {
                    setErrorMessageDatabase(error.response.data.message)
                };

                if (error.response.data.error) {
                    setErrorMessageDatabase(error.response.data.error.errors[0].msg)
                }

                setAlertMessageError('error');
                e.target.reset();

                setTimeout(() => {
                    setAlertMessageError('hidden');
                }, 4000)
            });
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
                    {/* NOTIFICATIONS - success / error */}
                    <div className={alertMessage}>{values.username} successfully logged in.</div>
                    <div className={alertMessageError}>{errorMessageDatabase}</div>

                    <form className="form-container" onSubmit={handleSubmit}>
                        {/* USERNAME */}
                        <label htmlFor="username">username * </label>
                        <input type="text" name="username" onChange={handleChange} />

                        {/* PASSWORD */}
                        <label htmlFor="password">password * </label>
                        <input type="password" name="password" onChange={handleChange} />

                        <button className='submit-btn' type="submit" title='Please submit'>{status}</button>
                    </form>
                </FormBanner>
            </section>
        </React.Fragment>
    );
}
