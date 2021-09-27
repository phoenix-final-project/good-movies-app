import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";
import Friend from "./friend/Friend";

// styling
import "./FriendsPage.scss";

export default function FriendsPage() {
    // State for get user's friends
    const [friends, setFriends] = useState([]);

    // State for search a user
    const [keyword, setKeyword] = useState("");
    const [searchedUser, setSearchedUser] = useState([]);
    const [userFounded, setUserFounded] = useState(false);
    const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);

    // State to handle error
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // get user's friends
    const getFriends = async () => {
        try {
            const res = await axiosApiInstance.get(
                `/api/user/friends/${localStorage.getItem("username")}`
            );
            //console.log(res.data);
            setFriends(res.data);
            //setIsError(false);
        } catch (error) {
            //console.log("Something went wrong", error.response.data.message);
            setIsError(true);
            setErrorMessage(error.response.data.message);
            setTimeout(() => setIsError(false), 3000);
        }
    };

    // Search a user by username, firstname, lastname
    const searchForUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosApiInstance.get(`/api/user/find/${keyword}`);
            //console.log(res.data);
            setSearchedUser(res.data.foundUsers);
            setUserFounded(true);
            setIsAlreadyFriend(true);
            setKeyword("");
        } catch (error) {
            // console.log("Something went wrong", error.response.data.message);
            setIsError(true);
            setErrorMessage(error.response.data.message);
            setKeyword("");

            setTimeout(() => setIsError(false), 3000);
        }
    };

    // Bring back from search's result to list of friends
    const backToFriends = () => {
        setUserFounded(false);
        setIsAlreadyFriend(false);
        getFriends();
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div className="friends-page">
            {/* SEARCHBAR */}
            <form onSubmit={searchForUser} className="form-search-user">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Find a new friend</span>
                </label>
                <input
                    required
                    type="text"
                    id="header-search"
                    placeholder="Find a new friend"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* ALERT MESSAGE */}
            {isError ? (
                <div className="alert-message">{errorMessage}</div>
            ) : null}

            {/* DISPLAY SEARCH RESULTS */}
            {userFounded ? (
                <div className="friends-page-display-box">
                    <h2>Search Results</h2>
                    <Friend
                        searchOrFriends={searchedUser}
                        isFriend={isAlreadyFriend}
                    />
                    <div className="back-friends-div">
                        <button onClick={backToFriends}>
                            Back to my friends
                        </button>
                    </div>
                </div>
            ) : null}

            {/* DISPLAY FRIENDS */}
            {friends.length !== 0 && !userFounded ? (
                <div className="friends-page-display-box">
                    <h2>My Friends</h2>
                    <Friend
                        searchOrFriends={friends}
                        isFriend={isAlreadyFriend}
                    />
                </div>
            ) : null}
        </div>
    );
}
