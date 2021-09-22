import React, { useEffect, useState } from 'react';
import { scroller } from 'react-scroll';

import axios from '../../util/APIinstance';
import ListsHeading from './ListsHeading';
import { getListMovies } from '../../util/MovieListsHelpers';
import DisplayList from './DisplayList';

// styling
import './ListsPage.scss';


export default function UserWishlistPage() {
	const [wishlistMovies, setWishlistMovies] = useState([]);
	const [numOfMovies, setNumOfMovies] = useState(0);
	const [movieSectionStyle, setMovieSectionStyle] = useState('individual-movie-section');
	const [pickAMovie, setPickAMovie] = useState();
	const [alreadyPickedMovie, setAlreadyPickedMovie] = useState([]);

	useEffect(() => {
		getListMovies('wishlist', setWishlistMovies, setNumOfMovies);
	}, []);

	const deleteMovie = async id => {
		try {
			const res = await axios.delete(`/api/wishlist/delete-movie/${window.localStorage.getItem('user_id')}/${id}`);

			// update state
			const newWishlist = wishlistMovies.filter(movie => movie.imdb_id !== id);
			setWishlistMovies(newWishlist);
			setNumOfMovies(numOfMovies - 1);

			// console.log(res.data);
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
			setNumOfMovies(numOfMovies - 1);

			// console.log(response.data);
		} catch (error) {
			console.log(error.response);
		}
	};

	// random movie picker
	const randomMoviePicker = async () => {
		try {
			const pickRandomMovie = Math.floor(Math.random() * wishlistMovies.length);
			// console.log(wishlistMovies[pickRandomMovie]);

			if (alreadyPickedMovie.length === wishlistMovies.length ) {
				setAlreadyPickedMovie([]);
			}

			if (!alreadyPickedMovie.includes(pickRandomMovie)) {
				setPickAMovie(wishlistMovies[pickRandomMovie]);
				await setMovieSectionStyle('individual-movie-section on-picker');

				scroller.scrollTo("on-picker", {
					duration: 200,
					smooth: "smooth",
				});
				setAlreadyPickedMovie(alreadyPickedMovie => [pickRandomMovie, ...alreadyPickedMovie]);
			}
			else {
				randomMoviePicker();
			}

		} catch (error) {
			console.log(error.response);
		}
	};


	return (
		<div className='movie-list-container'>
			<div className='div-container'>
				<ListsHeading title='Want to Watch' numOfMovies={numOfMovies}/>
				<div>
					<button className="btn" onClick={randomMoviePicker}>choose for me</button>
				</div> 
			</div>
			
			<DisplayList movieList={wishlistMovies} deleteMovie={deleteMovie} addMovieToAnotherList={addMovieToWatched} listToMove='Watched' movieSectionStyle={movieSectionStyle} pickAMovie={pickAMovie} />
		</div>
	);
}
