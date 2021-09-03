import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";
import { useSelector } from "react-redux";

export default function MovieById({ movieId }) {
    // receiving data from the store
    const movies = useSelector((state) => state);
    console.log(movies);

    const [movie, setMovie] = useState({});

    // fetching data from backend (movieById)
    useEffect(() => {
        getMovieById();
    }, []);

    async function getMovieById() {
        try {
            let res = await axiosApiInstance.get(
                `/api/movie/oneMovieById/${movieId}`
            );

            if (res.status === 200) {
                console.log(res.data);
                setMovie(res.data);
            }
        } catch (error) {
            console.log("Something went wrong", error.message);
        }
    }
    return (
        <div>
            <h2>Movie By Id {movieId}</h2>
            <p>{movie.title}</p>
        </div>
    );
}
