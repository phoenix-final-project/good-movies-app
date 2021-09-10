import React, { useState, useEffect, useCallback } from "react";
import axiosApiInstance from "../../util/APIinstance";
import { useDispatch } from "react-redux";
import {
    // addMovieWishlist,
    addMovieWatched,
    addMovieFavorite,
} from "../../redux/actions/movieActions";

// styling
import "./MovieById.scss";


export default function MovieById({ movieId }) {
    // local state
    const [movie, setMovie] = useState({});
    const [trailerOn, setTrailerOn] = useState("hidden")

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
            const res = await axiosApiInstance.post(`/api/wishlist/add-movie/${window.localStorage.getItem('user_id')}/0`, { movie });

            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const addMovieToWatchedList = async () => {
        try {
            const response = await axiosApiInstance.post(`/api/watched/add-movie/${window.localStorage.getItem('user_id')}/0`, { movie });

            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    // const watchTrailer = () => {
    //     setTrailerOn("")
    // }

    return (
        <div className="movieCard">

            <div className="poster">
                <img src={movie.image_url} alt={movie.title} />

                <div className="buttons">
                    <h4>Add to:</h4>
                    <button onClick={addMovieToWishList}> Wishlist </button>
                    <button onClick={addMovieToWatchedList}> Watched </button>
                    <button onClick={addMovieToFavoriteList} disabled="true"> Favorite </button>
                </div>
            </div>

            <div className="info">
                <div>
                    <h3>{movie.title} ({movie.year}) </h3>
                    <div>Length: {movie.movie_length} min | Rating: {movie.rating} </div>
                </div>

                <p>
                    <h4>Description</h4>
                    <div>{movie.description}</div>
                </p>

                {/* GENRES */}
                {movie.gen ? <p> | {movie.gen.map(genre => <span> {genre.genre} |</span>)} </p> : null}

                <button onClick={(e) => setTrailerOn("")}> Watch a Trailer </button>


                {/* TRAILER */}
                <div className={`trailer ${trailerOn}`}>
                    <div onClick={(e) => setTrailerOn("hidden")} className="close">
                        Close X
                    </div>

                    <iframe src={movie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>


            </div>

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


