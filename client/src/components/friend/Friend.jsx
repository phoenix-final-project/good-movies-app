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
            {/* STRUCTURE FOR LIST OF FRIENDS OR SEARCH RESULTS (FriendsPage)*/}
            <section className="friends-box">
                {searchOrFriends.map((item) => (
                    <div key={item.username} className="one-friend-box">
                        <div className="friend-data">
                            <div className="friend-data-1st-box">
                                <div className="avatar">{item.avatar}</div>

                                <div className="friend-name">
                                    <p>
                                        {item.firstname} {item.lastname}
                                    </p>
                                    <p>{item.username}</p>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            {listFriends.some(
                                (friend) => friend.username === item.username
                            ) ? (
                                <div className="friend-buttons-div">
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
            </section>

            {/* DISPLAY MOVIES IN COMMON */}
            {isMovieInCommon ? (
                <section className="common-movies-card">
                    <h3>
                        Movies in common with{" "}
                        <span>
                            {friendFirstname} {friendLastname}
                        </span>
                    </h3>

                    {commonWishlist.map((movie) => (
                        <div key={movie.imdb_id} className="one-movie-box">
                            <div className="one-movie-box-data">
                                <img src={movie.image_url} alt="" />

                                <div className="movie-data">
                                    <p>
                                        Title: <span>{movie.title}</span>
                                    </p>
                                    <p>
                                        Year: <span>{movie.year}</span>
                                    </p>
                                    {movie.movie_length !== 0 && (
                                        <p>
                                            Length:{" "}
                                            <span>{movie.movie_length}</span>
                                        </p>
                                    )}

                                    <p>
                                        Rating: <span>{movie.rating}</span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <button>Invite to watch</button>
                            </div>
                        </div>
                    ))}
                </section>
            ) : null}
        </div>
    );
}
