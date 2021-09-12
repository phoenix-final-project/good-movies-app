// import { useContext } from "react";
import { Link } from "react-router-dom";

import NavBanner from "../navBanner/NavBanner";


export default function PrivateNavigation() {

    const handleLogout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    };

    return (
        <NavBanner>
            <div className="container-button">
                <Link to='/movies'><div className="tour">MOVIES</div></Link>
                <Link to='/my-list'><div className="tour">MY LIST</div></Link>
                <Link to='/watched'><div className="tour">WATCHED</div></Link>
                <Link to='/friends'><div className="tour">FRIENDS</div></Link>
                <Link to='/invite-friends'><div className="tour">INVITE FRIENDS</div></Link>
                <Link to='/my-profile'><div className="tour">PROFILE</div></Link>

                <div><button className="logout-btn" title='Logout' onClick={handleLogout}>logout</button></div>
            </div>
        </NavBanner>
    );
}