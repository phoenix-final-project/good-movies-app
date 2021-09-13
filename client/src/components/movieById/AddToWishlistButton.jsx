import React, { useState, useEffect } from 'react';
import { addMovieToList } from '../../util/MovieListsHelpers';

function AddToWishlistButton({ wishlistMoviesIds, movieId, movie }) {
	const [addedToWishlist, setAddedToWishlist] = useState(wishlistMoviesIds.includes(movieId));

	useEffect(() => {
		setAddedToWishlist(wishlistMoviesIds.includes(movieId));
	}, [movieId, wishlistMoviesIds]);

	const handleAddMovieToList = () => {
		setAddedToWishlist(true);
		addMovieToList('wishlist', movie).catch(() => setAddedToWishlist(false));
	};

	return <>{addedToWishlist ? <button className='added'> Added </button> : <button onClick={handleAddMovieToList}> Wishlist </button>}</>;
}

export default AddToWishlistButton;
