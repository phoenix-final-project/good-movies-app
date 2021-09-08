import React, { useEffect, useState } from "react";
//import { useDispatch } from "react-redux";
//import { getMoviesWishlist } from "../../redux/actions/movieActions";
import { useSelector } from "react-redux";
import axiosApiInstance from "../../util/APIinstance";

// styling
import "./UserListPage.scss";

export default function UserListPage() {
    const [wishlistMovies, setWishlistMovies] = useState([]);

    useEffect(() => {
        getWishlistMovies();
    }, []);

    const getWishlistMovies = async () => {
        try {
            const res = await axiosApiInstance.get(
                `/api/wishlist/6131ef2e3d206c5a94e92e60`
            );
            console.log(res.data);
            setWishlistMovies(res.data);
        } catch (error) {
            console.log("Something went wrong", error.message);
        }
    };

    /* const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMoviesWishlist());
    }, [dispatch]); */

    // receiving data from the store
    const movies = useSelector((state) => state);
    console.log(movies);
    const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
    console.log(favoriteMovies);
    //const watchedMovies = useSelector((state) => state.movies.watchedMovies);
    //const wishlistMovies = useSelector((state) => state.movies.wishlistMovies);

    //<p key={item.imdb_id}>{item}</p>

    return (
        <React.Fragment>
            <h1>Hi, here is user list page</h1>
            {/* <h3>Wishlist Movies</h3>
            {wishlistMovies.map((item) => (
                <p key={item.index}>{item}</p>
            ))}{" "}
            */}

            {/* <h3>Favorite Movies</h3>
            {favoriteMovies.map((item) => (
                <p key={item.index}>{item}</p>
            ))}
            <h3>Watched Movies</h3>
            {watchedMovies.map((item) => (
                <p key={item.index}>{item}</p>
            ))}
            <h3>Wishlist Movies</h3>
            {wishlistMovies.map((item) => (
                <p key={item.index}>{item}</p>
            ))} */}
        </React.Fragment>
    );
}
