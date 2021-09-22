import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

import NavBanner from '../navBanner/NavBanner';

// styling
import './NavBar.scss';

export default function PrivateNavigation() {
	const [isDropdownMenuClicked, setIsDropdownMenuClicked] = useState(true);

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
			{/* <NavLink exact to='/invite-friends'><div className="tour">INVITE FRIENDS</div></NavLink> */}
			<NavLink exact to='/my-profile'>
				<div className='tour'>PROFILE</div>
			</NavLink>

			<div className='notification' onClick={() => setIsDropdownMenuClicked(!isDropdownMenuClicked)}>
				<div className="notification-content">
					<i className={isDropdownMenuClicked ? 'far fa-bell' : 'far fa-bell clicked-far'}></i>
				<span>10</span>
				</div>
				<div className={isDropdownMenuClicked ? "dropdown-content": "dropdown-content-click"}>
					<p className="dropdown-menu-text">Hello world</p>
				</div>
			</div>

			<div>
				<button className='logout-btn' title='Logout' onClick={handleLogout}>
					logout
				</button>
			</div>
		</NavBanner>
	);
}
