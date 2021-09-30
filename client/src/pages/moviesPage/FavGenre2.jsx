import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";


export default function FavGenre2() {
    // Local state
    const [secondFavoriteGenresMovies, setSecondFavoriteGenresMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");

    const [noFavoriteGenre2, setNoFavoriteGenre2] = useState(false);
    const [genre2, setGenre2] = useState("");

    // pop-up "modal" for a movie
    const [movieCardOn, setMovieCardOn] = useState("");

    // pagination
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(6);


    // getting movies by 2nd favorite genre
    const favGenre2 = () => {
        axiosApiInstance
            .get(
                `/api/movie/byGenre2/${localStorage.getItem("user_id")}`
            )
            .then(res => {
                setSecondFavoriteGenresMovies(res.data.foundMovies);
                setGenre2(res.data.favoriteGenre2);

                if (res.data.foundMovies.length === 0) {
                    setNoFavoriteGenre2(true);
                }
            })
            .catch(error => {
                console.log("Something went wrong", error.message);
                setNoFavoriteGenre2(true)
                setGenre2("")
            })
    }

    useEffect(() => {
        favGenre2()
    }, []);


    // Pagination
    // FORWARD
    const handleForwardButton4 = () => {
        setStart(start + 6);
        setEnd(end + 6)
    };

    // BACKWARD
    const handleBackwardButton4 = () => {
        setStart(start - 6);
        setEnd(end - 6)
    };


    return (
        <React.Fragment>

            {/* 2nd FAVORITE GENRE MOVIES box */}
            {!noFavoriteGenre2 && window.localStorage.getItem("username") ? (
                <div>
                    <h3 className="movies-title">{`Because you like ${genre2} movies`}</h3>
                    <div className="moviesContainer">

                        {/* PREVIOUS button */}
                        <div className="button-container-prev">
                            {start === 0 ? null : (
                                <button
                                    className="prev"
                                    onClick={handleBackwardButton4}
                                >
                                    <i className="fas fa-chevron-circle-left"></i>{" "}
                                </button>
                            )}
                        </div>

                        {/* MOVIES */}
                        {secondFavoriteGenresMovies.slice(start, end).map((item) => (
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

                        {/* NEXT button */}
                        <div className="button-container-next">
                            {end >= secondFavoriteGenresMovies.length ? null : (
                                <button
                                    className="next"
                                    onClick={handleForwardButton4}
                                >
                                    {" "}
                                    <i className="fas fa-chevron-circle-right"></i>{" "}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )
                : null}


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
