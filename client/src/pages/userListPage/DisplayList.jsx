import React from 'react'
import "./ListsPage.scss";

function DisplayList({ movieList, deleteMovie, addMovieToAnotherList }) {
    return (
        <div className='movie-list'>
            {movieList.map((movie) => (
                <div key={movie.imdb_id} className='individual-movie-section'>
                    <section>
                        <div className='poster'>
                            <img src={movie.image_url} alt={movie.title} />
                        </div>
                    </section>

                    <section>
                        <p>Title: <span>{movie.title}</span></p>
                        <p>Year: <span>{movie.year}</span></p>
                        { movie.movie_length !== 0 && <p>Length: <span>{movie.movie_length}</span></p>}
                        {movie.rating !== 0 && <p>Rating: <span>{movie.rating}</span></p>}
                        <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer noopener">IMDb</a>
                    </section>

                    <section>
                        <div>
                            <h4>Plot</h4>
                            <p>{movie.plot}</p>
                        </div>
                        <div>
                            {movie.gen.map(gen => <span key={gen.id}>{gen.genre}</span>)}
                        </div>
                    </section>

                    <section>
                        <button onClick={() => deleteMovie(movie.imdb_id)}>Delete</button>
                        
                        <button onClick={() => addMovieToAnotherList(movie)}>Watched</button>

                        <button>Favorite</button>
                    </section>
                </div>
            ))}
            </div>
    )
}

export default DisplayList
