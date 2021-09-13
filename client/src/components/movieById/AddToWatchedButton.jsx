import React, {useState, useEffect} from 'react'
import axios from '../../util/APIinstance'

function AddToWishlistButton({watchedListMoviesIds, movieId, movie}) {
    const [addedToWatchedList, setAddedToWatchedList] = useState(watchedListMoviesIds.includes(movieId));

    useEffect(() => {
        if(watchedListMoviesIds.includes(movieId)) setAddedToWatchedList(true);
        else if(!watchedListMoviesIds.includes(movieId)) setAddedToWatchedList(false);
    }, [movieId, watchedListMoviesIds]);

    // Sending movie to wishlist in backend
    const addMovieToWatchedList = async () => {
        try {
            const response = await axios.post(`/api/watched/add-movie/${window.localStorage.getItem('user_id')}`, { movie });

            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
        {addedToWatchedList ? <button className='added'> Added </button> : <button onClick={addMovieToWatchedList}> Watched </button>}
        </>
    )
}

export default AddToWishlistButton
