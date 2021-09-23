import React, { useState } from "react";
import axiosApiInstance from "../../util/APIinstance";

export default function UpdateForm({
    user,
    setShowUpdateForm,
    setAlertSuccessUpdate,
    getUser,
    setAlertMessage,
}) {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    //const [showMessage, setShowMessage] = useState(false);

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
            //console.log(res.data);
            setShowUpdateForm(false);
            setAlertSuccessUpdate(true);
            setAlertMessage("The user was successfully updated");
            getUser();
            setTimeout(() => {
                setAlertSuccessUpdate(false);
            }, 3000);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
            setAlertSuccessUpdate(true);
            setAlertMessage(error.response.statusText);
        }
    };

    return (
        <section>
            <div className="update-user-form-container">
                <button
                    id="closeCard"
                    onClick={(e) => setShowUpdateForm(false)}
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
        </section>
    );
}
