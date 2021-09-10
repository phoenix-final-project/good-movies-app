import React, { useEffect, useState } from "react";
import axios from "../../util/APIinstance";

// styling
import "./ListsPage.scss";

export default function UserWishlistPage() {
    const [wishlistMovies, setWishlistMovies] = useState([]);
    const [numOfMovies, setNumOfMovies] = useState(0);

    useEffect(() => {
        getWishlistMovies();
    }, []);

    const getWishlistMovies = async () => {
        try {
            const res = await axios.get(
                `/api/wishlist/${window.localStorage.getItem('user_id')}`
            );
            setWishlistMovies(res.data.data); 
            setNumOfMovies(res.data.numOfMovies);
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteMovie = async(id) => {
        try {
            const res = await axios.delete(
                `/api/wishlist/delete-movie/${window.localStorage.getItem('user_id')}/${id}`
            );

            // update state
            const newWishlist = wishlistMovies.filter((movie) => movie.imdb_id !== id);
            setWishlistMovies(newWishlist);

            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    // Move to Watched
    const addMovieToWatched = async (movie) => {
        try {
            const response = await axios.post(`/api/watched/add-movie/${window.localStorage.getItem('user_id')}/1`, { movie });

            // update state
            const newWishlist = wishlistMovies.filter((item) => item.imdb_id !== movie.imdb_id);
            setWishlistMovies(newWishlist);

            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div className='movie-list-container'>
            <div className="movie-list-heading">
                <h2>Want to Watch ({numOfMovies})</h2>
            </div>

            <div className='movie-list'>
            {wishlistMovies.map((movie) => (
                <div key={movie.imdb_id} className='individual-movie-section'>
                    <section>
                        <div className='poster'>
                            <img src={movie.image_url} alt={movie.title} />
                        </div>
                    </section>

                    <section>
                        <p>Title: <span>{movie.title}</span></p>
                        <p>Year: <span>{movie.year}</span></p>
                        <p>Length: <span>{movie.movie_length}</span></p>
                        <p>Rating: {movie.rating}</p>
                    </section>

                    <section>
                        <h4>Plot</h4>
                        <p>{movie.plot}</p>

                        {movie.gen.map(gen => <span>{gen.genre}</span>)}
                    </section>

                    <section>
                        <button onClick={() => deleteMovie(movie.imdb_id)}>Delete</button>
                        
                        <button onClick={() => addMovieToWatched(movie)}>Watched</button>
                    </section>
                </div>
            ))}
            </div>
        </div>
    );
}