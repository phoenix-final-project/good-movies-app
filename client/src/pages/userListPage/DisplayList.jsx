import React, { useState } from 'react';
import ScrollToTopButton from '../../components/scrollToTop/ScrollToTopButton';

// Component
import MovieById from '../../components/movieById/MovieById';

// Styling
import './ListsPage.scss';

function DisplayList({ movieList, deleteMovie, addMovieToAnotherList, listToMove, movieSectionStyle, ifWatchedList, pickAMovie }) {
	// setting up a pop-up "modal" for a movie
	const [movieCardOn, setMovieCardOn] = useState('');
	const [showMovie, setShowMovie] = useState(false);
	const [movieId, setMovieId] = useState('');

	return (
		<div className='movie-list'>
			{movieList.length > 0 ? <div className='click-on-poster'>Click on poster for detailed plot, trailer and comments</div> : null}

			{movieList.map(movie => {
				return (
					<div key={movie.imdb_id} className={pickAMovie && pickAMovie.imdb_id === movie.imdb_id ? movieSectionStyle : 'individual-movie-section'}>
						<section>
							<div
								className='poster'
								onClick={() => {
									setShowMovie(true);
									setMovieId(movie.imdb_id);
									setMovieCardOn('');
								}}
							>
								<img src={movie.image_url !== 'aa.com' ? movie.image_url : '../../images/poster_blank.png'} alt={movie.title} />
							</div>
						</section>

						<div className='info'>
							<section>
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
								{movie.rating !== 0 && (
									<p>
										Rating: <span>{movie.rating}</span>
									</p>
								)}
								<a href={`https://www.imdb.com/title/${movie.imdb_id}`} target='_blank' rel='noreferrer noopener'>
									IMDb
								</a>
							</section>

							<section>
								<div>
									<h4>Plot</h4>
									<p>{movie.plot}</p>
								</div>

								<div>
									|{' '}
									{movie.gen.map(gen => (
										<span key={gen.id}>{gen.genre} | </span>
									))}
								</div>
							</section>

							<section>
								<button onClick={() => deleteMovie(movie.imdb_id)}>Delete</button>
								<button onClick={() => addMovieToAnotherList(movie)}>{listToMove}</button>
								<button>Favorite</button>
							</section>
						</div>
					</div>
				);
			})}

			<ScrollToTopButton />

			{showMovie ? <MovieById movieId={movieId} setMovieCardOn={setMovieCardOn} movieCardOn={movieCardOn} setMovieId={setMovieId} isList={true} /> : null}
		</div>
	);
}

export default DisplayList;
