import React from "react";

export default function DisplayUser({ user }) {
    return (
        <div className="display-user-container">
            <div className="avatar">LC</div>
            <p>
                {user.firstname} {user.lastname}
            </p>
        </div>
    );
}
