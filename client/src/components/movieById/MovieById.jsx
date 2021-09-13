import React, { useState, useEffect, useCallback } from 'react';
import axiosApiInstance from '../../util/APIinstance';
import { getListMoviesIds } from '../../util/MovieListsHelpers';
import AddToWishlistButton from './AddToWishlistButton';
import AddToWatchedButton from './AddToWatchedButton';

// styling
import './MovieById.scss';

export default function MovieById({ movieId, setMovieId, movieCardOn, setMovieCardOn }) {
	// local state
	const [movie, setMovie] = useState({});
	const [trailerOn, setTrailerOn] = useState('hidden');

	// For Buttons Change
	const [wishlistMoviesIds, setWishlistMoviesIds] = useState([]);
	const [watchedListMoviesIds, setWatchedListMoviesIds] = useState([]);

	const getMovieById = useCallback(async () => {
		try {
			let res = await axiosApiInstance.get(`/api/movie/oneMovieById/${movieId}`);

			if (res.status === 200) {
				console.log(res.data.foundMovie);
				setMovie(res.data.foundMovie);
			}
		} catch (error) {
			console.log('Something went wrong', error.message);
		}
	}, [movieId]);

	// fetching data from backend (movieById)
	useEffect(() => {
		getMovieById();
		getListMoviesIds('wishlist', setWishlistMoviesIds);
		getListMoviesIds('watched', setWatchedListMoviesIds);
	}, [getMovieById]);

	return (
		<div className={`showMovie ${movieCardOn}`}>
			<div className='movieCard'>
				<div className='poster'>
					<img src={movie.image_url} alt={movie.title} />

					<div className='buttons'>
						<h4>Add to:</h4>
						<AddToWishlistButton wishlistMoviesIds={wishlistMoviesIds} movieId={movieId} movie={movie} />

						<AddToWatchedButton watchedListMoviesIds={watchedListMoviesIds} movieId={movieId} movie={movie} />

						<button disabled={true}> Favorite </button>
					</div>
				</div>

				<div className='info'>
					<button
						className='closeCard'
						onClick={e => {
							setMovieCardOn('hidden');
							// setMovieId("")
						}}
					>
						Close X
					</button>

					<div>
						<h3>
							{movie.title} ({movie.year}){' '}
						</h3>
						<div>
							Length: {movie.movie_length} min | Rating: {movie.rating}{' '}
						</div>
					</div>

					<div>
						<h4>Description</h4>
						<div>{movie.description}</div>
					</div>

					{/* GENRES */}
					{movie.gen ? (
						<p>
							{' '}
							|{' '}
							{movie.gen.map(genre => (
								<span key={genre.genre}> {genre.genre} |</span>
							))}{' '}
						</p>
					) : null}

					{movie.trailer !== 'aa.com' ? <button onClick={e => setTrailerOn('')}> Watch a Trailer </button> : null}

					{/* TRAILER */}
					<div className={`trailer ${trailerOn}`}>
						<iframe
							src={movie.trailer}
							title='YouTube video player'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
						></iframe>

						<div onClick={() => setTrailerOn('hidden')} className='close'>
							Close Trailer X
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
