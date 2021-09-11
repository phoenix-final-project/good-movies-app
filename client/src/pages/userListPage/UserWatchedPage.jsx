import React, { useEffect, useState } from "react";
import axios from "../../util/APIinstance";
import DisplayList from './DisplayList';
import "./ListsPage.scss";


function UserWatchedPage() {
    const [watchedListMovies, setWatchedListMovies ] = useState([]);
    const [numOfMovies, setNumOfMovies] = useState(0);


    useEffect(() => {
        getWatchedListMovies();
    }, []);

    const getWatchedListMovies = async () => {
        try {
            const res = await axios.get(
                `/api/watched/${window.localStorage.getItem('user_id')}`
            );

            setWatchedListMovies(res.data.data);
            setNumOfMovies(res.data.numOfMovies);

        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteMovie = async(id) => {
        try {
            const res = await axios.delete(
                `/api/watched/delete-movie/${window.localStorage.getItem('user_id')}/${id}`
            );

            // update state
            const newWatchedList = watchedListMovies.filter((movie) => movie.imdb_id !== id);
            setWatchedListMovies(newWatchedList);

            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    const addMovieToWishlist = async (movie) => {

        try {
            const response = await axios.post(`/api/wishlist/add-movie/${window.localStorage.getItem('user_id')}/1`, { movie });

            // update state
            const newWatchedList = watchedListMovies.filter((item) => item.imdb_id !== movie.imdb_id);
            setWatchedListMovies(newWatchedList);

            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className='movie-list-container'>
            <div className="movie-list-heading">
                <h2>Watched ({numOfMovies})</h2>
                <p>Search bar here</p>
            </div>

            <DisplayList movieList={watchedListMovies} deleteMovie={deleteMovie} addMovieToAnotherList={addMovieToWishlist} />
            
        </div>
    )
}

export default UserWatchedPage
