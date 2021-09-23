import { useState, useEffect } from 'react';
import './Friend.scss';
import axios from '../../../util/APIinstance';

export default function MoviesInCommon({ friendFirstname, friendLastname, friendId, commonWishlist, showMovie, setShowMoviesInCommon, setIsMovieInCommon }) {
	const [isInvited, setIsInvited] = useState(false);

	const inviteToWatch = async movieId => {
		const info = {
			user1: window.localStorage.getItem('user_id'),
			user2: friendId,
			movieId,
		};

		try {
			const response = await axios.post('/api/notification/create', info);
			console.log(response.data);
		} catch (error) {
			console.log(error.message);
		}
	};

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
								<img src={movie.image_url} alt='' />

								<div className='movie-data'>
									<p>
										Title: <span>{movie.title}</span>
									</p>
									<p>
										Year: <span>{movie.year}</span>
									</p>
									{movie.movie_length !== 0 && (
										<p>
											Length: <span>{movie.movie_length}</span>
										</p>
									)}
									<p>
										Rating: <span>{movie.rating}</span>
									</p>
								</div>
							</div>

							<div>
								{isInvited ? <button>Invited</button> : <button onClick={() => inviteToWatch(movie.imdb_id)}>Invite to Watch</button>}
								{/* <button onClick={() => inviteToWatch(movie.imdb_id)}>{isInvited ? 'Invited' : 'Invite to watch'}</button> */}
							</div>
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
