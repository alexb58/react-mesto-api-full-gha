import React from "react";

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
    const userInfo = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [formValidity, setFormValidity] = React.useState(true);
    const [nameValidity, setNameValidity] = React.useState(true);
    const [descriptionValidity, setDescriptionValidity] = React.useState(true);

    React.useEffect(() => {
        setName(userInfo.name);
        setDescription(userInfo.about);
    }, [userInfo, props.isOpen]);

    function handleNameChange (evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange (evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description
        });

        setFormValidity(true);
    }

    function handleClose () {
        props.onClose();

        setName(userInfo.name);
        setDescription(userInfo.about);
        setNameValidity(true);
        setDescriptionValidity(true);
        setFormValidity(true);
    }


    return (
        <PopupWithForm
            formValidityState={formValidity}
            onFormValidityChange={setFormValidity}
            name="profile"
            heading="Редактировать профиль"
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={handleClose}
        >
            <Input
                inputModifier="popup__input popup__input_type_name"
                inputType="text"
                inputName="name"
                inputValue={name}
                inputPlaceholder="Имя"
                inputMaxLength="40"
                inputValidityState={nameValidity}
                onInputValidityChange={setNameValidity}
                onValueChange={handleNameChange}
            />

            <Input
                inputModifier="popup__input popup__input_type_status"
                inputType="text"
                inputName="description"
                inputValue={description}
                inputPlaceholder="Описание"
                inputMaxLength="200"
                inputValidityState={descriptionValidity}
                onInputValidityChange={setDescriptionValidity}
                onValueChange={handleDescriptionChange}
            />
        </PopupWithForm>
    );
}

export default EditProfilePopup;