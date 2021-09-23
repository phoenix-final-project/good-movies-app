import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBanner from '../navBanner/NavBanner';
import useNotification from '../../hooks/useNotification';
import axios from '../../util/APIinstance';

// styling
import './NavBar.scss';

export default function PrivateNavigation() {
	const [numOfNewNotifications, newNotifications, setNumOfNewNotifications] = useNotification();
	const [isDropdownMenuClicked, setIsDropdownMenuClicked] = useState(true);

	const handleLogout = () => {
		window.localStorage.clear();
		window.location.href = '/';
	};

	const setNotificationsAsRead = () => {
		setIsDropdownMenuClicked(!isDropdownMenuClicked);
		if (numOfNewNotifications !== 0) {
			const notificationsId = newNotifications.map(notification => notification._id);

			console.log(newNotifications);
			notificationsId.forEach(async notificationId => {
				try {
					const response = await axios.put(`/api/notification/set-to-read/${notificationId}`);

					setTimeout(() => setNumOfNewNotifications(0), 700);

					console.log('RESPONSE ==>', response);
				} catch (error) {
					console.error(error.message);
				}
			});
		}
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

			<div className='notification' onClick={() => setNotificationsAsRead()}>
				<div className='notification-content'>
					<i className={isDropdownMenuClicked ? 'far fa-bell' : 'far fa-bell clicked-far'}></i>
					{numOfNewNotifications != 0 && <span>{numOfNewNotifications}</span>}
				</div>
				<div className={isDropdownMenuClicked ? 'dropdown-content' : 'dropdown-content-click'}>
					<p className='dropdown-menu-text'>Hello world</p>
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
