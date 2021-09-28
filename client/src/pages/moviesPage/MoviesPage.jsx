import React from "react";

// components
import SearchMovies from "../../components/searchMovies/SearchMovies";
import Upcoming from "./Upcoming";
import TopRated from "./TopRated";
import FavGenre1 from "./FavGenre1";
import FavGenre2 from "./FavGenre2";

// styling
import "./MoviesPage.scss";


export default function MoviesPage() {

    return (
        <React.Fragment>
            {/* SEARCH MOVIES component */}
            <SearchMovies />

            {/* UPCOMING MOVIES box */}
            <Upcoming />


            {/* SHOWN ONLY FOR LOGGED IN USERS */}
            {window.localStorage.getItem("username") ?
                <>
                    {/* 1ST FAVORITE GENRE MOVIES box */}
                    <FavGenre1 />

                    {/* 2nd FAVORITE GENRE MOVIES box */}
                    <FavGenre2 />
                </>
                :
                null
            }


            {/* TOP RATED MOVIES box */}
            <TopRated />

        </React.Fragment>
    );
}