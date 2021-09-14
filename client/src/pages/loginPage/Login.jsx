import React, { useState } from "react";

// redux, dispatch
import { useDispatch } from "react-redux";
import axiosApiInstance from "../../util/APIinstance";
import { loginUser } from "../../redux/actions/userActions";

// importing NavBanner, FormBanner
import FormBanner from '../../components/formBanner/FormBanner';

// validation errors
import { ValidationErrorLogin } from "../../components/validation/ValidationError";

// styling
import "./Login.scss";

export default function Login() {

    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const [status, setStatus] = useState('login');
    const [alertMessage, setAlertMessage] = useState("hidden");
    const [alertMessageError, setAlertMessageError] = useState("hidden");
    const [errorMessageDatabase, setErrorMessageDatabase] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [ errors, setErrors ] = useState({});

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

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const checkErrors = ValidationErrorLogin(values);

        if (Object.keys(checkErrors).length !== 0 ) {
            setErrors(checkErrors);
        }
        else {axiosApiInstance.post('/api/user/login', values)
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
                    setAlertMessage('alert');
                }, 1000);

                // redirect to login
                setTimeout(() => {
                    setAlertMessage('hidden');
                }, 2000);

                setTimeout(() => {
                    window.location.href = '/movies';
                }, 2500);
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
                }, 2000)
            });
        }
    };

    const handleBlur = () => {
        if (isSubmitted) {
            const checkErrors = ValidationErrorLogin(values);

            if (Object.keys(checkErrors).length !== -1 ) {
                setErrors(checkErrors);
            }
        }
    };

    return (
        <React.Fragment>

            <section className="registration">
                <FormBanner title='Login with your existing account to get'>
                    {/* NOTIFICATIONS - success / error */}
                    <div className={alertMessage}>{values.username} successfully logged in.</div>
                    <div className={alertMessageError}>{errorMessageDatabase}</div>

                    <form className="form-container" onSubmit={handleSubmit}>
                        {/* USERNAME */}
                        <label htmlFor="username">username * {errors.username && <span className='error-para'>{errors.username}</span> } </label>
                        <input type="text" name="username" onChange={handleChange} onBlur={handleBlur}/>

                        {/* PASSWORD */}
                        <label htmlFor="password">password * {errors.password && <span className='error-para'>{errors.password}</span> } </label>
                        <input type="password" name="password" onChange={handleChange} onBlur={handleBlur}/>

                        <button className='submit-btn' type="submit" title='Please submit'>{status}</button>
                    </form>
                </FormBanner>
            </section>
        </React.Fragment>
    );
}
