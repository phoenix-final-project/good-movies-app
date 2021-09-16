import "./Friend.scss";

export default function MoviesInCommon({
    friendFirstname,
    friendLastname,
    commonWishlist,
    showMovie,
    setShowMoviesInCommon,
    setIsMovieInCommon,
}) {
    return (
        <section className={`cover-outside-card ${showMovie}`}>
            <div className="common-movies-card">
                <h3>
                    Movies in common with{" "}
                    <span>
                        {friendFirstname} {friendLastname}
                    </span>
                </h3>

                {commonWishlist.map((movie) => (
                    <div key={movie.imdb_id} className="one-movie-box">
                        <div className="one-movie-box-data">
                            <img src={movie.image_url} alt="" />

                            <div className="movie-data">
                                <p>
                                    Title: <span>{movie.title}</span>
                                </p>
                                <p>
                                    Year: <span>{movie.year}</span>
                                </p>
                                {movie.movie_length !== 0 && (
                                    <p>
                                        Length:{" "}
                                        <span>{movie.movie_length}</span>
                                    </p>
                                )}
                                <p>
                                    Rating: <span>{movie.rating}</span>
                                </p>
                            </div>
                        </div>

                        <div className="closeCardDiv">
                            <button
                                id="closeCard"
                                onClick={(e) => {
                                    setShowMoviesInCommon("hidden");
                                    setIsMovieInCommon(false);
                                }}
                            >
                                x
                            </button>
                        </div>

                        <div>
                            <button>Invite to watch</button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// setShowMoviesInCommon("hidden")
