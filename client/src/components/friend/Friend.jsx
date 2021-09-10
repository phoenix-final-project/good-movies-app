import React, { useEffect, useState } from "react";
import axiosApiInstance from "../../util/APIinstance";

import "./Friend.scss";

export default function Friend({ friends, isFriend, searchedUser }) {
    const [listFriends, setListFriends] = useState([]);
    const [userWishlist, setUserWishlist] = useState([]);

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
            const res = await axiosApiInstance.put("/api/user/friends/delete", {
                username: "santa",
                friendUsername: username,
            });
            console.log(res.data);
            getFriends();
        } catch (error) {
            console.log("Something went wrong", error.response.data.message);
        }
    };

    // Compare wishlist
    const compareWishlist = () => {
        console.log(userWishlist);
    };

    // Get the list of friends
    const getFriends = async () => {
        try {
            //const res = await axiosApiInstance.get(`/api/user/friends/${}`);
            const res = await axiosApiInstance.get("/api/user/friends/santa");
            console.log(res.data);
            setListFriends(res.data);
            //setIsError(false);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
            // setIsError(true);
            // setErrorMessage(error.response.statusText);
        }
    };

    // Get user wishlist
    const getUserWishlist = async () => {
        try {
            const res = await axiosApiInstance.get(
                "/api/wishlist/61376a92dec13afb277dc9e6"
            );
            //console.log(res.data);
            setUserWishlist(res.data);
            //setIsError(false);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
            // setIsError(true);
            // setErrorMessage(error.response.statusText);
        }
    };

    useEffect(() => {
        getFriends();
        getUserWishlist();
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
                                    onClick={() =>
                                        compareWishlist(item.wishlist)
                                    }
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
