import React from "react";

function ImagePopup (props) {
    return (
        <div className={`photo-open popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="photo-open__container">
            <button className="button button_type_close button_type_close-photo" type="button" onClick={props.onClose}></button>
            <img className="photo-open__image" src={props.card ? props.card.link : null} alt={props.card ? props.card.name : null} />
            <h2 className="photo-open__name">{props.card ? props.card.name : null}</h2>
        </div>
    </div>
    );
}

export default ImagePopup;