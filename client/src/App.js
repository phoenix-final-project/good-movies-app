// importing route
import { Switch, Route } from 'react-router-dom';

// importing the components
import NavBar from './components/navigation/NavBar';
// import Footer from "./components/footer/Footer";

// importing pages
import MainPage from './pages/mainPage/MainPage';
import MoviesPage from './pages/moviesPage/MoviesPage';
import RegistrationPage from './pages/registrationPage/RegistrationPage';
import LoginPage from './pages/loginPage/Login';
import UserWishlistPage from './pages/userListPage/UserWishlistPage';
import UserWatchedPage from './pages/userListPage/UserWatchedPage.jsx';
import FriendsPage from './pages/friendsPage/FriendsPage';
import InviteFriendsPage from './pages/inviteFriendsPage/InviteFriendsPage';
import UserProfile from './pages/userProfile/UserProfile';
import ErrorPage from './pages/errorPage/ErrorPage';

// sass styling
import './styles/App.scss';


function App() {
	return (
		<div className='App'>
			<NavBar />

			<Switch>
				<Route exact path='/' component={MainPage} />
				{/* <Route exact path='/public-movies' component={MoviesPageUnprotected} /> */}
				{/* <Route exact path='/protected-movies' component={MoviesPage} /> */}

				<Route exact path='/movies' component={MoviesPage} />

				<Route exact path='/registration' component={RegistrationPage} />
				<Route exact path='/login' component={LoginPage} />
				<Route exact path='/my-list' component={UserWishlistPage} />
				<Route exact path='/watched' component={UserWatchedPage} />
				<Route exact path='/friends' component={FriendsPage} />
				<Route exact path='/invite-friends' component={InviteFriendsPage} />
				<Route exact path='/my-profile' component={UserProfile} />

				<Route component={ErrorPage} />
			</Switch>
			{/*<Footer />*/}
		</div>
	);
}

export default App;
