import React, { useState, useCallback, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";


export default function Upcoming() {
    // Local state
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [page1, setPage1] = useState(1);
    const [lastPage1, setLastPage1] = useState();


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

    useEffect(() => {
        getUpcomingMovies();
    }, [page1, getUpcomingMovies])


    // Pagination
    // FORWARD
    const handleForwardButton1 = () => {
        setPage1(page1 + 1);
    };

    // BACKWARD
    const handleBackwardButton1 = () => {
        setPage1(page1 - 1);
    };


    return (
        <React.Fragment>

            {/* UPCOMING MOVIES box */}
            <h3 className="movies-title">Upcoming Movies </h3>
            <div className="moviesContainer">

                {page1 === 1 ? null : (
                    <div className="button-container-prev">
                        <button
                            className="prev"
                            onClick={handleBackwardButton1}
                        >
                            {" "}
                            <i className="fas fa-chevron-circle-left"></i>
                        </button>
                    </div>
                )}

                {upcomingMovies.map((item) => (
                    <div
                        title={item.title}
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                            setMovieCardOn("");
                        }}
                    >
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
                {page1 >= lastPage1 ? null : (
                    <div className="button-container-next">

                        <button className="next" onClick={handleForwardButton1}>
                            {" "}
                            <i className="fas fa-chevron-circle-right"></i>{" "}
                        </button>

                    </div>
                )}
            </div>

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
