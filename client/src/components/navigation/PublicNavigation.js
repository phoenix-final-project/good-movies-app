import { NavLink } from "react-router-dom";
import NavBanner from "../navBanner/NavBanner";


export default function PublicNavigation() {
    return (
        <NavBanner>
            <div className="container-button">
                <NavLink exact to='/movies'><div className="tour" title='Click to have a small tour in the application'>DISCOVER</div></NavLink>
                
                <NavLink exact to='/login'><div className="tour" title='Click to have a small tour in the application'>LOGIN</div></NavLink>

                <NavLink exact to='/registration'><button className="registration-btn" title='Feel free to register yourself'>get started</button></NavLink>
            </div>
        </NavBanner>
    );
}