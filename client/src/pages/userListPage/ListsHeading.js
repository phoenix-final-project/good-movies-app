import React from 'react';

function ListsHeading({ title, numOfMovies }) {

	return (
		<div className='movie-list-heading'>
			<h2>
				{title} ({numOfMovies})
			</h2>
		</div>
	);
}

export default ListsHeading;
