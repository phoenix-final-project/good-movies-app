import { useState, useEffect } from "react";
import axiosApiInstance from '../../util/APIinstance';
import CreateComment from './CreateComment'

// styling
import './Comments.scss';

export default function Comments({ movieId, commentsOn, setCommentsOn }) {

    const [comments, setComments] = useState([])
    const [commentId, setCommentId] = useState("")

    // get all comments for a movie
    const getComments = async () => {

        try {
            const res = await axiosApiInstance.get(`/api/comments/${movieId}`)

            if (res.status === 200) {
                console.log(res.data);
                setComments(res.data);
            }

        } catch (error) {
            setComments([]);
            console.log("Error on getting comments :", error.response.statusText);
        }
    }

    // delete a comment of logged in user
    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            const res = await axiosApiInstance.put(`/api/comments/delete/${window.localStorage.getItem("user_id")}/${commentId}`)

            if (res.status === 200) {
                // console.log("The comment was successfully deleted");
                getComments()
                setCommentId("")
            }

        } catch (error) {
            console.log("Error on creating a comment :", error.response.data);
        }
    };

    useEffect(() => {
        getComments();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieId])


    return (
        <div className={`comments ${commentsOn}`}>

            <CreateComment movieId={movieId} getComments={getComments} />

            <div className="comments-container">

                {comments.length > 0 ? (
                    comments.map(item => {
                        return (
                            <div key={item._id} onMouseOver={() => setCommentId(item._id)}>
                                <div className="comment-head">
                                    <span>{item.user.username}</span>

                                    <span>{item.date.slice(0, 10)}  {item.date.slice(11, 19)}</span>

                                </div>

                                <div className="comment-body">{item.comment}

                                    {/* trash bin icon for deleting a comment */}
                                    {item.user.username === window.localStorage.getItem("username") ? <button className="delete" onClick={handleDelete}><i className="far fa-trash-alt"></i></button> : null}</div>
                                <br />
                            </div>
                        )
                    })
                ) : <div>No comments for this movie</div>}
            </div>

            <div onClick={() => setCommentsOn('hidden')} className='back'>
                Back to Movie
            </div>
        </div>
    )
}