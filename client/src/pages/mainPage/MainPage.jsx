import React from 'react';

// importing Link
import { Link } from "react-router-dom";

// importing Banner in order to display images of upcoming movies
import Banner from '../../components/banner/Banner';
import NavBanner from '../../components/navBanner/NavBanner';

// styling
import './MainPage.scss';

export default function MainPage() {
    return (
        <React.Fragment>
            <NavBanner>
                <div className="container-button">
                    <Link to='/public-movies'><div className="tour" title='Click to have a small tour in the application'>DISCOVER</div></Link>
                    <Link to='/login'><div className="tour" title='Click to have a small tour in the application'>LOGIN</div></Link>
                    <Link to='/registration'><button className="registration-btn" title='Feel free to register yourself'>get started</button></Link>
                </div>
            </NavBanner>
            <Banner />
        </React.Fragment>
    )
}