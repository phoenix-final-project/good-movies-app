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
    //const [favoriteGenresMovies, setFavoriteGenresMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    //const [page3, setPage3] = useState(1);
    const [lastPage1, setLastPage1] = useState();
    const [lastPage2, setLastPage2] = useState();

    // pop-up "modal" for a movie
    const [movieCardOn, setMovieCardOn] = useState("");

    const getUpcomingMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(
                `/api/movie/upcoming/${page1}`
            );

            if (res.status === 200) {
                setUpcomingMovies(res.data.foundMovies);
                setLastPage1(res.data.numberOfPages);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [page1]);

    const getTopRatedMovies = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(
                `/api/movie/toprated/${page2}`
            );

            if (res.status === 200) {
                setTopRatedMovies(res.data.foundMovies);
                setLastPage2(res.data.numberOfPages);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [page2]);

    // getting movies by favorite genre
    /* const getMoviesByGenre = useCallback(async () => {
        try {
            let res = await axiosApiInstance.get(
                `/api/movie/byGenre/${localStorage.getItem("user_id")}/${page3}`
            );

            if (res.status === 200) {
                console.log(res.data);
                setFavoriteGenresMovies(res.data);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            // setIsError(true);
            // setErrorMessage(error.message);
        }
    }, [page3]); */

    // getting the data from backend (movies)
    useEffect(() => {
        getUpcomingMovies();
        getTopRatedMovies();
        //getMoviesByGenre();
    }, [
        page1,
        page2,
        //page3,
        lastPage1,
        lastPage2,
        getUpcomingMovies,
        getTopRatedMovies,
        //getMoviesByGenre,
    ]);

    // Pagination
    // FORWARD
    const handleForwardButton1 = () => {
        setPage1(page1 + 1);
    };
    const handleForwardButton2 = () => {
        setPage2(page2 + 1);
    };
    /* const handleForwardButton3 = () => {
        setPage3(page3 + 1);
    }; */

    // BACKWARD
    const handleBackwardButton1 = () => {
        setPage1(page1 - 1);
    };
    const handleBackwardButton2 = () => {
        setPage2(page2 - 1);
    };
    /*  const handleBackwardButton3 = () => {
        setPage3(page3 - 1);
    }; */

    return (
        <React.Fragment>
            {/* SEARCH MOVIES component */}
            <SearchMovies />

            {/* UPCOMING MOVIES box */}
            <h3 className="movies-title">Upcoming Movies </h3>
            <div className="moviesContainer">
                <div className="buttonContainer">
                    {page1 === 1 ? null : (
                        <button
                            className="prev"
                            onClick={handleBackwardButton1}
                        >
                            {" "}
                            <i className="fas fa-chevron-circle-left"></i>
                        </button>
                    )}
                </div>

                {upcomingMovies.map((item) => (
                    <div
                        title={item.title}
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            // console.log(item.imdb_id);
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                            setMovieCardOn("");
                        }}
                    >
                        {/* <img src={item.image_url} alt={item.title} /> */}
                        <img
                            src={
                                item.image_url !== "aa.com"
                                    ? item.image_url
                                    : "../../images/poster_blank.png"
                            }
                            alt={item.title}
                        />

                        {item.image_url !== "aa.com" ? null : (
                            <div className="posterTitle">{item.title}</div>
                        )}
                    </div>
                ))}
                <div className="buttonContainer">
                    {page1 >= lastPage1 ? null : (
                        <button className="next" onClick={handleForwardButton1}>
                            {" "}
                            <i className="fas fa-chevron-circle-right"></i>{" "}
                        </button>
                    )}
                </div>
            </div>

            {/* TOP RATED MOVIES box */}
            <h3 className="movies-title">Top Rated Movies</h3>
            <div className="moviesContainer">
                <div className="buttonContainer">
                    {page2 === 1 ? null : (
                        <button
                            className="prev"
                            onClick={handleBackwardButton2}
                        >
                            <i className="fas fa-chevron-circle-left"></i>{" "}
                        </button>
                    )}
                </div>
                {topRatedMovies.map((item) => (
                    <div
                        title={item.title}
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            // console.log(item.imdb_id);
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                            setMovieCardOn("");
                        }}
                    >
                        <img src={item.image_url} alt={item.title} />
                    </div>
                ))}
                <div className="buttonContainer">
                    {page2 >= lastPage2 ? null : (
                        <button className="next" onClick={handleForwardButton2}>
                            {" "}
                            <i className="fas fa-chevron-circle-right"></i>{" "}
                        </button>
                    )}
                </div>
            </div>

            {/* FAVORITE GENRE MOVIES box */}
            {/* <h3 className="movies-title">Movies according your Wihslist</h3>
            <div className="moviesContainer">
                <div className="buttonContainer">
                    {page3 === 1 ? null : (
                        <button
                            className="prev"
                            onClick={handleBackwardButton3}
                        >
                            <i className="fas fa-chevron-circle-left"></i>{" "}
                        </button>
                    )}
                </div>
                {topRatedMovies.map((item) => (
                    <div
                        title={item.title}
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            // console.log(item.imdb_id);
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                            setMovieCardOn("");
                        }}
                    >
                        <img src={item.image_url} alt={item.title} />
                    </div>
                ))}
                <div className="buttonContainer">
                    {page2 >= lastPage2 ? null : (
                        <button className="next" onClick={handleForwardButton3}>
                            {" "}
                            <i className="fas fa-chevron-circle-right"></i>{" "}
                        </button>
                    )}
                </div>
            </div> */}

            {showMovie ? (
                <MovieById
                    movieId={movieId}
                    setMovieCardOn={setMovieCardOn}
                    movieCardOn={movieCardOn}
                    setMovieId={setMovieId}
                />
            ) : null}
        </React.Fragment>
    );
}
