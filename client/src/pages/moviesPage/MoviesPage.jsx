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
    const [skip1, setSkip1] = useState(1);
    const [skip2, setSkip2] = useState(1);

    // const [isError, setIsError] = useState(false);
    // const [errorMessage, setErrorMessage] = useState("");

    const getUpcomingMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(`/api/movie/upcoming/${skip1}`);

            if (res.status === 200) {
                console.log(res.data.foundMovies);
                setUpcomingMovies(res.data.foundMovies);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [skip1]);

    const getTopRatedMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(`/api/movie/toprated/${skip2}`);

            if (res.status === 200) {
                console.log(res.data.foundMovies);
                setTopRatedMovies(res.data.foundMovies);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [skip2]);

    // getting the date from backend (movies)
    useEffect(() => {
        getUpcomingMovies();
        getTopRatedMovies();
    }, [skip1, skip2, getUpcomingMovies, getTopRatedMovies]);

    // Pagination
    const handleForwardButton1 = () => {
        setSkip1(skip1 + 1);
        console.log(skip2);
    };

    const handleForwardButton2 = () => {
        setSkip2(skip2 + 1);
        console.log(skip2);
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
                        <img src={item.image_url} alt={item.title} /* width="100%" *//>
                    </div>
                ))}
            </div>
            <button className="next" onClick={handleForwardButton1}>Next... </button>


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
                        <img src={item.image_url} alt={item.title} />
                    </div>
                ))}
            </div>

            <button className="next" onClick={handleForwardButton2}>Next... </button>

            {showMovie ? <MovieById movieId={movieId} /> : null}

        </React.Fragment>
    );
}
