import React, { useState, useEffect } from 'react';
import { addMovieToList } from '../../util/MovieListsHelpers';

function AddToWishlistButton({ wishlistMoviesIds, movieId, movie }) {
	const [addedToWishlist, setAddedToWishlist] = useState(wishlistMoviesIds.includes(movieId));

	useEffect(() => {
		if (wishlistMoviesIds.includes(movieId)) setAddedToWishlist(true);
		else if (!wishlistMoviesIds.includes(movieId)) setAddedToWishlist(false);
	}, [movieId, wishlistMoviesIds]);

	return <>{addedToWishlist ? <button className='added'> Added </button> : <button onClick={() => addMovieToList('wishlist', movie)}> Wishlist </button>}</>;
}

export default AddToWishlistButton;
