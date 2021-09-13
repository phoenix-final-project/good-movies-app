import React, { useEffect } from 'react';
import { addMovieToList } from '../../util/MovieListsHelpers';

function AddToWishlistButton({ wishlistMoviesIds, movieId, movie, addedToWishlist, setAddedToWishlist, setAddedToWatchedList }) {
	useEffect(() => {
		setAddedToWishlist(wishlistMoviesIds.includes(movieId));
	}, [movieId, wishlistMoviesIds, setAddedToWishlist]);

	const handleAddMovieToList = () => {
		setAddedToWishlist(true);
		setAddedToWatchedList(false);
		addMovieToList('wishlist', movie).catch(() => setAddedToWishlist(false));
	};

	return <>{addedToWishlist ? <button className='added'> Added </button> : <button onClick={handleAddMovieToList}> Wishlist </button>}</>;
}

export default AddToWishlistButton;
