import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";
import Friend from "../../components/friend/Friend";
import { Alert } from "@material-ui/lab";

// styling
import "./FriendsPage.scss";
///api/user/friends/santa

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
            console.log(res.data);
            setFriends(res.data);
            //setIsError(false);
        } catch (error) {
            //console.log("Something went wrong", error.response.statusText);
            /* setIsError(true);
            setErrorMessage(error.response.statusText); */
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
            console.log("Something went wrong", error.response.data.message);
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
        <React.Fragment>
            <h1>Hello from friends page</h1>

            <form onSubmit={searchForUser}>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Find a friend</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Find a friend"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/*  {isError ? <Alert severity="warning">{errorMessage}</Alert> : null} */}

            {userFounded ? (
                <div>
                    <h3>Search Results</h3>
                    <Friend
                        searchOrFriends={searchedUser}
                        isFriend={isAlreadyFriend}
                    />
                    <button onClick={backToFriends}>Back to my friends</button>
                </div>
            ) : null}

            {friends.length !== 0 && !userFounded ? (
                <div>
                    <h3>My Friends</h3>
                    <Friend
                        searchOrFriends={friends}
                        isFriend={isAlreadyFriend}
                    />
                </div>
            ) : null}
        </React.Fragment>
    );
}
