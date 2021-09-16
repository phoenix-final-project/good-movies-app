import React, { useState, useEffect } from "react";

export default function DisplayUser({ firstname, lastname, email }) {
    return (
        <div className="display-user-container">
            <div className="avatar">LC</div>
            <p>{firstname}</p>
        </div>
    );
}
