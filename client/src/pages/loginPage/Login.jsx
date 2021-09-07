import React from 'react';

// importing Link
import { Link } from "react-router-dom";

// importing NavBanner, FormBanner
import NavBanner from "../../components/navBanner/NavBanner";
import FormBanner from '../../components/formBanner/FormBanner';

// styling
import './Login.scss';

export default function Login() {
    return (
        <React.Fragment>
            <NavBanner>
                <div className="container-button">
                    <Link to='/'><button className="registration-btn" title='return to main page'>return home</button></Link>
                </div>
            </NavBanner>
            <section className="registration">
                <FormBanner title='Login with your existing account to get'>
                    <form className="form-container" >
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" required/>

                        <label htmlFor="password">password</label>
                        <input type="password" name="password" required/>

                        <Link to='/movies'>
                            <button className='submit-btn' type="submit" title='Please submit'>submit</button>
                        </Link>
                    </form>
                </FormBanner>
            </section>
        </React.Fragment>
    )
}