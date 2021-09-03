import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

// styling
import "./MoviesPage.scss";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // getting the date from backend (upcoming movies)
    useEffect(() => {
        getUpcomingMovies();
    }, []);

    async function getUpcomingMovies() {
        try {
            let res = await axiosApiInstance.get("/api/movie/upcoming");
            let movieArray = [];

            if (res.status === 200) {
                console.log(res.data);
                res.data.forEach((element) => {
                    let movie = element[Object.keys(element)[0]];
                    movieArray.push(movie);
                });
                setMovies(movieArray);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
            setIsError(true);
            setErrorMessage(error.message);
        }
    }

    return (
        <React.Fragment>
            <h1>Hello from movies page</h1>
            {movies.map((item) => (
                <div key={item.imdb_id}>
                    <p>{item.title}</p>
                    <p>{item.year}</p>
                    <img src={item.image_url} alt="" />
                    <a href={item.trailer}>Trailer</a>
                    <p>{item.plot}</p>
                </div>
            ))}
        </React.Fragment>
    );
}
