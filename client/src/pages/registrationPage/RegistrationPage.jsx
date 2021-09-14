import React, { useState } from 'react';

// importing Link
import { useHistory } from "react-router-dom";

import axiosApiInstance from "../../util/APIinstance";

// validation errors
import ValidationErrorRegistration from "../../components/validation/ValidationError";

// styling
import './RegistrationPage.scss';

// importing NavBanner, FormBanner
import FormBanner from '../../components/formBanner/FormBanner';

function RegistrationPage() {
    // history hook
    const history = useHistory();

    // useState
    const [status, setStatus] = useState("sign up");
    // const [alertMessage, setAlertMessage] = useState("hidden");
    const [alertMessageError, setAlertMessageError] = useState("hidden");
    const [values, setValues] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const [ errors, setErrors ] = useState({});
    const [errorMessageDatabase, setErrorMessageDatabase] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    // const [username, setUsername] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value
        });
        // console.log(values.username);
        // setUsername(values.username);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const checkErrors = ValidationErrorRegistration(values);

        if (Object.keys(checkErrors).length !== 0 ) {
            setErrors(checkErrors);
        }
        else {
            axiosApiInstance.post('/api/user/register', values)
                .then(response => response)
                .then(view => {
                    setStatus('in process...');
                    setValues({
                        username: '',
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                    });
    
                    // redirect to login
                    setTimeout(() => {
                        setStatus("sign up");
                        history.push('/login');
                    }, 2000);
    
                    
                    // setTimeout(() => {
                    //     setAlertMessage('alert');
                    // }, 3000);

                    // setTimeout(() => {
                    //     setAlertMessage('hidden');
                    // }, 5000);

                    // setTimeout(() => {
                        
                    // }, 6000);
                })
                .catch(error => {
                    if (error.response.data.message) {
                        setErrorMessageDatabase(error.response.data.message)
                    };

                    if (error.response.data.error) {
                        setErrorMessageDatabase(error.response.data.error.errors[0].msg)
                    };

                    setAlertMessageError('error');
                    e.target.reset();

                    setTimeout(() => {
                        setAlertMessageError('hidden');
                    }, 3000);
                });
        }
    };

    const handleBlur = () => {
        if (isSubmitted) {
            const checkErrors = ValidationErrorRegistration(values);

            if (Object.keys(checkErrors).length !== -1 ) {
                setErrors(checkErrors);
            }
        }
    };

    return (
        <React.Fragment>

            <section className="registration">
                <FormBanner title='Please create an account by filling out the information below to get'>
                    {/* NOTIFICATIONS - success / error */}
                   {/* <div className={alertMessage}>{username} has been successfully registered! Please, log in. </div> */}

                    <div className={alertMessageError}>{errorMessageDatabase}</div>

                    {/* REGISTRATION FORM */}
                    <form className="form-container" onSubmit={handleSubmit}>
                        {/* USERNAME */}
                        <label htmlFor="username">username * {errors.username && <span className='error-para'>{errors.username}</span> } </label>
                        <input type="text" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                        
                        {/* FIRST NAME */}
                        <label htmlFor="firstname">firstname * {errors.firstname && <p className='error-para'>{errors.firstname}</p> } </label>
                        <input type="text" name="firstname" value={values.firstname} onChange={handleChange} />

                        {/* LAST NAME */}
                        <label htmlFor="lastname">lastname * {errors.lastname && <p className='error-para'>{errors.lastname}</p> } </label>
                        <input type="text" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur}/>

                        {/* EMAIL */}
                        <label htmlFor="email">email * {errors.email && <p className='error-para'>{errors.email}</p> } </label>
                        <input type="text" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>

                        {/* PASSWORD */}
                        <label htmlFor="password">password * {errors.password && <p className='error-para'>{errors.password}</p> } </label>
                        <input type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder='(min. length 8, at least 1 capital & small letter, and symbol & number)'/>

                        <button className='submit-btn' type="submit" title='Please submit'>{status}</button>
                    </form>
                </FormBanner>  
            </section>
        </React.Fragment>
    )
}

export default RegistrationPage;

// connect(null, {registerUser})(RegistrationPage)