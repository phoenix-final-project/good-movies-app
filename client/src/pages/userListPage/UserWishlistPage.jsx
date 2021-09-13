import React, { useEffect, useState } from 'react';
import axios from '../../util/APIinstance';
import ListsHeading from './ListsHeading';
import { getListMovies } from '../../util/MovieListsHelpers';

// styling
import './ListsPage.scss';
import DisplayList from './DisplayList';

export default function UserWishlistPage() {
	const [wishlistMovies, setWishlistMovies] = useState([]);
	const [numOfMovies, setNumOfMovies] = useState(0);

	useEffect(() => {
		getListMovies('wishlist', setWishlistMovies, setNumOfMovies);
	}, []);

	const deleteMovie = async id => {
		try {
			const res = await axios.delete(`/api/wishlist/delete-movie/${window.localStorage.getItem('user_id')}/${id}`);

			// update state
			const newWishlist = wishlistMovies.filter(movie => movie.imdb_id !== id);
			setWishlistMovies(newWishlist);

			console.log(res.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	// Move to Watched
	const addMovieToWatched = async movie => {
		try {
			const response = await axios.post(`/api/watched/add-movie/${window.localStorage.getItem('user_id')}`, { movie });

			// update state
			const newWishlist = wishlistMovies.filter(item => item.imdb_id !== movie.imdb_id);
			setWishlistMovies(newWishlist);

			console.log(response.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<div className='movie-list-container'>
			<ListsHeading title='Want to Watch' numOfMovies={numOfMovies} />

			<DisplayList movieList={wishlistMovies} deleteMovie={deleteMovie} addMovieToAnotherList={addMovieToWatched} listToMove='Watched' />
		</div>
	);
}
