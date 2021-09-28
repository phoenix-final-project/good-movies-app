import React, { useState, useCallback, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";

export default function TopRated() {
    // Local state
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [page2, setPage2] = useState(1);
    const [lastPage2, setLastPage2] = useState();

    // pop-up "modal" for a movie
    const [movieCardOn, setMovieCardOn] = useState("");


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

    useEffect(() => {
        getTopRatedMovies();
    }, [page2, getTopRatedMovies])


    // Pagination
    // FORWARD
    const handleForwardButton2 = () => {
        setPage2(page2 + 1);
    };

    // BACKWARD
    const handleBackwardButton2 = () => {
        setPage2(page2 - 1);
    };

    return (
        <React.Fragment>

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