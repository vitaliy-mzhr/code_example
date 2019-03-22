import React, { Component } from 'react';
import PropTypes from 'prop-types';



class CommentsTab extends Component {
    render() {
        const {items, comment, postComment, handleCommentChange} = this.props;

        return (
            <div className="outfit-comments">
                <div className="outfit-comments__list scrollable with-custom-scroll">
                    {Array.isArray(items) && items.map(({author, text}, index) => (
                        <div className="outfit-comments__entry" key={index}>
                            <div className="outfit-comments__author">{author}:</div>
                            <div className="outfit-comments__message">{text}</div>
                        </div>
                    ))}
                </div>

                <div className="outfit-comments__input">
                    <input placeholder="Write a comment..." type="text" value={comment} onChange={handleCommentChange}/>
                    <button type="button" className="btn" onClick={postComment} disabled={!comment}>Post</button>
                </div>
            </div>
        );
    }
}

CommentsTab.propTypes = {
    items: PropTypes.array.isRequired,
    comment: PropTypes.string.isRequired,
    postComment: PropTypes.func.isRequired,
    handleCommentChange: PropTypes.func.isRequired
};

export default CommentsTab;
