import React, { useState } from "react";
import axiosApiInstance from "../../util/APIinstance";
import { usePagination } from '@material-ui/lab/Pagination';

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
    const [numberOfMovies, setNumberOfMovies] = useState(0);


    // const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    // Search movies by title and searchParam ("london" for example)
    const getMoviesBySearchParam = async (e) => {
        e.preventDefault();

        try {
            let res = await axiosApiInstance.get(`/api/movie/${searchBy}/${searchParam}`);
            // console.log(res.data);

            if (res.status === 200) {
                console.log(res.data.numberOfMovies, res.data.foundMovies);
                setSearchResults(res.data.foundMovies);
                setNumberOfMovies(res.data.numberOfMovies)
                // setLastPage1(res.data.numberOfPages)
            }
        } catch (error) {
            console.log("Something went wrong:", error.response.data.message);
            // setIsError(true);
            setSearchResults([])
            setNumberOfMovies(0)
            setErrorMessage(error.response.data.message);
        }
    }

    return (
        <div>
            <form className="search" onSubmit={getMoviesBySearchParam}>
                <label htmlFor="header-search">
                    <span className="">Find a movie</span>
                </label>

                <select name="search" id="search" onChange={(e) => setSearchBy(e.target.value)}>

                    {/* <option>Search by...</option> */}
                    <option value="title">Title</option>
                    <option value="year">Year</option>
                    <option value="genre">Genre</option>
                    <option value="person" disabled>Person</option>
                </select>


                <input
                    type="text"
                    id="header-search"
                    placeholder="Find a movie"
                    value={searchParam}
                    required
                    onChange={(e) => setSearchParam(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="movie-container">

                {/* {searchResults.length ? */}
                    <div>Search Results: {numberOfMovies} </div>
                    {/* :
                    null} */}

                {searchResults ? searchResults.map((item) => (
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
                    ))
                    :
                    null
                }
            </div>

            {showMovie ? <MovieById movieId={movieId} /> : null}


        </div>
    )
}

export default SearchMovies
