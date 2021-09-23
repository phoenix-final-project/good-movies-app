import { useState, useRef } from "react";
import axiosApiInstance from '../../util/APIinstance';

// emojis for comments
import Picker from 'emoji-picker-react';


export default function CreateComment({ movieId, getComments }) {

    const [content, setContent] = useState("");
    const [emojisOn, setEmojisOn] = useState("none");

    // emojis for comments
    const ref = useRef(null);

    const onEmojiClick = (event, emojiObject) => {
        const cursor = ref.current.selectionStart;

        const text =
            content.slice(0, cursor) + emojiObject.emoji + content.slice(cursor);
        setContent(text);
    };

    // Create a new comment
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axiosApiInstance.post(`/api/comments/create/${window.localStorage.getItem("user_id")}/${movieId}`, {
                comment: content,
            })

            if (res.status === 200) {
                // console.log("The comment was successfully added!", content);
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

                <textarea
                    ref={ref}
                    required
                    name='content'
                    type='textarea'
                    value={content}
                    placeholder={window.localStorage.getItem("token") ? "Did you like this movie? Tell the world about it!" : "Please login to add a comment"}
                    disabled={window.localStorage.getItem("token") ? false : true}

                    onChange={(event) => setContent(event.target.value)}
                />

                <button type='submit' className="comment-button" disabled={window.localStorage.getItem("token") ? false : true}>Add a Comment</button>

                <button type="button" className="emoji-button"
                    onClick={emojisOn === "none" ? () => setEmojisOn("show-emojis") : () => setEmojisOn("none")}

                    disabled={window.localStorage.getItem("token") ? false : true}
                ><i className="far fa-smile"></i></button>

                <div className={emojisOn}>
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
            </form>

        </>
    )
}