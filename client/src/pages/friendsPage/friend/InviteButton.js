import React, { useState, useEffect } from 'react';
import axios from '../../../util/APIinstance';

function InviteButton({ friendId, movie, friendInvited, iInvited }) {
	const [isInvited, setIsInvited] = useState(false);

	useEffect(() => {
		const ifFriendInvited = friendInvited.some(invitation => invitation.userId === friendId && invitation.movieId === movie.imdb_id);
		const ifIInvited = iInvited.some(invitation => invitation.userId === friendId && invitation.movieId === movie.imdb_id);

		setIsInvited(ifFriendInvited || ifIInvited);
	}, [friendInvited, iInvited, friendId, movie.imdb_id]);

	const inviteToWatch = async movieId => {
		const info = {
			user1: window.localStorage.getItem('user_id'),
			user2: friendId,
			movieId,
		};

		try {
			const response = await axios.post('/api/notification/create', info);
			if (movieId === response.data.movieId && friendId === response.data.user2) {
				setIsInvited(true);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className='one-movie-box-button'>
			{isInvited ? <button className='invited'>Invited</button> : <button onClick={() => inviteToWatch(movie.imdb_id)}>Invite to Watch</button>}
		</div>
	);
}

export default InviteButton;
