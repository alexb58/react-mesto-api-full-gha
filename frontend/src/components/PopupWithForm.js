function PopupWithForm (props) {


    function handleChange (evt) {
        props.onFormValidityChange(evt.currentTarget.checkValidity());
    }

    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <button className="button button_type_close" type="button" onClick={props.onClose} />
            <div className="popup__container">
                <h2 className="popup__title">{props.heading}</h2>
                <form className="popup__form" name={props.name} onSubmit={props.onSubmit} onChange={handleChange}>
                    {props.children}
                    <button
                        className="popup__button button button_type_save"
                        type="submit"
                        disabled={!props.formValidityState}
                    >
                        {(props.name === 'delete') ? 'Удалить' : 'Сохранить'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;