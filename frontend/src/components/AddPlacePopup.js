import PopupWithForm from "./PopupWithForm";
import React from "react";
import Input from './Input.js';

function AddPlacePopup (props) {
    const [placePic, setPlacePic] = React.useState('');
    const [placeName, setPlaceName] = React.useState('');
    const [formValidity, setFormValidity] = React.useState(false);
    const [nameValidity, setNameValidity] = React.useState(true);
    const [picValidity, setPicValidity] = React.useState(true);

    function handlePlaceNameChange (evt) {
        setPlaceName(evt.target.value);
    }

    function handlePlacePicChange (evt) {
        setPlacePic(evt.target.value);
    }

    function handleSubmit (evt) {
        evt.preventDefault();

        props.onAddPlaceSubmit({
            name: placeName,
            link: placePic
        });

        setPlaceName('');
        setPlacePic('');
        setNameValidity(true);
        setPicValidity(true);
        setFormValidity(false);
    }

    function handleClose () {
        props.onClose();

        setPlaceName('');
        setPlacePic('');
        setNameValidity(true);
        setPicValidity(true);
        setFormValidity(false);
    }

    return (
        <PopupWithForm
            formValidityState={formValidity}
            onFormValidityChange={setFormValidity}
            name="add-place"
            heading="Новое место"
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={handleClose}>
            <Input
                inputModifier="popup__input popup__input_type_place-name"
                inputType="text"
                inputName="place"
                inputValue={placeName}
                inputPlaceholder="Название"
                inputMaxLength="30"
                inputValidityState={nameValidity}
                onInputValidityChange={setNameValidity}
                onValueChange={handlePlaceNameChange}
            />
            <Input
                inputModifier="popup__input popup__input_type_place-image"
                inputType="url"
                inputName="link"
                inputValue={placePic}
                inputPlaceholder="Ссылка на картинку"
                inputValidityState={picValidity}
                onInputValidityChange={setPicValidity}
                onValueChange={handlePlacePicChange}
            />
        </PopupWithForm>
    );
}

export default AddPlacePopup;