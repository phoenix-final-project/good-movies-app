import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./MoviesPage.scss";


export default function FavGenre1() {
    // Local state
    const [favoriteGenresMovies, setFavoriteGenresMovies] = useState([]);

    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");
    const [isFavoriteGenre, setIsFavoriteGenre] = useState(false);
    const [genre, setGenre] = useState("");

    // pop-up "modal" for a movie
    const [movieCardOn, setMovieCardOn] = useState("");

    // pagination
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(6);


    useEffect(() => {

        axiosApiInstance
            .get(
                `/api/movie/byGenre/${localStorage.getItem("user_id")}`
            )
            .then(res => {
                // console.log(res.data)
                setFavoriteGenresMovies(res.data.foundMovies);
                setIsFavoriteGenre(true)
                setGenre(res.data.favoriteGenre)
            })
            .catch(error => {
                console.log("Something went wrong", error.message);
                setIsFavoriteGenre(false);
                setGenre("")
            })
    }, []);

    // Pagination
    // FORWARD
    const handleForwardButton3 = () => {
        setStart(start + 6);
        setEnd(end + 6)
    };

    // BACKWARD
    const handleBackwardButton3 = () => {
        setStart(start - 6);
        setEnd(end - 6)
    };


    return (
        <React.Fragment>

            {/* 1ST FAVORITE GENRE MOVIES box */}
            {isFavoriteGenre ? (
                <div>
                    <h3 className="movies-title">{`Because you like ${genre} movies`}</h3>
                    <div className="moviesContainer">
                        <div className="buttonContainer">
                            {start === 0 ? null : (
                                <button
                                    className="prev"
                                    onClick={handleBackwardButton3}
                                >
                                    <i className="fas fa-chevron-circle-left"></i>{" "}
                                </button>
                            )}
                        </div>

                        {favoriteGenresMovies.slice(start, end).map((item) => (
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
                        <div className="buttonContainer">
                            {end >= favoriteGenresMovies.length ? null : (
                                <button
                                    className="next"
                                    onClick={handleForwardButton3}
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