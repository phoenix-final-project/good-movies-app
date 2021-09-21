import React, { useState, useEffect } from "react";
import axiosApiInstance from "../../util/APIinstance";
import DisplayUser from "./DisplayUser";
import UpdateForm from "./UpdateForm";

// styling
import "./UserProfile.scss";

export default function UserProfile() {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showConfirmDeleteBtn, setShowConfirmDeleteBtn] = useState(false);
    const [alertMessage, setAlertMessage] = useState("hidden");

    // Find one user by username
    const getUser = async () => {
        try {
            const res = await axiosApiInstance.get(
                `/api/user/username/${localStorage.getItem("username")}`
            );
            //console.log(res.data.foundUser);
            console.log(localStorage.getItem("username"));
            setUser(res.data.foundUser);
            //setIsError(false);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
            /* setIsError(true);
            setErrorMessage(error.response.statusText); */
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    // DELETE A USER
    // Confirm if the user want to delete his account
    const askConfirmationDeleteUser = () => {
        setShowConfirmDeleteBtn(true);
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosApiInstance.put("/api/user/delete", {
                userId: localStorage.getItem("user_id"),
            });
            console.log(res.data);
            setAlertMessage("alert-delete-success");
            setShowConfirmDeleteBtn(false);
        } catch (error) {
            console.log("Something went wrong", error.response.statusText);
        }
    };

    const closeDivConfirmDeleteUser = (e) => {
        e.preventDefault();
        setShowConfirmDeleteBtn(false);
    };

    // SHOW UPDATE FORM
    const showForm = () => {
        setShowUpdateForm(true);
    };

    return (
        <div className="user-profile-container">
            <header>
                <h2>My profile</h2>
            </header>

            <main>
                <DisplayUser
                    user={user}
                    /* firstname={firstname}
                lastname={lastname}
                email={email} */
                />

                <div className={alertMessage}>
                    The user was successfully deleted
                </div>

                <div className="btn-profile">
                    <button onClick={showForm}>Edit profile</button>
                    <button onClick={askConfirmationDeleteUser}>
                        Delete user
                    </button>
                </div>
            </main>

            {showUpdateForm ? (
                <UpdateForm setShowUpdateForm={setShowUpdateForm} user={user} />
            ) : null}

            {showConfirmDeleteBtn ? (
                <div className="confirm-delete-div">
                    <p>Are you sure that you want delete your account?</p>
                    <div>
                        <button onClick={handleDeleteUser}>Delete</button>
                        <button onClick={closeDivConfirmDeleteUser}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
