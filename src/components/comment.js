import axios from 'axios';
import React, { useMemo, useState } from 'react';
import Reply from './reply';
function Comment({content, deleteComment, user, replies, fetchPosts}) {
    
    const [replying, setReplying] = useState(false);
    const [thoughts, setThoughts] = useState('');
    const [submitText, setSubmitText] = useState('Send');

    const handleInput = e => setThoughts(e.target.value);

    const contentReplies = useMemo(() => {
        let result = [];
        result = replies.filter(r => {
            return r.comment_id == content.id
        });
        return result;
    }, [content, replies]);

    const timeStamp = useMemo(() => {
        let date = Date.parse(content.created_at);
        var seconds = Math.floor((new Date() - date) / 1000);
    
        var interval = seconds / 31536000;
    
        if (interval > 1) {
          return Math.floor(interval) != 1
            ? Math.floor(interval) + " years"
            : Math.floor(interval) + " year";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) != 1
            ? Math.floor(interval) + " months"
            : Math.floor(interval) + " month";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) != 1
            ? Math.floor(interval) + " days"
            : Math.floor(interval) + " day";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) != 1
            ? Math.floor(interval) + " hours"
            : Math.floor(interval) + " hour";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) != 1
            ? Math.floor(interval) + " minutes"
            : Math.floor(interval) + " minute";
        }
        return Math.floor(seconds) != 1
          ? Math.floor(seconds) + " seconds"
          : Math.floor(seconds) + " second";
    }, [content]);

    const sevenDaysActive = useMemo(() => {
        if ((new Date().getTime() - new Date(user.created_at).getTime()) >= 604800000) {
            return true;
        } else {
            return false
        }
    }, [user]);

    const handleReply = () => {
        setSubmitText('...');
        axios.post('https://tests.tee-solutions.com/api/storereply', {
            body: thoughts,
            comment_id: content.id,
            user_id: user.id
        })
        .then(() => {
            alert('Reply saved succesfully');
            setThoughts('');
            fetchPosts();
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {
            setSubmitText('Send');
        })
    }

    return (
        <div>
            <div className="top mt-2">
                <div className="profile-set">
                    <div className="d-flex">
                        <div className="profile"></div>
                        <div>
                            <span>
                                {
                                    user.id == content.user_id ? 'You' : 'Anon.'
                                }
                            </span><br />
                            <span>{timeStamp} ago</span>
                        </div>
                    </div>
                    {
                        user.id == content.user_id
                        ?
                        <div className="dropdowndot">
                            <i className="fa-solid fa-ellipsis dropbtndot"></i>
                            <span onClick={() => deleteComment(content.id)} className="dropdown-contentdot">Delete</span>
                        </div>
                        :
                        null
                    }
                </div>
            </div><br />
            <div>
                <p>{ content.body }</p>
            </div>
            <div className="actions">
                <div>
                    <i className="fa-regular fa-heart m-1"> </i><i
                        className="m-1 fa-solid fa-up-long"></i>
                    <span>1k</span>
                </div>
                <div>
                    <i className="fas fa-comment"></i> <span>Hide replies</span>
                </div>
                {
                    sevenDaysActive
                    ?
                    <div>
                        <span onClick={ () => setReplying(true) } style={ { cursor: 'pointer' } }>{ replying ? null : 'Reply' }</span>
                    </div>
                    :
                    null
                }
            </div>
            {
                replying
                ?
                <div>
                    {
                        sevenDaysActive
                        ?
                        <form className="mt-2">
                            <div className="form-group">
                                <input value={thoughts} style={ {width:'350px',border:'none'} } onChange={handleInput} autoComplete="off"
                                    className="form-control mb-2" placeholder="Send a reply" id="message"
                                    required />
                            </div>
                            <div className="send" id="send">
                                <div className="text">
                                    <i className="fa-solid fa-bold"></i>
                                    <i className="fa-solid fa-italic"></i>
                                </div>
                                <div className="btn">
                                    <a href="javascript:void(0);" onClick={ () => setReplying(false) }>Cancel</a>
                                    <button onClick={thoughts.length >= 1 ? handleReply : null} type="button" className="send-btn">{submitText}</button>
                                </div>
                            </div>
                        </form>
                        :
                        null
                    }
                </div>
                :
                null
            }
            {
                contentReplies.length
                ?
                <div className="replies">
                    {
                        contentReplies.map(reply => <Reply key={reply.id} reply={reply} user={user} fetchPosts={fetchPosts} />)
                    }
                </div>
                :
                null
            }
            <hr />
        </div>
    );
}

export default Comment;