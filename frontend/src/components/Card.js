import React from "react";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card (props) {
    const userInfo = React.useContext(CurrentUserContext)
    const cardData = props.item;

    const isOwn = cardData.owner._id === userInfo._id;
    const isLiked = cardData.likes.some(like => like._id === userInfo._id)

    const cardLikeButtonClassName = (
        `button button_type_like element__button ${ isLiked ? 'element__button_active' : ''}`
    );

    function handleClick () {
        props.onCardClick(cardData);
    }

    function handleLikeClick () {
        props.onCardLike(cardData, isLiked);
    }

    function handleDeleteClick () {
        props.onCardDelete(cardData);
    }

    return (
        <div className="element">
            { isOwn && (<button className="button button_type_urn" type="button" onClick={ handleDeleteClick } />) }
            <img className="element__photo" src={ cardData.link } alt={ cardData.name } onClick={ handleClick } />
            <div className="element__info">
                <h2 className="element__text">{cardData.name}</h2>
                <button className={ cardLikeButtonClassName } type="button" onClick={ handleLikeClick }>
                    <p className="element__counter">{ cardData.likes.length }</p>
                </button>
            </div>
        </div>
    );
}

export default Card;