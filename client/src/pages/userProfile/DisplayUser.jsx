import React from "react";

export default function DisplayUser({ user }) {
    return (
        <div className="display-user-container">
            <div
                className={`avatar ${user.avatarColor === "" && "fixedColor"}`}
                style={{
                    backgroundColor: user.avatarColor,
                }}
            >
                {user.avatar}
            </div>
            <div>
                <h2>
                    {user.firstname} {user.lastname}
                </h2>
                <h4>@{user.username}</h4>
            </div>
        </div>
    );
}
