import React, { useEffect, useState } from "react";
import axiosApiInstance from "../../util/APIinstance";

import "./Friend.scss";

export default function Friend({ friends, isFriend, searchedUser }) {
    const [listFriends, setListFriends] = useState([]);
    const [commonWishlist, setCommonWishlist] = useState([]);

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
            console.log(res.data);
            setCommonWishlist(res.data);
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
        <div className="friends-box">
            {friends.map((item) => (
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
                                    onClick={() => deleteFriend(item.username)}
                                >
                                    Remove Friend
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => addFriend(item.username)}>
                                Add Friend
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
