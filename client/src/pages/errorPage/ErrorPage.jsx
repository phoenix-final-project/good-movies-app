import React from "react";

// Link
import { Link } from "react-router-dom";

import './ErrorPage.scss';

export default function ErrorPage() {
    return (
        <React.Fragment>
            <div className="main-container">
                <div className="sub-container">
                    <div className="emoji-container">
                        <i className="far fa-sad-tear"></i>
                    </div>
                    <div className="error-text-container">
                        <h1>404</h1>
                        <div className="line"></div>
                        <h2>Page not found</h2>
                        <p>Woops, it seems this page does not exist any more or it has technical issues</p>
                        <div className="home">
                            <Link to='/movies'>
                                <button className="get-button" title='return home'>return home</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
