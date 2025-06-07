const apiSettings = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: 'd1c2fddb-87a6-4562-b49e-98d228179b39',
    'Content-Type': 'application/json'
  }
}


function checkRes (res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const loadUsersCards = () => {
  return fetch(`${apiSettings.baseUrl}/cards`, {
    headers: apiSettings.headers
  })
    .then(checkRes)
}

const loadUserInfo = () => {
  return fetch(`${apiSettings.baseUrl}/users/me`, {
    headers: apiSettings.headers
  })
    .then(checkRes)
}

const uploadUserAvatar = (userAvatar) => {
  return fetch(`${apiSettings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiSettings.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  })
    .catch((err) => {
      console.log('Ошибка:', err);
    })
}

const uploadUserInfo = (userName, userDscr) => {
  return fetch(`${apiSettings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiSettings.headers,
    body: JSON.stringify({
      name: userName,
      about: userDscr
    })
  })
    .catch((err) => {
      console.log('Ошибка:', err);
    })
}

const postNewCard = (titleCard, urlCard) => {
  return fetch(`${apiSettings.baseUrl}/cards`, {
    method: 'POST',
    headers: apiSettings.headers,
    body: JSON.stringify({
      name: titleCard,
      link: urlCard
    })
  })
    .catch((err) => {
      console.log('Ошибка:', err);
    })
}

const deleteCardRequest = (cardId) => {
  return fetch(`${apiSettings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiSettings.headers,
  })
    .then(checkRes)
}

const putLike = (cardId) => {
  return fetch(`${apiSettings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiSettings.headers,
  })
    .then(checkRes)
}

const deleteLike = (cardId) => {
  return fetch(`${apiSettings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiSettings.headers,
  })
    .then(checkRes)
}

export { loadUsersCards, loadUserInfo, uploadUserAvatar, uploadUserInfo, postNewCard, deleteCardRequest, putLike, deleteLike };

