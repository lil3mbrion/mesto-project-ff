import { nameProfile, dscrProfile, profileImage, handleImagePopup, placeList} from "../scripts/index.js"
import { cardAdd, deleteCard, likeClick } from "../components/card.js";

let currentUserId;

function renderCard(card) {
  placeList.append(card);
}

const updateProfile = (userData) => {
  nameProfile.textContent = userData.name
  dscrProfile.textContent = userData.about
  profileImage.style.backgroundImage = `url('${userData.avatar}')`
}

const loadCleanAvatarUrl = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39'
    }
  })
    .then(res => res.json())
    .then((result) => {
      return result.avatar
    })
}

const loadUsersCards = () => {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-39/cards', {
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39'
    }
  })
    .then(res => res.json())
    .then((cards) => {
      cards.forEach(function (card){
        renderCard(cardAdd(card, deleteCard, likeClick, handleImagePopup));
      });
      return cards;
    })
}

const loadUserInfo = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39'
    }
  })
    .then(res => res.json())
    .then((result) => {
      currentUserId = result._id;
      updateProfile(result);
      return result, currentUserId;
    })
}

const uploadUserAvatar = (userAvatar) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: userAvatar
    })
  });
}

const uploadUserInfo = (userName, userDscr) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: userDscr
    })
  });
}

const postNewCard = (titleCard, urlCard) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-39/cards', {
    method: 'POST',
    headers: {
      authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleCard,
      link: urlCard
    })
  });
}

export {loadCleanAvatarUrl, loadUsersCards, loadUserInfo, uploadUserAvatar, uploadUserInfo, postNewCard, currentUserId};

