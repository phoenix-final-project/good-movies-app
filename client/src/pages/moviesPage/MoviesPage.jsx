import React, { useState, useCallback, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";

export default function MoviesPage() {
    // Local state
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [skip, setSkip] = useState(1);

    // const [isError, setIsError] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    const getUpcomingMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(`/api/movie/upcoming/${skip}`);

            if (res.status === 200) {
                console.log(res.data.foundMovies);
                setUpcomingMovies(res.data.foundMovies);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [skip]);

    const getTopRatedMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(`/api/movie/toprated/${skip}`);

            if (res.status === 200) {
                console.log(res.data.foundMovies);
                setTopRatedMovies(res.data.foundMovies);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [skip]);

    // getting the date from backend (movies)
    useEffect(() => {
        getUpcomingMovies();
        getTopRatedMovies();
    }, [skip, getUpcomingMovies, getTopRatedMovies]);

    // Pagination
    const handleForwardButton = () => {
        setSkip(skip + 1);
        console.log(skip);
    };

    return (
        <React.Fragment>
            <h1>Hello from movies page</h1>
            <h3>Upcoming Movies</h3>
            <div className="moviesContainer">
                {upcomingMovies.map((item) => (
                    <div
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            console.log(item.imdb_id);
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                        }}
                    >
                        <img src={item.image_url} alt="" />
                    </div>
                ))}
            </div>

            <h3>Top Rated Movies</h3>
            <div className="moviesContainer">
                {topRatedMovies.map((item) => (
                    <div
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            console.log(item.imdb_id);
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                        }}
                    >
                        <img src={item.image_url} alt="" />
                    </div>
                ))}
            </div>

            {showMovie ? <MovieById movieId={movieId} /> : null}
            <button onClick={handleForwardButton}>Skip</button>
        </React.Fragment>
    );
}
