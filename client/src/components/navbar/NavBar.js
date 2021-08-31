import React from 'react';

// importing Link
import { Link } from "react-router-dom";

// importing scss
import './NavBar.scss';


export default function NavBar() {

    return (
        <React.Fragment>
            <nav className="nav nav-dark">
                <div className="nav-opened-container nav-closed-container">
                    <Link to="/" className="nav-logo">
                        <div className="own-logo">
                            <div className="logo-name"> <div className="first-name">My</div> <span className="span-last-name">Cinema</span> </div>
                        </div>
                    </Link>
                    <div className="navigation"> 
                        <div className="links">
                            <Link to="/movies"><i className="fas fa-home"></i>Movies</Link>
                        </div>

                        <div className="links">                           
                            <Link to="/registration"><i className="fas fa-home"></i>Registration</Link>
                        </div>

                        <div className="links">                           
                            <Link to="/login"><i className="fas fa-home"></i>Login</Link>
                        </div>

                        <div className="links">                           
                            <Link to="/my-list"><i className="fas fa-home"></i>My list</Link>
                        </div>
                
                        <div className="links">                         
                            <Link to="/search-for-friends"><i className="fas fa-home"></i>Friends</Link>
                        </div>

                        <div className="links">
                            <Link to="/invite-friends"><i className="fab fa-telegram-plane"></i>Invite friends</Link>
                        </div>

                        <div className="links">
                            <Link to="/my-profile"><i className="fab fa-telegram-plane"></i>My profile</Link>
                        </div>
                    </div>
            
                    <div className="nav-close">x</div>
                    <div className="nav-toggle"><i className="fas fa-bars"></i></div>
                </div>
            </nav>
        </React.Fragment>
    )
}