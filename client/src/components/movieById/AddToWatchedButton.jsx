import React, { useEffect } from 'react';
import { addMovieToList } from '../../util/MovieListsHelpers';

function AddToWishlistButton({ watchedListMoviesIds, movieId, movie, addedToWatchedList, setAddedToWatchedList, setAddedToWishlist }) {
	useEffect(() => {
		setAddedToWatchedList(watchedListMoviesIds.includes(movieId));
	}, [movieId, watchedListMoviesIds, setAddedToWatchedList]);

	const handleAddMovieToList = () => {
		setAddedToWatchedList(true);
		setAddedToWishlist(false);
		addMovieToList('watched', movie).catch(() => setAddedToWatchedList(false));
	};

	return <>{addedToWatchedList ? <button className='added'> Added </button> : <button onClick={handleAddMovieToList}> Watched </button>}</>;
}

export default AddToWishlistButton;
