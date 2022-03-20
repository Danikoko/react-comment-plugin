import React, { useMemo } from 'react';
function Comment({content, deleteComment, user}) {
    
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
        if ((new Date().getTime() - new Date(content.created_at).getTime()) >= 604800000) {
            return true;
        } else {
            return false
        }
    }, [content])

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
                <div>
                    <span>Reply</span>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Comment;