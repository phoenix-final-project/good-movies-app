import React, { useEffect, useState } from 'react';
import axios from '../../util/APIinstance';
import DisplayList from './DisplayList';
import ListsHeading from './ListsHeading';
import './ListsPage.scss';

import { getListMovies } from '../../util/MovieListsHelpers';

function UserWatchedPage() {
	const [watchedListMovies, setWatchedListMovies] = useState([]);
	const [numOfMovies, setNumOfMovies] = useState(0);

	useEffect(() => {
		getListMovies('watched', setWatchedListMovies, setNumOfMovies);
	}, []);

	const deleteMovie = async id => {
		try {
			const res = await axios.delete(`/api/watched/delete-movie/${window.localStorage.getItem('user_id')}/${id}`);

			// update state
			const newWatchedList = watchedListMovies.filter(movie => movie.imdb_id !== id);
			setWatchedListMovies(newWatchedList);
			setNumOfMovies(numOfMovies - 1);

			console.log(res.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	const addMovieToWishlist = async movie => {
		try {
			const response = await axios.post(`/api/wishlist/add-movie/${window.localStorage.getItem('user_id')}`, { movie });

			// update state
			const newWatchedList = watchedListMovies.filter(item => item.imdb_id !== movie.imdb_id);
			setWatchedListMovies(newWatchedList);
			setNumOfMovies(numOfMovies - 1);

			console.log(response.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<div className='movie-list-container'>
			<div className='div-container'>
				<ListsHeading title='Watched' numOfMovies={numOfMovies} ifWatchedList={true} />
			</div>
			<DisplayList movieList={watchedListMovies} deleteMovie={deleteMovie} addMovieToAnotherList={addMovieToWishlist} listToMove='Wishlist' ifWatchedList={true} />
		</div>
	);
}

export default UserWatchedPage;
