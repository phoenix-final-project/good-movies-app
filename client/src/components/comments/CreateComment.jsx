import { useState } from "react";
import axiosApiInstance from '../../util/APIinstance';


export default function CreateComment({ movieId, getComments }) {

    const [content, setContent] = useState("");

    // Create a new comment
    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log(content);

        try {
            const res = await axiosApiInstance.post(`/api/comments/create/${window.localStorage.getItem("user_id")}/${movieId}`, {
                comment: content,
            })

            if (res.status === 200) {
                console.log("The comment was successfully added!", content);
                setContent("")
                getComments()
            }

        } catch (error) {
            console.log("Error on creating a comment :", error.response.data);
        }
    };


    return (
        <>
            {/* Form for creating a new comment */}
            <form onSubmit={handleSubmit} className="create-comment">
                {/* <details>
                    <summary>Add a comment (click to open the form)</summary> */}

                <textarea
                    required
                    name='content'
                    type='textarea'
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder={window.localStorage.getItem("token") ? "Did you like this movie? Tell the world about it!" : "Please login to add a comment"}
                    disabled={window.localStorage.getItem("token") ? false : true}
                />

                <button type='submit' disabled={window.localStorage.getItem("token") ? false : true}>Add a Comment</button>
                {/* </details> */}
            </form>
        </>
    )
}