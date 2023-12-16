import React from 'react';

import Card from './Card.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {
    const userInfo = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__title">
                    <img src={ userInfo.avatar } className="profile__avatar" alt="Жак" />
                    <button className="profile__avatar-button" onClick={props.onEditAvatar} ></button>
                    <div className="profile__info">
                        <h1 className="profile__name">{ userInfo.name }</h1>
                        <button className="button button_type_edit" type="button" onClick={props.onEditProfile} />
                        <p className="profile__status">{ userInfo.about }</p>
                    </div>
                </div>
                <button className="button button_type_add" type="button" onClick={props.onAddPlace} />
            </section>
            <section className="elements">
                {props.cards.map((item) => (
                    <Card
                        item={item}
                        key={item._id}
                        onCardClick={props.onCardClick}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                    />
                ))}
            </section>
        </main>
    );
}

export default Main;