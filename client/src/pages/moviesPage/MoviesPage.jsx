import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    // const [isError, setIsError] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");
    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");

    // getting the date from backend (upcoming movies)
    useEffect(() => {
        getUpcomingMovies();
    }, []);

    async function getUpcomingMovies() {
        try {
            let res = await axiosApiInstance.get("/api/movie/upcoming");

            if (res.status === 200) {
                //console.log(res.data);
                setMovies(res.data);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }

    return (
        <React.Fragment>
            <h1>Hello from movies page</h1>
            {movies.map((item) => (
                <div
                    key={item.imdb_id}
                    onClick={() => {
                        console.log(item.imdb_id);
                        setShowMovie(true);
                        setMovieId(item.imdb_id);
                    }}
                >
                    <p>{item.title}</p>
                    <img src={item.image_url} alt="" />
                </div>
            ))}
            {showMovie ? <MovieById movieId={movieId} /> : null}
        </React.Fragment>
    );
}
