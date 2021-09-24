import React, { useState } from 'react';

import useNotification from '../../hooks/useNotification';
import axios from '../../util/APIinstance';

function Notification() {
	const [numOfNewNotifications, newNotifications, setNumOfNewNotifications] = useNotification();
	const [allNotifications, setAllNotifications] = useState([]);
	const [isDropdownMenuClicked, setIsDropdownMenuClicked] = useState(true);

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
		<div className='notification' onClick={() => readNotifications()}>
			<div className='notification-content'>
				<i className={isDropdownMenuClicked ? 'far fa-bell' : 'far fa-bell clicked-far'}></i>
				{numOfNewNotifications != 0 && <span>{numOfNewNotifications}</span>}
			</div>

			<div className={isDropdownMenuClicked ? 'dropdown-content' : 'dropdown-content-click'}>
				<div className='dropdown-menu-text'>
					{allNotifications.map((item, index) => (
						// <p key={index}>{item.friend.username}</p>
						<div className='n-section' key={index}>
							<div>
								<p className='avatar'>{item.friend.avatar}</p>
								<p className='username'>{item.friend.username}</p>
							</div>

							<div>
								<p className='message'>
									wants to watch <span>{item.movie.title}</span> with you.
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
	);
}

export default Notification;
