// import { useContext } from "react";
import { NavLink } from 'react-router-dom';
import NavBanner from '../navBanner/NavBanner';
import useNotification from '../../hooks/useNotification';

// styling
import './NavBar.scss';

export default function PrivateNavigation() {
	const [numOfNewNotifications, newNotifications] = useNotification();

	const handleLogout = () => {
		window.localStorage.clear();
		window.location.href = '/';
	};
	console.log(numOfNewNotifications, newNotifications);

	return (
		<NavBanner>
			<NavLink exact to='/movies'>
				<div className='tour'>MOVIES</div>
			</NavLink>
			<NavLink exact to='/my-list'>
				<div className='tour'>WISHLIST</div>
			</NavLink>
			<NavLink exact to='/watched'>
				<div className='tour'>WATCHED</div>
			</NavLink>
			<NavLink exact to='/friends'>
				<div className='tour'>FRIENDS</div>
			</NavLink>
			{/* <NavLink exact to='/invite-friends'><div className="tour">INVITE FRIENDS</div></NavLink> */}
			<NavLink exact to='/my-profile'>
				<div className='tour'>PROFILE</div>
			</NavLink>

			<div className='notification'>
				<i className='far fa-bell'></i>
				<span>2</span>
			</div>

			<div>
				<button className='logout-btn' title='Logout' onClick={handleLogout}>
					logout
				</button>
			</div>
		</NavBanner>
	);
}
