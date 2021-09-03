import React from 'react';

// importing Link
import { Link } from "react-router-dom";

// importing Banner in order to display images of upcoming movies
import Banner from '../../components/banner/Banner'

// styling
import './MainPage.scss';

export default function MainPage() {
    return (
        <React.Fragment>
            <header className='main-page-header'>
                <div className="header-container">
                    <Link to='/' className='link-logo' title='Home page'>
                        <div className="container-logo">
                            <span className="circle-text">MY</span>
                            <span className="span-home">best</span><div className="div-cinema">cinéfilo<div className="border-bottom"></div> </div>
                        </div>
                    </Link>
                    <div className="container-button">
                        <Link to='/movies'><div className="tour" title='Click to have a small tour in the application'>DISCOVER</div></Link>
                        <Link to='/registration'><button className="registration-btn" title='Feel free to register yourself'>get started</button></Link>
                    </div>
                </div>
            </header>
            <Banner />
    {/*<Banner />*/}
        </React.Fragment>
    )
}