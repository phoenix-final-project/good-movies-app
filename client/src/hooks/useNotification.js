import { useEffect, useState } from 'react';
import axios from '../util/APIinstance';

const useNotification = () => {
	const [numOfNewNotifications, setNumOfNewNotifications] = useState(0);
	const [newNotifications, setNewNotifications] = useState([]);
	const [intervalId, setIntervalId] = useState();

	const getNotifications = async () => {
		const response = await axios.get(`api/notification/${window.localStorage.getItem('user_id')}`);
		const { numOfNew, data } = response.data;

		if (numOfNew !== numOfNewNotifications) {
			setNumOfNewNotifications(numOfNew);
			setNewNotifications(data);
		}
	};
	console.log(numOfNewNotifications);

	useEffect(() => {
		const id = setInterval(() => {
			getNotifications();
		}, 20000);

		setIntervalId(id);

		return clearInterval(intervalId);
	}, []);

	return [numOfNewNotifications, newNotifications];
};

export default useNotification;
