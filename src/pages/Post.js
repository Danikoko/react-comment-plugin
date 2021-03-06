import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Comment from '../components/comment';

function Post({setUser, user}) {
    const [comments, setComments] = useState([]);
    const [replies, setReplies] = useState([]);
    const [post, setPost] = useState({});
    const [thoughts, setThoughts] = useState('');
    const [submitText, setSubmitText] = useState('Send');

    const handleInput = e => setThoughts(e.target.value);
    const handleCancel = () => setThoughts('');

    const handleDelete = (id) => {
        axios.post('https://tests.tee-solutions.com/api/deletecomment', {
            id
        })
        .then(() => {
            alert('Deleted succesfully');
            fetchPosts();
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {
            //
        })
    }

    const fetchPosts = () => {
        axios.post('https://tests.tee-solutions.com/api/fetchposts')
        .then(response => {
            setPost(response.data.posts[0]);
            setComments(response.data.comments);
            setReplies(response.data.replies);
        })
        .catch(error => {
            console.log(error)
        })
        .then(() => {
            //
        })
    }

    const handleSubmit = () => {
        setSubmitText('...');
        axios.post('https://tests.tee-solutions.com/api/storecomment', {
            body: thoughts,
            post_id: post.id,
            user_id: user.id
        })
        .then(() => {
            alert('Saved succesfully');
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

    const postComments = useMemo(() => {
        let result = comments.filter(c => c.post_id == post.id)
        return result;
    }, [post, comments]);

    const sevenDaysActive = useMemo(() => {
        if ((new Date().getTime() - new Date(user.created_at).getTime()) >= 604800000) {
            return true;
        } else {
            return false
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.setItem('user', null)
        setUser(null);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="container body">
            <div id="comments" className="card mb-2">
                <a onClick={handleLogout} href="javascript: void(0);">Logout</a>
            </div>

            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" data-bs-backdrop="false"
                aria-labelledby="offcanvasRightLabel">
                <div id="all">
                    <div className="offcanvas-header">
                        <div className="switch-toggle">
                            <input type="checkbox" id="bluetooth" />
                            <label htmlFor="bluetooth" id="label"></label>
                        </div>
                        <button type="button" className="btn-close text-reset" id="closev" data-bs-dismiss="offcanvas"
                            aria-label="Close"><i className="fas fa-close"></i></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="main-content mb-3" id="cover">
                            <div id="main-content" className="t">
                                <div id="make-comment" className="pl-3">
                                    <h5 id="b">Responses(0)</h5>
                                    <div className="boxShadowEl p-1">
                                        <div className="profile-set m-1">
                                            <div className="d-flex">
                                                <div className="profile"></div> <span>{ user.name }</span>
                                            </div>
                                        </div>
                                        {
                                            sevenDaysActive
                                            ?
                                            <form className="mt-2">
                                                <div className="form-group">
                                                    <input value={thoughts} style={ {width:'350px',border:'none'} } onChange={handleInput} autoComplete="off"
                                                        className="form-control mb-2" placeholder="Share your thoughts" id="message"
                                                        required />
                                                </div>
                                                <div className="send" id="send">
                                                    <div className="text">
                                                        <i className="fa-solid fa-bold"></i>
                                                        <i className="fa-solid fa-italic"></i>
                                                    </div>
                                                    <div className="btn">
                                                        <a href="javascript:void(0);" onClick={handleCancel}>Cancel</a>
                                                        <button onClick={thoughts.length >= 1 ? handleSubmit : null} type="button" className="send-btn">{submitText}</button>
                                                    </div>
                                                </div>
                                            </form>
                                            :
                                            null
                                        }
                                    </div>
                                    <input type="checkbox" /> Also publish to my profile<br />
                                </div>

                                <div className="mt-5">
                                    <div className="dropdown">
                                        <strong className="dropbtn small">MOST RELEVANT <i className="fa-solid fa-chevron-down"></i>
                                        </strong>
                                        <div className="dropdown-content">
                                            <a href="/">Most relivant</a>
                                            <a href="/">Most recent</a>
                                        </div>
                                    </div>

                                    <hr />
                                    <div style={ {width:'350px', padding:'10px'} }>
                                        {
                                        postComments.map(c => <Comment key={c.id} content={c} deleteComment={handleDelete} user={user} replies={replies} fetchPosts={fetchPosts} />)
                                        }
                                        {/* <div>
                                            <div className="top">
                                                <div className="profile-set">
                                                    <div className="d-flex">
                                                        <div className="profile"></div>
                                                        <div>
                                                            <span>Jason</span><br />
                                                            <span>2 month ago</span>
                                                        </div>
                                                    </div>
                                                    <div className="dropdowndot">
                                                        <i className="fa-solid fa-ellipsis dropbtndot"></i>
                                                        <span className="dropdown-contentdot" id="vb">Report this
                                                            response</span>
                                                    </div>
                                                </div>
                                            </div><br />
                                            <div>
                                                <p>This is a comment in whom i am well pleased with. i will forever cheerish
                                                    it
                                                    because
                                                    it is
                                                    one of a kind</p>
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
                                                <div>
                                                    <span>Reply</span>
                                                </div>
                                            </div>

                                            <div className="replies">
                                                <div>
                                                    <div className="top">
                                                        <div className="profile-set">
                                                            <div className="d-flex">
                                                                <div className="profile"></div>
                                                                <div>
                                                                    <span>Jason</span><br />
                                                                    <span>2 month ago</span>
                                                                </div>
                                                            </div>

                                                            <div className="dropdowndot">
                                                                <i className="fa-solid fa-ellipsis dropbtndot"></i>
                                                                <span className="dropdown-contentdot" id="vb">Report this
                                                                    response</span>
                                                            </div>
                                                        </div>
                                                    </div><br />
                                                    <p>This is a comment in whom i am well pleased with. i will forever
                                                        cheerish
                                                        it
                                                        because
                                                        it is
                                                        one of a kind</p>
                                                    <div className="replies-actions">
                                                        <div>
                                                            <i className="fa-regular fa-heart m-1"> </i><i
                                                                className="m-1 fa-solid fa-up-long"></i>
                                                            <span>1k</span>
                                                        </div>
                                                        <div>
                                                            <i className="fas fa-comment"></i> <span>3 replies</span>
                                                        </div>
                                                        <div>
                                                            <span>Reply</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-primary">Show 10 more replies</span>
                                                </div>
                                                <hr />
                                                <br />
                                                <div>
                                                    <div className="top">
                                                        <div className="profile-set">
                                                            <div className="d-flex">
                                                                <div className="profile"></div>
                                                                <div>
                                                                    <span>Jason</span><br />
                                                                    <span>2 month ago</span>
                                                                </div>
                                                            </div>

                                                            <div className="dropdowndot">
                                                                <i className="fa-solid fa-ellipsis dropbtndot"></i>
                                                                <span className="dropdown-contentdot" id="vb">Report this
                                                                    response</span>
                                                            </div>
                                                        </div>
                                                    </div><br />
                                                    <p>This is a comment in whom i am well pleased with. i will forever
                                                        cheerish
                                                        it
                                                        because
                                                        it is
                                                        one of a kind</p>
                                                    <div className="replies-actions">
                                                        <div>
                                                            <i className="fa-regular fa-heart m-1"> </i><i
                                                                className="m-1 fa-solid fa-up-long"></i>
                                                            <span>1k</span>
                                                        </div>
                                                        <div>
                                                            <i className="fas fa-comment"></i> <span>3 replies</span>
                                                        </div>
                                                        <div>
                                                            <span>Reply</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-primary">Show 10 more replies</span>
                                                </div>
                                            </div>
                                        </div> */}
                                        

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            { post.title }
            </div>
            <div className="open mb-5 bg-dark text-white rounded-3 p-2">

                <div className="f">
                    <div>
                        <i className="fa-regular fa-heart m-1"> </i><i className="m-1 fa-solid fa-up-long"></i>
                        <span>1k</span>
                    </div>
                    <div>
                        <i className="fas fa-comment" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight" style={ {cursor:'pointer'} }></i> <span>{ postComments.length }</span>
                    </div>
                </div>

                <div className="social">
                    <i className="fa-brands fa-facebook-f"></i>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-linkedin-in"></i>
                </div>
            </div>
        </div>
    );
}

export default Post;