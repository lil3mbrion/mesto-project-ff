function checkRes (res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const loadCleanAvatarUrl = (settings) => {
  return fetch(`${settings.baseUrl}/users/me`, {
    headers: settings.headers
  })
    .then(checkRes)
}

const loadUsersCards = (settings) => {
  return fetch(`${settings.baseUrl}/cards`, {
    headers: settings.headers
  })
    .then(checkRes)
}

const loadUserInfo = (settings) => {
  return fetch(`${settings.baseUrl}/users/me`, {
    headers: settings.headers
  })
    .then(checkRes)
}

const uploadUserAvatar = (userAvatar, settings) => {
  return fetch(`${settings.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      avatar: userAvatar
    })
  });
}

const uploadUserInfo = (userName, userDscr, settings) => {
  return fetch(`${settings.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: settings.headers,
    body: JSON.stringify({
      name: userName,
      about: userDscr
    })
  });
}

const postNewCard = (titleCard, urlCard, settings) => {
  return fetch(`${settings.baseUrl}/cards`, {
    method: 'POST',
    headers: settings.headers,
    body: JSON.stringify({
      name: titleCard,
      link: urlCard
    })
  });
}

const deleteCardRequest = (cardId, settings) => {
  return fetch(`${settings.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
    .then(checkRes)
}

const putLike = (cardId, settings) => {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: settings.headers,
  })
    .then(checkRes)
}

const deleteLike = (cardId, settings) => {
  return fetch(`${settings.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: settings.headers,
  })
    .then(checkRes)
}

export { loadCleanAvatarUrl, loadUsersCards, loadUserInfo, uploadUserAvatar, uploadUserInfo, postNewCard, deleteCardRequest, putLike, deleteLike };

