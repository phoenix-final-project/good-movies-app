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
    const [showAlertMessage, setShowAlertMessage] = useState("hidden");
    const [alertMessage, setAlertMessage] = useState("hidden");
    const [alertSuccessUpdate, setAlertSuccessUpdate] = useState(false);

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
    // First confirm if the user want to delete his account
    const askConfirmationDeleteUser = () => {
        setShowConfirmDeleteBtn(true);
    };
    //Then delete the user
    const handleDeleteUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosApiInstance.put("/api/user/delete", {
                userId: localStorage.getItem("user_id"),
            });
            console.log(res.data);
            setShowAlertMessage("alert-delete-success");
            setAlertMessage(res.data.message);
            setShowConfirmDeleteBtn(false);

            // Logout and redirection after delete user
            setTimeout(() => {
                window.localStorage.clear();
                window.location.href = "/";
            }, 3000);
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
                {/* DISPLAY USER */}
                <DisplayUser user={user} />

                {/* ALERT MESSAGES */}
                <div className={showAlertMessage}>
                    The user was successfully deleted
                </div>

                {alertSuccessUpdate ? (
                    <div className="alert-delete-success">
                        The user was successfully updated
                    </div>
                ) : null}

                {/* MAIN BUTTONS USER PROFILE */}
                <div className="btn-profile">
                    <button onClick={showForm}>Edit profile</button>
                    <button onClick={askConfirmationDeleteUser}>
                        Delete user
                    </button>
                </div>
            </main>

            {/* UPDATE USER FORM */}
            {showUpdateForm ? (
                <UpdateForm
                    setShowUpdateForm={setShowUpdateForm}
                    user={user}
                    setAlertSuccessUpdate={setAlertSuccessUpdate}
                    getUser={getUser}
                    setAlertMessage={setAlertMessage}
                />
            ) : null}

            {/* ASK FOR CONFIRMATION BEFORE DELETE USER */}
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
