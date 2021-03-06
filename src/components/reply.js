import axios from "axios";
import { useMemo } from "react";

function Reply({reply, user, fetchPosts}) {

    const deleteReply = () => {
        axios.post('https://tests.tee-solutions.com/api/deletereply', {
            id: reply.id
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

    const timeStamp = useMemo(() => {
        let date = Date.parse(reply.created_at);
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
    }, [reply]);

    return (
        <div>
            <div className="top">
                <div className="profile-set">
                    <div className="d-flex">
                        <div className="profile"></div>
                        <div>
                            <span>
                                {
                                    user.id == reply.user_id ? 'You' : 'Anon.'
                                }
                            </span><br />
                            <span>{timeStamp} ago</span>
                        </div>
                    </div>

                    {
                        user.id == reply.user_id
                        ?
                        <div className="dropdowndot">
                            <i className="fa-solid fa-ellipsis dropbtndot"></i>
                            <span onClick={() => deleteReply(reply.id)} className="dropdown-contentdot">Delete</span>
                        </div>
                        :
                        null
                    }
                </div>
            </div><br />
            <p>{ reply.body }</p>
            <div className="replies-actions">
                <div>
                    <i className="fa-regular fa-heart m-1"> </i><i
                        className="m-1 fa-solid fa-up-long"></i>
                    <span>1k</span>
                </div>
            </div>
            <hr />
            <br />
        </div>
    );
}

export default Reply;