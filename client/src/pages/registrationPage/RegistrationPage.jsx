import React, { useState } from 'react';

// importing Link
import { Link } from "react-router-dom";

// redux
// import { connect } from "react-redux";
// import { registerUser } from "../../redux/actions/userActions";
// import { useHistory } from "react-router-dom";

// import { axiosApiInstance } from "../../util/APIinstance";

// validation errors
import ValidationError from "../../components/validation/ValidationError";

// styling
import './RegistrationPage.scss';

// importing NavBanner, FormBanner
import NavBanner from "../../components/navBanner/NavBanner";
import FormBanner from '../../components/formBanner/FormBanner';

function RegistrationPage({ registerUser }) {
    // history hook
    // const history = useHistory();

    // useState
    const [status] = useState("Submit");
    const [values, setValues] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const [ errors, setErrors ] = useState({});

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(ValidationError(values));
    
        // axiosApiInstance.post('/register', userData)
        //     .then(response => response.userData)
        //     .then(view => {
        //         setStatus('Being registered...');

        //         setTimeout(() => {
        //             setStatus("submit");
        //             e.target.reset();
        //         }, 3000);

        //         // redirect to login
        //         registerUser(history);

        //     })
        //     .catch(error => {
        //         alert('Unfortunately, email couldn\'t be sent. Please try again later!');
        //         e.target.reset();
        //     });
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
                <FormBanner title='Please create an account to get'>
                    <form className="form-container" onSubmit={handleSubmit}>
                        <label htmlFor="username">username * {errors.username && <span className='error-para'>{errors.username}</span> } </label>
                        <input type="text" name="username" value={values.username} onChange={handleChange} />
                        

                        <label htmlFor="firstname">firstname * {errors.firstname && <p className='error-para'>{errors.firstname}</p> } </label>
                        <input type="text" name="firstname" value={values.firstname} onChange={handleChange} />

                        <label htmlFor="lastname">lastname * {errors.lastname && <p className='error-para'>{errors.lastname}</p> } </label>
                        <input type="text" name="lastname" value={values.lastname} onChange={handleChange} />

                        <label htmlFor="email">email * {errors.email && <p className='error-para'>{errors.email}</p> } </label>
                        <input type="email" name="email" value={values.email} onChange={handleChange} />

                        <label htmlFor="password">password * {errors.password && <p className='error-para'>{errors.password}</p> } </label>
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