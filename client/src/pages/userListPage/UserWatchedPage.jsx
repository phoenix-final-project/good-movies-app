import React, { useEffect, useState } from "react";
import axios from "../../util/APIinstance";


function UserWatchedPage() {
    const [watchedListMovies, setWatchedListMovies ] = useState([]);
    const [numOfMovies, setNumOfMovies] = useState(0);


    useEffect(() => {
        getWatchedListMovies();
    }, []);

    const getWatchedListMovies = async () => {
        try {
            const res = await axios.get(
                `/api/watched/61376a92dec13afb277dc9e6`
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
                `/api/watched/delete-movie/61376a92dec13afb277dc9e6/${id}`
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
            const response = await axios.post(`/api/wishlist/add-movie/61376a92dec13afb277dc9e6/1`, { movie });

            // update state
            const newWatchedList = watchedListMovies.filter((item) => item.imdb_id !== movie.imdb_id);
            setWatchedListMovies(newWatchedList);

            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <React.Fragment>
            <h1>Movies I watched</h1>
            <h2>Number of Movies: {numOfMovies}</h2>

            {watchedListMovies.map((movie) => (
                <div key={movie.imdb_id}>
                    <p>{movie.title}</p>
                    <div><img src={movie.image_url} alt={movie.title} /></div>
                    <p>Rating: {movie.rating}</p>
                    <button onClick={() => deleteMovie(movie.imdb_id)}>Delete</button>
                    <button onClick={() => addMovieToWishlist(movie)}>Wishlist</button>
                    <button>Favorite</button>
                </div>
            ))}
        </React.Fragment>
    )
}

export default UserWatchedPage
