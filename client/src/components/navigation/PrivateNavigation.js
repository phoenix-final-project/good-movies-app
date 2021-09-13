// import { useContext } from "react";
import { NavLink } from "react-router-dom";

import NavBanner from "../navBanner/NavBanner";

// styling
import "./NavBar.scss";


export default function PrivateNavigation() {

    const handleLogout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };

    return (
        <NavBanner>
            <div className="container-button">
                <NavLink exact to='/movies'><div className="tour">MOVIES</div></NavLink>
                <NavLink exact to='/my-list' ><div className="tour">MY LIST</div></NavLink>
                <NavLink exact to='/watched'><div className="tour">WATCHED</div></NavLink>
                <NavLink exact to='/friends'><div className="tour">FRIENDS</div></NavLink>
                <NavLink exact to='/invite-friends'><div className="tour">INVITE FRIENDS</div></NavLink>
                <NavLink exact to='/my-profile'><div className="tour">PROFILE</div></NavLink>

                <div><button className="logout-btn" title='Logout' onClick={handleLogout}>logout</button></div>
            </div>
        </NavBanner>
    );
}