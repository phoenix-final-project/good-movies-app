import React, { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
//import { getMoviesWishlist } from "../../redux/actions/movieActions";
import { useSelector } from "react-redux";
import axiosApiInstance from "../../util/APIinstance";

// styling
import "./UserWishlistPage.scss";

export default function UserWishlistPage() {
    const [wishlistMovies, setWishlistMovies] = useState([]);

    useEffect(() => {
        getWishlistMovies();
    }, []);

    const getWishlistMovies = async () => {
        try {
            const res = await axiosApiInstance.get(
                `/api/wishlist/61376a92dec13afb277dc9e6`
            );
            setWishlistMovies(res.data); 
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteMovie = async(id) => {
        try {
            const res = await axiosApiInstance.delete(
                `/api/wishlist/delete-movie/61376a92dec13afb277dc9e6/${id}`
            );

            // update state
            const newWishlist = wishlistMovies.filter((movie) => movie.imdb_id !== id);
            setWishlistMovies(newWishlist);

            console.log(res);
        } catch (error) {
            console.log(error.response);
        }
    }

    // Move to Watched
      // Sending movie to wishlist in backend
    const addMovieToWatched = async (id) => {
        try {
            const res = await axiosApiInstance.post(`/api/watched/add-movie/61376a92dec13afb277dc9e6/${id}`);

            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <React.Fragment>
            <h1>My Wishlist</h1>
            {wishlistMovies.map((movie) => (
                <div key={movie.imdb_id}>
                    <p>{movie.title}</p>
                    <div><img src={movie.image_url} alt={movie.title} /></div>
                    <p>Rating: {movie.rating}</p>
                    <button onClick={() => deleteMovie(movie.imdb_id)}>Delete</button>
                    <button onClick={() => addMovieToWatched(movie.imdb_id)}>Watched</button>
                </div>
            ))}
        </React.Fragment>
    );
}

    /* const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMoviesWishlist());
    }, [dispatch]); */

    // receiving data from the store
    // const movies = useSelector((state) => state);
    // console.log(movies);
    // const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
    // console.log(favoriteMovies);
    //const watchedMovies = useSelector((state) => state.movies.watchedMovies);
    //const wishlistMovies = useSelector((state) => state.movies.wishlistMovies);

    //<p key={item.imdb_id}>{item}</p>