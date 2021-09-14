import React, { useEffect, useState } from "react";
import axiosApiInstance from "../../util/APIinstance";

import "./Friend.scss";

export default function Friend({ searchOrFriends }) {
    const [listFriends, setListFriends] = useState([]);
    const [commonWishlist, setCommonWishlist] = useState([]);
    const [isMovieInCommon, setIsMovieInCommon] = useState(false);
    //const [friendUsername, setFriendUsername] = useState("");
    const [friendFirstname, setFriendFirstname] = useState("");
    const [friendLastname, setFriendLastname] = useState("");

    // Add a friend
    const addFriend = async (username) => {
        try {
            const res = await axiosApiInstance.put("/api/user/friends/add", {
                //username: "santa",
                username: localStorage.getItem("username"),
                friendUsername: username,
            });
            console.log(res.data);
            getFriends();
        } catch (error) {
            console.log("Something went wrong", error.message);
        }
    };

    // Delete a friend
    const deleteFriend = async (username) => {
        try {
            const res = await axiosApiInstance.put(`/api/user/friends/delete`, {
                username: localStorage.getItem("username"),
                friendUsername: username,
            });
            console.log(res.data);
            getFriends();
        } catch (error) {
            console.log("Something went wrong", error.response.data.message);
        }
    };

    // Compare wishlist
    const compareWishlist = async (friendId) => {
        try {
            const res = await axiosApiInstance.get(
                `http://localhost:5000/api/wishlist/compare/${localStorage.getItem(
                    "user_id"
                )}/${friendId}`
            );
            //console.log(res.data);

            const friendTarget = listFriends.find(
                (friend) => friend.id === res.data.friendUserId
            );
            //console.log(friendTarget);

            setCommonWishlist(res.data.moviesInCommon);
            setIsMovieInCommon(true);
            setFriendFirstname(friendTarget.firstname);
            setFriendLastname(friendTarget.lastname);
        } catch (error) {
            console.log("Something went wrong", error.response.data.error);
        }
    };

    // Get the list of friends
    const getFriends = async () => {
        try {
            const res = await axiosApiInstance.get(
                `/api/user/friends/${localStorage.getItem("username")}`
            );
            console.log(res.data);
            setListFriends(res.data);
        } catch (error) {
            console.log("Something went wrong", error.response.data.error);
        }
    };

    useEffect(() => {
        getFriends();
    }, []);

    return (
        <div>
            <div className="friends-box">
                {searchOrFriends.map((item) => (
                    <div key={item.username} className="one-friend-box">
                        <div className="friend-data">
                            <div className="avatar">{item.avatar}</div>

                            <div>
                                <p>
                                    {item.firstname} {item.lastname}
                                </p>
                                <p>{item.username}</p>
                            </div>

                            {listFriends.some(
                                (friend) => friend.username === item.username
                            ) ? (
                                <div>
                                    <button
                                        onClick={() => compareWishlist(item.id)}
                                    >
                                        Compare wishlist
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteFriend(item.username)
                                        }
                                    >
                                        Remove Friend
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => addFriend(item.username)}
                                >
                                    Add Friend
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {isMovieInCommon ? (
                <div className="common-movies-box">
                    <h3>
                        Movies in common with {friendFirstname} {friendLastname}
                    </h3>
                    <div>
                        {commonWishlist.map((movie) => (
                            <div key={movie.imdb_id} className="one-movie-box">
                                <img src={movie.image_url} alt="" />
                                <h5>{movie.title}</h5>
                                <p>{movie.year}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
