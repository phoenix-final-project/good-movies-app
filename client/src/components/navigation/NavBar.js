import React from 'react';

// importing scss
import './NavBar.scss';
import PrivateNavigation from './PrivateNavigation';
import PublicNavigation from './PublicNavigation';


export default function NavBar() {

    // console.log(window.localStorage.getItem("token") ? true : false)

    return (
        <React.Fragment>

            {window.localStorage.getItem("token") ? <PrivateNavigation /> : <PublicNavigation />}

        </React.Fragment>
    )
}