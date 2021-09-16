import React, { useState } from "react";
import axiosApiInstance from "../../util/APIinstance";

export default function UpdateForm({ user }) {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");

    // Update user
    const updateUser = async () => {
        try {
            const res = await axiosApiInstance.post(
                `/api/update/${localStorage.getItem("username")}`,
                {
                    firstname: firstname,
                    lastname: lastname,
                    password: password,
                    email: email,
                }
            );
            console.log(res.data);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
        }
    };

    const handleUpdateUser = () => {};
    return (
        <div>
            <form onSubmit={updateUser} className="form-search-user">
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">First Name</span>
                </label>
                <input
                    type="text"
                    //id="header-search"
                    //placeholder="Find a friend"
                    value={user.firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">Last Name</span>
                </label>
                <input
                    type="text"
                    //id="header-search"
                    //placeholder="Find a friend"
                    value={user.lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">Email</span>
                </label>
                <input
                    type="email"
                    //id="header-search"
                    //placeholder="Find a friend"
                    value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">Password</span>
                </label>
                <input
                    type="password"
                    //id="header-search"
                    placeholder="Password"
                    //value={user.email}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
