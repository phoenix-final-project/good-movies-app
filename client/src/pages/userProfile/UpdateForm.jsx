import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";

export default function UpdateForm({ user, setShowUpdateForm }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Update user
    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosApiInstance.put(`/api/user/update`, {
                username: localStorage.getItem("username"),
                firstname: firstname,
                lastname: lastname,
                password: password,
                email: email,
            });
            console.log(res.data);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
        }
    };

    useEffect(() => {
        //console.log(user);
        //setFirstname(user.firstname);
    }, [user]);

    //const handleUpdateUser = () => {};
    return (
        <div className="update-user-form-container">
            <button
                id="closeCard"
                onClick={(e) => setShowUpdateForm(false)}
                //onClick={(e) => setShowMoviesInCommon("hidden")}
            >
                ✕
            </button>

            <h2>Edit profile</h2>
            <form onSubmit={updateUser} className="form-search-user">
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">First Name</span>
                </label>
                <input
                    type="text"
                    //id="header-search"
                    //placeholder="Find a friend"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">Last Name</span>
                </label>
                <input
                    type="text"
                    //id="header-search"
                    //placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label /* htmlFor="header-search" */>
                    <span className="visually-hidden">Email</span>
                </label>
                <input
                    type="email"
                    //id="header-search"
                    //placeholder="Find a friend"
                    value={email}
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
                <div className="btn-form">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}
