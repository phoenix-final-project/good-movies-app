import React, { useState, useEffect, useCallback } from "react";
import axiosApiInstance from "../../util/APIinstance";
import { useDispatch } from "react-redux";
import {
    // addMovieWishlist,
    addMovieWatched,
    addMovieFavorite,
} from "../../redux/actions/movieActions";

export default function MovieById({ movieId }) {
    // local state
    const [movie, setMovie] = useState({});

    const getMovieById = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(
                `/api/movie/oneMovieById/${movieId}`
            );

            if (res.status === 200) {
                console.log(res.data.foundMovie);
                setMovie(res.data.foundMovie);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
        }
    }, [movieId]);

    // fetching data from backend (movieById)
    useEffect(() => {
        getMovieById();
    }, [getMovieById]);

    // Dispatch actions
    const dispatch = useDispatch();

    const addMovieToFavoriteList = () => {
        console.log(movie);
        return dispatch(addMovieFavorite(movie));
    };

    // Sending movie to wishlist in backend
    const addMovieToWishList = async () => {
        try {
            const res = await axiosApiInstance.post(`/api/wishlist/add-movie/61376a92dec13afb277dc9e6/0`, { movie });

            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const addMovieToWatchedList = async () => {
        try {
            const response = await axiosApiInstance.post(`/api/watched/add-movie/61376a92dec13afb277dc9e6/0`, { movie });

            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div>
            <h1>Movie by Id</h1>
            <h2>Movie By Id {movieId}</h2>
            <p>{movie.title}</p>
            <img src={movie.image_url} alt="" />
            <button onClick={addMovieToWishList}>
                Wishlist
            </button>
            <button onClick={addMovieToWatchedList}>Watched</button>
            <button onClick={addMovieToFavoriteList}>
                Favorite
            </button>
            
        </div>
    );
}

 // const addToWishList = () => {
    //     console.log(movie);
    //     return dispatch(addMovieWishlist(movie));
    // };

    // const addToWatchedMovies = () => {
    //     console.log(movie);
    //     return dispatch(addMovieWatched(movie));
    // };

    
