import React from 'react';

function ListsHeading({ title, numOfMovies }) {
	return (
		<div className='movie-list-heading'>
			<h2>
				{title} ({numOfMovies})
			</h2>
			<p>Search bar here</p>
		</div>
	);
}

export default ListsHeading;
