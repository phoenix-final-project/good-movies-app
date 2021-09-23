import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavBanner from '../navBanner/NavBanner';
import useNotification from '../../hooks/useNotification';
import axios from '../../util/APIinstance';

// styling
import './NavBar.scss';

export default function PrivateNavigation() {
	const [numOfNewNotifications, newNotifications, setNumOfNewNotifications] = useNotification();
	const [allNotifications, setAllNotifications] = useState([]);
	const [isDropdownMenuClicked, setIsDropdownMenuClicked] = useState(true);

	const handleLogout = () => {
		window.localStorage.clear();
		window.location.href = '/';
	};

	const readNotifications = async () => {
		// open-close drop-down list
		setIsDropdownMenuClicked(!isDropdownMenuClicked);

		// set new notifications as read (number of new notifications = 0)
		if (numOfNewNotifications !== 0) {
			const notificationsId = newNotifications.map(notification => notification._id);

			notificationsId.forEach(async notificationId => {
				try {
					await axios.put(`/api/notification/set-to-read/${notificationId}`);

					setTimeout(() => setNumOfNewNotifications(0), 700);
				} catch (error) {
					console.error(error.message);
				}
			});
		}

		// get a list of all notifications
		const response = await axios.get(`/api/notification/all/${window.localStorage.getItem('user_id')}`);
		setAllNotifications(response.data);
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

			<div className='notification' onClick={() => readNotifications()}>
				<div className='notification-content'>
					<i className={isDropdownMenuClicked ? 'far fa-bell' : 'far fa-bell clicked-far'}></i>
					{numOfNewNotifications != 0 && <span>{numOfNewNotifications}</span>}
				</div>
				<div className={isDropdownMenuClicked ? 'dropdown-content' : 'dropdown-content-click'}>
					<div className='dropdown-menu-text'>
						{allNotifications.map((item, index) => (
							// <p key={index}>{item.friend.username}</p>
							<div key={index}>
								<div>
									<p>{item.friend.avatar}</p>
									<p>{item.friend.username}</p>
								</div>

								<div>
									<p>
										{item.friend.username} wants to watch {item.movie.title} with you
									</p>
								</div>

								<div>
									<img src={item.movie.image} alt={item.movie.title} />
								</div>
							</div>
						))}
					</div>
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
