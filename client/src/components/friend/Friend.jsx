import React from "react";
import "./Friend.scss";

export default function Friend({ friends, isFriend }) {
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
                    </div>

                    {isFriend ? (
                        <button>Add Friend</button>
                    ) : (
                        <button>Remove Friend</button>
                    )}
                </div>
            ))}
        </div>
    );
}
