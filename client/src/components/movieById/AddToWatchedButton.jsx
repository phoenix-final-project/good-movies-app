import React, { useState, useEffect } from 'react';
import { addMovieToList } from '../../util/MovieListsHelpers';

function AddToWishlistButton({ watchedListMoviesIds, movieId, movie }) {
	const [addedToWatchedList, setAddedToWatchedList] = useState(watchedListMoviesIds.includes(movieId));

	useEffect(() => {
		setAddedToWatchedList(watchedListMoviesIds.includes(movieId));
	}, [movieId, watchedListMoviesIds]);

	const handleAddMovieToList = () => {
		setAddedToWatchedList(true);
		addMovieToList('watched', movie).catch(() => setAddedToWatchedList(false));
	};

	return <>{addedToWatchedList ? <button className='added'> Added </button> : <button onClick={handleAddMovieToList}> Watched </button>}</>;
}

export default AddToWishlistButton;
