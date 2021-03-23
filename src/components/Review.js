import React from 'react';

function Review(props) {
    return(
        <article className="element">
            <h2 className="element__title">{props.review.title}</h2>
            <p className="element__message">{props.review.message}</p>
        </article>
    )
}
export default Review;