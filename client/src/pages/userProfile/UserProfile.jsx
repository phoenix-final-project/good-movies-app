import React from "react";
import { useSelector } from "react-redux";

// styling
import "./UserProfile.scss";

export default function UserProfile() {
    // receiving data from the store
    const movies = useSelector((state) => state);
    console.log(movies);
    const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
    console.log(favoriteMovies);
    const watchedMovies = useSelector((state) => state.movies.watchedMovies);
    const wishlistMovies = useSelector((state) => state.movies.wishlistMovies);

    return (
        <React.Fragment>
            <h1>Hello every body, welcome to user profile</h1>
            <h3>Favorite Movies</h3>
            {favoriteMovies.map((item) => (
                <p key={item.imdb_id}>{item}</p>
            ))}
            <h3>Watched Movies</h3>
            {watchedMovies.map((item) => (
                <p key={item.imdb_id}>{item}</p>
            ))}
            <h3>Wishlist Movies</h3>
            {wishlistMovies.map((item) => (
                <p key={item.imdb_id}>{item}</p>
            ))}
        </React.Fragment>
    );
}
