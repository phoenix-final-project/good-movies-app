import React, { useState, useEffect } from 'react';
import axios from '../../../util/APIinstance';

function InviteButton({ friendId, movie, invitations }) {
	console.log('aaa', invitations);
	const [isInvited, setIsInvited] = useState(false);

	// const a = invitations.some(invitation => invitation.friend === friendId && invitation.movie === movie.imdb_id);
	// console.log(a);

	useEffect(() => {
		// invitations.forEach(invitation => {
		// if (invitation.friend === friendId && invitation.movie === movie.imdb_id) setIsInvited(true);

		// const a = invitations.some(invitation => invitation.friend === friendId && invitation.movie === movie.imdb_id);
		setIsInvited(invitations.some(invitation => invitation.friend === friendId && invitation.movie === movie.imdb_id));
		// });
	}, [friendId, invitations]);

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
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

	return <div>{isInvited ? <button className='invited'>Invited</button> : <button onClick={() => inviteToWatch(movie.imdb_id)}>Invite to Watch</button>}</div>;
}

export default InviteButton;
