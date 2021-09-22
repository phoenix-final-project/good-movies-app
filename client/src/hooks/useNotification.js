import { useEffect, useState } from 'react';
import axios from '../util/APIinstance';

const useNotification = () => {
	const [numOfNewNotifications, setNumOfNewNotifications] = useState(window.localStorage.getItem('numNotifications') || 0);
	const [newNotifications, setNewNotifications] = useState([]);
	const [intervalId, setIntervalId] = useState();

	const getNotifications = async () => {
		try {
			const response = await axios.get(`api/notification/${window.localStorage.getItem('user_id')}`);
			const { numOfNew, data } = response.data;

			if (numOfNew != numOfNewNotifications) {
				window.localStorage.setItem('numNotifications', numOfNew);

				setNumOfNewNotifications(numOfNew);
				setNewNotifications(data);

				console.log(numOfNew); // 5
				console.log(numOfNewNotifications); // 4
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		console.log('useEffect triggered');
		// setNumOfNewNotifications(window.localStorage.getItem('numNotifications'));
		getNotifications();

		const id = setInterval(() => {
			getNotifications();
		}, 1000);

		setIntervalId(id);

		return clearInterval(intervalId);
	}, [numOfNewNotifications]);

	return [numOfNewNotifications, newNotifications, setNumOfNewNotifications];
};

export default useNotification;
