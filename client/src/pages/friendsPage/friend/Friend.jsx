import React, { useEffect, useState, useCallback } from 'react';
import axiosApiInstance from '../../../util/APIinstance';
import MoviesInCommon from './MoviesInCommon';

import './Friend.scss';

export default function Friend({ searchOrFriends }) {
	const [listFriends, setListFriends] = useState([]);
	const [commonWishlist, setCommonWishlist] = useState([]);
	const [isMovieInCommon, setIsMovieInCommon] = useState(false);
	const [noMoviesInCommon, setNoMoviesInCommon] = useState(false);
	const [friendFirstname, setFriendFirstname] = useState('');
	const [friendLastname, setFriendLastname] = useState('');
	const [friendId, setFriendId] = useState('');
	const [showMoviesInCommon, setShowMoviesInCommon] = useState('showMovie');
	const [errorMessage, setErrorMessage] = useState('');

	// Add a friend
	const addFriend = async username => {
		try {
			const res = await axiosApiInstance.put('/api/user/friends/add', {
				//username: "santa",
				username: localStorage.getItem('username'),
				friendUsername: username,
			});
			//console.log(res.data);
			getFriends();
		} catch (error) {
			//console.log("Something went wrong", error.message);
		}
	};

	// Delete a friend
	const deleteFriend = async username => {
		try {
			const res = await axiosApiInstance.put(`/api/user/friends/delete`, {
				username: localStorage.getItem('username'),
				friendUsername: username,
			});
			console.log(res.data);
			getFriends();
		} catch (error) {
			//console.log("Something went wrong", error.response.data.message);
		}
	};

	// Compare wishlist
	const compareWishlist = async friendId => {
		try {
			const res = await axiosApiInstance.get(`/api/wishlist/compare/${localStorage.getItem('user_id')}/${friendId}`);
			//console.log(res.data);

			const friendTarget = listFriends.find(friend => friend.id === res.data.friendUserId);
			//console.log(friendTarget);

			setCommonWishlist(res.data.moviesInCommon);
			setIsMovieInCommon(true);
			setFriendFirstname(friendTarget.firstname);
			setFriendLastname(friendTarget.lastname);
		} catch (error) {
			//console.log("Something went wrong", error.response.data.error);

			setNoMoviesInCommon(true);
			setErrorMessage(error.response.data.error);
			setTimeout(() => {
				setNoMoviesInCommon(false);
			}, 3000);
		}
	};

	// Get the list of friends
	const getFriends = async () => {
		try {
			const res = await axiosApiInstance.get(`/api/user/friends/${localStorage.getItem('username')}`);
			//console.log(res.data);
			setListFriends(res.data);
		} catch (error) {
			//console.log("Something went wrong", error.response.data.error);
		}
	};

	useEffect(() => {
		getFriends();
	}, []);

	return (
		<div className='friend-component'>
			{/* STRUCTURE FOR LIST OF FRIENDS OR SEARCH RESULTS (FriendsPage)*/}
			<section className='friends-box'>
				{console.log(searchOrFriends)}
				{searchOrFriends.map(item => (
					<div key={item.username} className='one-friend-box'>
						<div className='friend-data'>
							<div className='friend-data-1st-box'>
								<div
									className={`avatar ${item.avatarColor === '' && 'fixedColor'}`}
									style={{
										backgroundColor: item.avatarColor,
									}}
								>
									{item.avatar}
								</div>

								<div className='friend-name'>
									<p>
										{item.firstname} {item.lastname}
									</p>
									<p>{item.username}</p>
								</div>
							</div>

							{/* BUTTONS */}
							{listFriends.some(friend => friend.username === item.username) ? (
								<div className='friend-buttons-div'>
									<button
										onClick={() => {
											console.log(item.id);
											compareWishlist(item.id);
											setShowMoviesInCommon('showMovie');
										}}
									>
										Compare wishlist
									</button>
									<button onClick={() => deleteFriend(item.username)}>Remove Friend</button>
								</div>
							) : (
								<button onClick={() => addFriend(item.username)}>Add Friend</button>
							)}
						</div>
					</div>
				))}
			</section>

			{/* DISPLAY MOVIES IN COMMON */}
			{isMovieInCommon ? (
				<MoviesInCommon
					friendFirstname={friendFirstname}
					friendLastname={friendLastname}
					commonWishlist={commonWishlist}
					showMovie={showMoviesInCommon}
					setShowMoviesInCommon={setShowMoviesInCommon}
					setIsMovieInCommon={setIsMovieInCommon}
					friendId={friendId}
				/>
			) : null}

			{/* ALERT WHEN NO MOVIES IN COMMON */}
			{noMoviesInCommon ? <div className='error-alert'>{errorMessage}</div> : null}
		</div>
	);
}
