import React, { useState, useEffect } from 'react';
import { addMovieToList } from '../../util/MovieListsHelpers';

function AddToWishlistButton({ watchedListMoviesIds, movieId, movie }) {
	const [addedToWatchedList, setAddedToWatchedList] = useState(watchedListMoviesIds.includes(movieId));

	useEffect(() => {
		if (watchedListMoviesIds.includes(movieId)) setAddedToWatchedList(true);
		else if (!watchedListMoviesIds.includes(movieId)) setAddedToWatchedList(false);
	}, [movieId, watchedListMoviesIds]);

	return <>{addedToWatchedList ? <button className='added'> Added </button> : <button onClick={() => addMovieToList('watched', movie)}> Watched </button>}</>;
}

export default AddToWishlistButton;
