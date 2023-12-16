import React from 'react';

import api from '../utils/api.js';

import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function App() {
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
    const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
    const [isImagePopupOpen, setImagePopup] = React.useState(false);
    const [isConfirmDeletePopupOpen, setConfirmDeletePopup] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

    React.useEffect(() => {
        api.fetchUserInfo()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));

        api.fetchInitialCards()
            .then(res => {
                setCards(res);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }, []);

    function handleEditAvatarClick () {
        setAvatarPopup(true);
    }

    function handleEditProfileClick () {
        setProfilePopup(true);
    }

    function handleAddPlaceClick () {
        setAddPlacePopup(true);
    }

    function handleCardClick (card) {
        setSelectedCard(card);
        setImagePopup(true);
    }

    function closeAllPopups () {
        setAvatarPopup(false);
        setProfilePopup(false);
        setAddPlacePopup(false);
        setImagePopup(false);
        setConfirmDeletePopup(false);

        setSelectedCard(null);
    }

    function handleCardLike (card, isLiked) {
        api.toggleLike(card._id, isLiked)
            .then(newCard => {
                const newCards = cards.map(item => item._id === card._id ? newCard : item);
                setCards(newCards);
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

    function handleDeleteCardClick () {
        setSelectedCard(this.item);
        setConfirmDeletePopup(true);
    }

    function handleUpdateUser (values) {
        api.patchUserInfo(values)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => `Ошибка: ${err}`);
    }

    function handleUpdateAvatar (link) {
        api.updateAvatar(link)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit (data) {
        api.postCard(data)
            .then(res => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err));
    }

    function handleCardDelete (card) {
        api.deleteCard(card._id)
            .then(deletedCard => {
                const newCards = cards.filter(deletedCard => deletedCard._id !== card._id);
                setCards(newCards);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка: ${err}`));
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
              cards={cards}
              onEditAvatar={ handleEditAvatarClick }
              onEditProfile={ handleEditProfileClick }
              onAddPlace={ handleAddPlaceClick }
              onCardClick={ handleCardClick }
              onCardDelete={ handleDeleteCardClick }
              onCardLike={ handleCardLike }
          />
          <Footer />
          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              initialValidityState={true}
              onUpdateUser={handleUpdateUser}
              onClose={closeAllPopups}
          />
          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              initialValidityState={false}
              onUpdateAvatar={handleUpdateAvatar}
              onClose={closeAllPopups}
          />
          <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              initialValidityState={false}
              onAddPlaceSubmit={handleAddPlaceSubmit}
              onClose={closeAllPopups}
          />
          <ConfirmDeletePopup
              card={selectedCard}
              isOpen={isConfirmDeletePopupOpen}
              initialValidityState={true}
              onDeleteConfirmation={handleCardDelete}
              onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
  );
}

export default App;
