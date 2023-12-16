import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup (props) {

    function handleSubmit (evt) {
        evt.preventDefault();
        props.onDeleteConfirmation(props.card);
    }

    return (
        <PopupWithForm
            formValidityState={props.initialValidityState}
            name="delete"
            heading="Вы уверены?"
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
        />
    )
}

export default ConfirmDeletePopup;