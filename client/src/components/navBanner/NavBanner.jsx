import React from 'react';

// importing Link
import { Link } from 'react-router-dom';

// logo
import myLogo from '../../icons/CINÉ.png';

// styling
import './NavBanner.scss';

export default function NavBanner({ children }) {
	let [isOpen, setIsOpen] = React.useState(true);

	return (
		<React.Fragment>
			<nav className='nav' id={isOpen ? 'radius' : ''}>
				<div className='header-container'>
					<Link to='/' className='link-logo' title='Home page'>
						<div className='logo'>
							<img className='img-logo' src={myLogo} alt='logo' />
						</div>
					</Link>
					<div className='container-button' id={isOpen ? 'hidden' : ''} onClick={() => setIsOpen(!isOpen)}>
						{children}
					</div>

					<div className='nav-close' id={isOpen ? 'hidden' : ''} onClick={() => setIsOpen(!isOpen)}>
						x
					</div>
					<div className='nav-toggle' onClick={() => setIsOpen(!isOpen)}>
						<i className='fas fa-bars' id={isOpen ? '' : 'hidden'}></i>
					</div>
				</div>
			</nav>
		</React.Fragment>
	);
}
