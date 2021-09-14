import { Link } from "react-router-dom";
import NavBanner from "../navBanner/NavBanner";


export default function PublicNavigation() {
    return (
        <NavBanner>
            <Link to='/movies'><div className="tour" title='Click to have a small tour in the application'>DISCOVER</div></Link>
            <Link to='/login'><div className="tour" title='Click to have a small tour in the application'>LOGIN</div></Link>
            <Link to='/registration'><button className="registration-btn" title='Feel free to register yourself'>get started</button></Link>
        </NavBanner>
    );
}