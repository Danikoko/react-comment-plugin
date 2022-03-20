const comment = ({content}) => {
    return (
        <div>
            <div className="top mt-2">
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
                        <span className="dropdown-contentdot">Report this response</span>
                    </div>
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

export default comment;