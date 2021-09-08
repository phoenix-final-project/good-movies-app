import React, { useState } from 'react';

// importing Link
import { Link, useHistory } from "react-router-dom";

import axiosApiInstance from "../../util/APIinstance";

// validation errors
import { ValidationErrorRegistration } from "../../components/validation/ValidationError";

// styling
import './RegistrationPage.scss';

// importing NavBanner, FormBanner
import NavBanner from "../../components/navBanner/NavBanner";
import FormBanner from '../../components/formBanner/FormBanner';

function RegistrationPage() {
    // history hook
    const history = useHistory();

    // useState
    const [status, setStatus] = useState("sign up");
    const [alertMessage, setAlertMessage] = useState("hidden");
    const [alertMessageError, setAlertMessageError] = useState("hidden");
    const [values, setValues] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkErrors = ValidationErrorRegistration(values);

        if (Object.keys(checkErrors).length !== 0 ) {
            setErrors(checkErrors);
        }
        else {
            axiosApiInstance.post('/api/user/register', values)
                .then(response => response)
                .then(view => {
                    setStatus('Being registered...');
                    e.target.reset();
    
                    setTimeout(() => {
                        setStatus("sign up");
                    }, 3000);
    
                    // redirect to login
                    setTimeout(() => {
                        setAlertMessage('alert');
                    }, 3000);

                    setTimeout(() => {
                        setAlertMessage('hidden');
                    }, 6000);

                    setTimeout(() => {
                        history.push('/login');
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
                    <h3 className='h3'>Already have an account?</h3>
                    <Link to='/login'><button className="registration-btn" title='If a register already exists, please login'>login</button></Link>
                </div>
            </NavBanner>
            <section className="registration">
                <FormBanner title='Please create an account by filling out the information below to get'>
                    <div className={alertMessage}>{values.username} has been successfully registered! Please, log in. </div>
                    <div className={alertMessageError}>{values.username}, unfortunately, an error occurred. Please try again later! </div>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <label htmlFor="username">username * {errors.username && <span className='error-para'>{errors.username}</span> } </label>
                        <input type="text" name="username" value={values.username} onChange={handleChange} />
                        

                        <label htmlFor="firstname">firstname * {errors.firstname && <p className='error-para'>{errors.firstname}</p> } </label>
                        <input type="text" name="firstname" value={values.firstname} onChange={handleChange} />

                        <label htmlFor="lastname">lastname * {errors.lastname && <p className='error-para'>{errors.lastname}</p> } </label>
                        <input type="text" name="lastname" value={values.lastname} onChange={handleChange} />

                        <label htmlFor="email">email * {errors.email && <p className='error-para'>{errors.email}</p> } </label>
                        <input type="text" name="email" value={values.email} onChange={handleChange} />

                        <label htmlFor="password">password (Min. 5 length) * {errors.password && <p className='error-para'>{errors.password}</p> } </label>
                        <input type="password" name="password" value={values.password} onChange={handleChange} />

                        <button className='submit-btn' type="submit" title='Please submit'>{status}</button>
                    </form>
                </FormBanner>  
            </section>
        </React.Fragment>
    )
}

export default RegistrationPage;

// connect(null, {registerUser})(RegistrationPage)