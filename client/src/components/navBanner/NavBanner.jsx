import React from 'react';

// importing Link
import { Link } from 'react-router-dom';

// logo
import myLogo from '../../icons/CINEFILO.png';
import Notification from '../navigation/Notification';

// styling
import './NavBanner.scss';

export default function NavBanner({ children }) {
	let [isOpen, setIsOpen] = React.useState(true);

	return (
		<React.Fragment>
			<nav className='nav'>

				<div className='header-container'>

					{window.localStorage.getItem("username") ?
						<div className="tablet-notification" >
							<Notification />
						</div>
						:
						null
					}

					<Link to='/' className='link-logo' title='Home page'>
						<div className='logo'>
							<img className='img-logo' src={myLogo} alt='logo' />
						</div>
					</Link>

					<div className='container-button' id={isOpen ? 'hidden' : ''} onClick={() => setIsOpen(!isOpen)}>
						{children}
					</div>


					<div className='nav-close' id={isOpen ? 'hidden' : ''} onClick={() => setIsOpen(!isOpen)}>
						✕
					</div>

					<div className='nav-toggle' onClick={() => setIsOpen(!isOpen)}>
						<i className='fas fa-bars' id={isOpen ? '' : 'hidden'}></i>
					</div>
				</div>

			</nav>
		</React.Fragment>
	);
}
