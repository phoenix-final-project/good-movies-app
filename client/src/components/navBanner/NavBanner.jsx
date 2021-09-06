import React from 'react';

// importing Link
import { Link } from "react-router-dom";

// logo
import myLogo from '../../icons/MY.png';

export default function NavBanner({ children }) {
    return (
        <React.Fragment>
            <header className='main-page-header'>
                <div className="header-container">
                    <Link to='/' className='link-logo' title='Home page'>
                        <div className="logo">
                            <img className='img-logo' src={myLogo} alt="logo" />
                        </div>
                    </Link>
                    {children}
                </div>
            </header>
        </React.Fragment>
    )
}
