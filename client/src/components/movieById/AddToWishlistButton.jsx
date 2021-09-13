import React, {useState, useEffect} from 'react'
import axios from '../../util/APIinstance'

function AddToWishlistButton({wishlistMoviesIds, movieId, movie}) {
    const [addedToWishlist, setAddedToWishlist] = useState(wishlistMoviesIds.includes(movieId));

    useEffect(() => {
        if(wishlistMoviesIds.includes(movieId)) setAddedToWishlist(true);
        else if(!wishlistMoviesIds.includes(movieId)) setAddedToWishlist(false);
    }, [movieId, wishlistMoviesIds]);

    // Sending movie to wishlist in backend
    const addMovieToWishList = async () => {
        try {
            const res = await axios.post(`/api/wishlist/add-movie/${window.localStorage.getItem('user_id')}`, { movie });

            console.log(res.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <>
            {addedToWishlist ? <button className='added'> Added </button> : <button onClick={addMovieToWishList}> Wishlist </button>}
        </>
    )
}

export default AddToWishlistButton
