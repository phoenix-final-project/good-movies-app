import React, { useCallback, useEffect, useState } from "react";
import axiosApiInstance from "../../util/APIinstance";
// import { usePagination } from '@material-ui/lab/Pagination';

// Component
import MovieById from "../../components/movieById/MovieById";

// styling
import "./SearchMovies.scss";


function SearchMovies() {
    const [showMovie, setShowMovie] = useState(false);
    const [movieId, setMovieId] = useState("");

    // SEARCH movies:
    const [searchBy, setSearchBy] = useState("title");
    const [searchParam, setSearchParam] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();
    const [numberOfMovies, setNumberOfMovies] = useState(0);

    const [movieCardOn, setMovieCardOn] = useState("")

    // const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Search movies by title and searchParam ("london" for example)
    const getMoviesBySearchParam = async (e) => {
        e.preventDefault();

        try {
            let res = await axiosApiInstance.get(`/api/movie/${searchBy}/${searchParam}/${page}`);

            // console.log("IN***", page, searchBy, searchParam);

            if (res.status === 200) {
                console.log(res.data.numberOfMovies, res.data.foundMovies);
                setSearchResults(res.data.foundMovies);
                setNumberOfMovies(res.data.numberOfMovies)
                setLastPage(res.data.numberOfPages)
            }
        } catch (error) {
            console.log("Something went wrong:", error.response.data.message);
            // setIsError(true);
            setSearchResults([])
            setNumberOfMovies(0)
            setErrorMessage(error.response.data.message);
        }
    }
    // , [searchBy, searchParam, page]);

    // Pagination
    // FORWARD
    const handleForwardButton = () => {
        setPage(page + 1);
        // console.log(searchParam);
        // getMoviesBySearchParam()
    };

    // BACKWARD
    const handleBackwardButton = () => {
        setPage(page - 1);
    };

    //  useEffect(() => {
    //     getMoviesBySearchParam();
    //     console.log("Search movies, page:", page, searchParam);
    // }, [page, searchParam, getMoviesBySearchParam]);


    return (
        <div>
            <div className="search" >

                <form onSubmit={getMoviesBySearchParam}>
                    <label htmlFor="header-search">
                        <span className="">Find a movie </span>
                    </label>

                    <select name="search" id="search" onChange={(e) => { setSearchBy(e.target.value); setSearchParam("") }}>
                        <option value="title">Title</option>
                        <option value="year">Year</option>
                        <option value="genre">Genre</option>
                        <option value="person" disabled>Person</option>
                    </select>

                    <input
                        id="header-search"
                        value={searchParam}
                        required
                        onChange={(e) => setSearchParam(e.target.value)}
                        type={searchBy === "year" ? "number" : "text"}
                        placeholder={
                            searchBy === "year" ? "Type any year between 1960-2021"
                                :
                                searchBy === "title" ? "Type any word from a movie title"
                                    :
                                    "Your favorite genre: horror, adventure.. "}
                        min={searchBy === "year" ? "1960" : null}
                        max={searchBy === "year" ? "2021" : null}

                    />
                    <button type="submit">Search</button>
                </form>

                <p>Search Results: {numberOfMovies} </p>
            </div>

            <div className="movie-container">

                {/* {numberOfMovies ?
                    <div className="buttonContainer">
                        {page === 1 ? null : <button className="prev" onClick={handleBackwardButton}> ◀️</button>}

                        {page >= lastPage ? null : <button className="next" onClick={handleForwardButton}> ▶️ </button>}
                    </div>
                    :
                    null
                } */}

                {searchResults ? searchResults.map((item) => (
                    <div
                        className="movieBox"
                        key={item.imdb_id}
                        onClick={() => {
                            console.log(item.imdb_id);
                            setShowMovie(true);
                            setMovieId(item.imdb_id);
                            setMovieCardOn("")
                        }}
                    >
                        <div className="poster">
                            <img src={item.image_url} alt={item.title} />
                        </div>

                        <div className="info">
                            <div>
                                <h3>{item.title} ({item.year}) </h3>
                                <div>Length: {item.movie_length} min | Rating: {item.rating} </div>
                            </div>

                            <div>
                                <h4>Plot</h4>
                                <div>{item.plot}</div>
                            </div>

                            <p> | {item.gen.map(genre => <span key={genre.genre}> {genre.genre} |</span>)} </p>

                        </div>
                    </div>
                ))
                    :
                    null
                }
            </div>

            {showMovie ? <MovieById movieId={movieId} setMovieCardOn={setMovieCardOn} movieCardOn={movieCardOn} setMovieId={setMovieId} /> : null}

        </div>
    )
}

export default SearchMovies
