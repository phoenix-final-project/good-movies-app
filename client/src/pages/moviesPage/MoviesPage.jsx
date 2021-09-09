import React, { useState, useCallback, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";
import SearchMovies from "../../components/searchMovies/SearchMovies";

export default function MoviesPage() {
    // Local state
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [lastPage1, setLastPage1] = useState();
    const [lastPage2, setLastPage2] = useState();


    const getUpcomingMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(`/api/movie/upcoming/${page1}`);

            if (res.status === 200) {
                console.log(res.data.numberOfPages, res.data.foundMovies);
                setUpcomingMovies(res.data.foundMovies);
                setLastPage1(res.data.numberOfPages)
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [page1]);

    const getTopRatedMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(`/api/movie/toprated/${page2}`);

            if (res.status === 200) {
                console.log(res.data.foundMovies);
                setTopRatedMovies(res.data.foundMovies);
                setLastPage2(res.data.numberOfPages)

            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [page2]);

    // getting the data from backend (movies)
    useEffect(() => {
        getUpcomingMovies();
        getTopRatedMovies();
        console.log("Upcoming movies, page:", page1, lastPage1);
        console.log("TopRated movies, page:", page2, lastPage2);

    }, [page1, page2, lastPage1, lastPage2, getUpcomingMovies, getTopRatedMovies]);

    // Pagination
    // FORWARD
    const handleForwardButton1 = () => {
        setPage1(page1 + 1);
    };
    const handleForwardButton2 = () => {
        setPage2(page2 + 1);
    };

    // BACKWARD
    const handleBackwardButton1 = () => {
        setPage1(page1 - 1);
    };
    const handleBackwardButton2 = () => {
        setPage2(page2 - 1);
    };

    return (
        <React.Fragment>
            <h1>Hello from movies page</h1>

            <SearchMovies />

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
                        <img src={item.image_url} alt={item.title} /* width="100%" */ />
                    </div>
                ))}
            </div>
            <div className="buttonContainer">
                {page1 === 1 ? null : <button className="prev" onClick={handleBackwardButton1}> ◀️</button>}

                {page1 >= lastPage1 ? null : <button className="next" onClick={handleForwardButton1}> ▶️ </button>}
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
                        <img src={item.image_url} alt={item.title} />
                    </div>
                ))}
            </div>

            <div className="buttonContainer">
                {page2 === 1 ? null : <button className="prev" onClick={handleBackwardButton2}>◀️ </button>}

                {page2 >= lastPage2 ? null : <button className="next" onClick={handleForwardButton2}> ▶️ </button>}
            </div>

            {showMovie ? <MovieById movieId={movieId} /> : null}

        </React.Fragment>
    );
}
