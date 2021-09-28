import { useState, useEffect } from 'react';
import './Friend.scss';
import axios from '../../../util/APIinstance';
import InviteButton from './InviteButton';

export default function MoviesInCommon({ friendFirstname, friendLastname, friendId, commonWishlist, showMovie, setShowMoviesInCommon, setIsMovieInCommon }) {
	const [invitations, setInvitations] = useState([]);

	const getAllInvitations = async () => {
		try {
			// get all
			const response = await axios.get(`/api/notification/all/${window.localStorage.getItem('user_id')}`);

			const allInvitations = response.data.map(invitation => {
				const data = { friend: invitation.friend.id, movie: invitation.movie.imdb_id };
				return data;
			});

			// for each movie in common list, check, if there is already an invitation
			const existingInvitations = commonWishlist
				.map(movie => {
					return allInvitations.filter(invitation => invitation.movie === movie.imdb_id);
				})
				.flat();
			setInvitations(existingInvitations);
			// console.log(existingInvitations);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllInvitations();
	}, []);

	return (
		<section className={`cover-outside-card ${showMovie}`}>
			<div className='common-movies-card'>
				<h3>
					Movies in common with{' '}
					<span>
						{friendFirstname} {friendLastname}
					</span>
				</h3>

				<div className='common-movies-container'>
					{commonWishlist.map(movie => (
						<div key={movie.imdb_id} className='one-movie-box'>
							<div className='one-movie-box-data'>
								<img
									src={
										movie.image_url !== "aa.com"
											? movie.image_url
											: "../../images/poster_blank.png"
									}
									alt={movie.title}
								/>

								<div className='movie-data'>
									<p>
										Title: <span>{movie.title}</span>
									</p>
									<p>
										Year: <span>{movie.year}</span>
									</p>
									{movie.movie_length !== 0 && (
										<p>
											Length: <span>{movie.movie_length} min</span>
										</p>
									)}
									<p>
										Rating: <span>{movie.rating}</span>
									</p>
								</div>
							</div>
							<InviteButton friendId={friendId} movie={movie} invitations={invitations} />
						</div>
					))}
				</div>

				<button
					id='closeCard'
					onClick={e => {
						setShowMoviesInCommon('hidden');
						setIsMovieInCommon(false);
					}}
				>
					✕
				</button>
			</div>
		</section>
	);
}
