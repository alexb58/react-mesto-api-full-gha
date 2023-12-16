import React from "react";

import PopupWithForm from "./PopupWithForm";
import Input from './Input.js';


function EditAvatarPopup (props) {
    const [link, setLink] = React.useState('');

    const [formValidity, setFormValidity] = React.useState(false);
    const [inputValidity, setInputValidity] = React.useState(true);

    function handleLinkChange (evt) {
        setLink(evt.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();

        props.onUpdateAvatar(link);

        setLink('');
        setInputValidity(true);
        setFormValidity(false);
    }

    function handleClose () {
        props.onClose();

        setLink('');
        setInputValidity(true);
        setFormValidity(false);
    }

    return (
        <PopupWithForm
            formValidityState={formValidity}
            onFormValidityChange={setFormValidity}
            name="avatar"
            heading="Обновить аватар"
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={handleClose}>
            <Input
                inputModifier="popup__input popup__input_avatar"
                inputName="avatar"
                inputValue={link}
                inputType="url"
                inputPlaceholder="Ссылка на фото"
                inputValidityState={inputValidity}
                onInputValidityChange={setInputValidity}
                onValueChange={handleLinkChange}
            />
        </PopupWithForm>
    );
}

export default EditAvatarPopup;