import React, { useState } from "react";
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
    // const [numberOfPages, setNumberOfPages] = useState();
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState();
    const [numberOfMovies, setNumberOfMovies] = useState(0);

    const [movieCardOn, setMovieCardOn] = useState("")

    // const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Search movies by title and searchParam ("london" for example)
    const getMoviesBySearchParam = async (e) => {

        e.preventDefault();

        setPage(1)

        try {
            let res = await axiosApiInstance.get(`/api/movie/${searchBy}/${searchParam}/1`);

            // if (res.status === 200) {
            // console.log(res.data.numberOfMovies, res.data.foundMovies);
            setSearchResults(res.data.foundMovies);
            setNumberOfMovies(res.data.numberOfMovies)
            setLastPage(res.data.numberOfPages)
            // }
        } catch (error) {
            console.log("Something went wrong:", error.response.data.message);
            // setIsError(true);
            setSearchResults([])
            setNumberOfMovies(0)
            setErrorMessage(error.response.data.message);
        }
    }

    // Pagination
    // FORWARD
    const handleForwardButton = async () => {

        try {
            if (lastPage > page) {
                setPage(page + 1);
            } else {
                return
            }

            let res = await axiosApiInstance.get(`/api/movie/${searchBy}/${searchParam}/${page + 1}`);

            // if (res.status === 200) {
            // console.log(res.data.numberOfMovies, res.data.foundMovies);
            setSearchResults(res.data.foundMovies);
            setNumberOfMovies(res.data.numberOfMovies)
            //setLastPage(res.data.numberOfPages)
            // console.log(page, lastPage);

            // }
        } catch (error) {
            console.log("Something went wrong:", error.response.data.message);
            // setIsError(true);
            setSearchResults([])
            setNumberOfMovies(0)
            setErrorMessage(error.response.data.message);
        }
    };

    // BACKWARD
    const handleBackwardButton = async () => {

        try {

            let res = await axiosApiInstance.get(`/api/movie/${searchBy}/${searchParam}/${page - 1}`);

            // if (res.status === 200) {
            setSearchResults(res.data.foundMovies);
            setNumberOfMovies(res.data.numberOfMovies)
            setLastPage(res.data.numberOfPages)
            setPage(page - 1);

            // }
        } catch (error) {
            console.log("Something went wrong:", error.response.data.message);
            // setIsError(true);
            setSearchResults([])
            setNumberOfMovies(0)
            setErrorMessage(error.response.data.message);
        }
    };


    return (
        <div>
            <div className='search-container'>
                <div className="search" >

                    <form onSubmit={getMoviesBySearchParam}>

                        <select name="search" id="search" onChange={(e) => { setSearchBy(e.target.value); setSearchParam("") }}>
                            <option value="title">Title</option>
                            <option value="year">Year</option>
                            <option value="genre">Genre</option>
                            <option value="director">Director</option>
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
                                        searchBy === "genre" ? "Your favorite genre: horror, adventure.. "
                                            : "Full name, e.g. James Cameron"}
                            min={searchBy === "year" ? "1960" : null}
                            max={searchBy === "year" ? "2021" : null}

                            // Checking if the user inserted min 2 words for Director search
                            pattern={searchBy === "director" ? "([A-Za-zÀ-ÖØ-öø-ÿ]+\\s){1,}([A-Za-zÀ-ÖØ-öø-ÿ]+)" : null}

                            title={searchBy === "director" ? "Minimum 2 words are required - name surname, separated by a single space" : null}
                        />

                        <span
                            className="clear"
                            title="Clear all search results"
                            onClick={() => {
                                setSearchParam("");
                                setSearchResults([]);
                                setPage(0);
                                setLastPage(0);
                                setNumberOfMovies(0)
                            }}> ✕ </span>

                        <button type="submit">Search</button>
                    </form>

                    <p>Search Results: {numberOfMovies} </p>
                </div>

                {/* Forward - Backward Button for Search Results */}
                {numberOfMovies ?
                    <div>
                        <div style={{ textAlign: "center" }}>Page : {page} / {lastPage}</div>

                        <div className="buttonContainerSearch">
                            {page === 1 ? null : <button className="prev" onClick={handleBackwardButton}>❮ Previous</button>}

                            {page >= lastPage ? null : <button className="next" onClick={handleForwardButton}>Next ❯</button>}
                        </div>
                    </div> : null
                }
            </div>

            <div className="movie-container">

                {searchResults ? searchResults.map((item) => (
                    <div className="movieBox" key={item.imdb_id} onClick={() => {
                        // console.log(item.imdb_id);
                        setShowMovie(true);
                        setMovieId(item.imdb_id);
                        setMovieCardOn("")
                    }}>
                        <div className="poster">
                            <img src={item.image_url !== "aa.com" ?
                                item.image_url :
                                "../../images/poster_blank.png"} alt={item.title} />
                        </div>

                        <div className="info">
                            <div>
                                <h3 className='poster-title'>{item.title} ({item.year}) </h3>
                                <div>Length: {item.movie_length} min | Rating: {item.rating} </div>
                            </div>

                            <div>
                                <h4>Plot</h4>
                                <div>{item.plot}</div>
                            </div>

                            {/* Adding DIRECTOR for "director" search only */}
                            {item.director ? <div>Director: <span className="director">{item.director}</span></div> : null}


                            <p> | {item.gen.map(genre => <span key={genre.genre}> {genre.genre} |</span>)} </p>

                        </div>
                    </div>
                ))
                    :
                    null
                }
            </div>

            {/* Forward - Backward Button for Search Results */}
            {numberOfMovies ?
                <div>
                    <div style={{ textAlign: "center" }}>Page : {page} / {lastPage}</div>

                    <div className="buttonContainerSearch">
                        {page === 1 ? null : <button className="prev" onClick={handleBackwardButton}>❮ Previous</button>}

                        {page >= lastPage ? null : <button className="next" onClick={handleForwardButton}>Next ❯</button>}
                    </div>
                </div> : null
            }

            {showMovie ? <MovieById movieId={movieId} setMovieCardOn={setMovieCardOn} movieCardOn={movieCardOn} setMovieId={setMovieId} /> : null}
        </div>
    )
}

export default SearchMovies
