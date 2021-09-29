import React from 'react';
import './ScrollToTopButton.scss';

function ScrollToTopButton() {
	let scrollToTop = () => {
		return window.scrollTo({
			left: 0,
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className='go-top' onClick={scrollToTop}>
			<i className='fas fa-arrow-up'></i>
		</div>
	);
}

export default ScrollToTopButton;
