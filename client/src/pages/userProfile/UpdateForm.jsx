import React, { useState } from "react";
import axiosApiInstance from "../../util/APIinstance";

export default function UpdateForm({
    user,
    setShowUpdateForm,
    setAlertSuccessUpdate,
    getUser,
}) {
    const [username, setUsername] = useState(user.username);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");

    const [errorMessageDatabase, setErrorMessageDatabase] = useState("");
    const [alertMessageError, setAlertMessageError] = useState("hidden");

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
            getUser();

            setTimeout(() => {
                setAlertSuccessUpdate(false);
            }, 3000);

        } catch (error) {
            if (error.response.data.message) {
                setErrorMessageDatabase(error.response.data.message)
            };

            if (error.response.data.error) {
                setErrorMessageDatabase(error.response.data.error.errors[0].msg)
            };

            setAlertMessageError('error');
            e.target.reset();

            setTimeout(() => {
                setAlertMessageError('hidden');
            }, 3000);
            
            // console.log("Something went wrong", error.response.statusText);
            // setAlertSuccessUpdate(true);
            // setAlertMessage(error.response.statusText);
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
                <div className={alertMessageError}>{errorMessageDatabase}</div>
                <br />
                <form onSubmit={updateUser} className="form-search-user">
                    
                    <label /* htmlFor="header-search" */>
                        <span className="visually-hidden">First Name *</span>
                    </label>
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <label /* htmlFor="header-search" */>
                        <span className="visually-hidden">Last Name *</span>
                    </label>
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <label /* htmlFor="header-search" */>
                        <span className="visually-hidden">Email *</span>
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label /* htmlFor="header-search" */>
                        <span className="visually-hidden">Password *</span>
                    </label>
                    <input
                        type="password"
                        placeholder="******"
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