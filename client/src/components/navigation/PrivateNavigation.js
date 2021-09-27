import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBanner from '../navBanner/NavBanner';
import Notification from './Notification';

// styling
import './NavBar.scss';

export default function PrivateNavigation() {
	const handleLogout = () => {
		window.localStorage.clear();
		window.location.href = '/';
	};

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
			<NavLink exact to='/my-profile'>
				<div className='tour username'>{window.localStorage.getItem("username")}'s profile</div>
			</NavLink>

			<Notification />
			<div>
				<button className='logout-btn' title='Logout' onClick={handleLogout}>
					logout
				</button>
			</div>
		</NavBanner>
	);
}
