export const BASE_URL = 'https://guest-book.naveksoft.com';

const checkAnswerCorrectness = (response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(`Ошибка ${response.status}`)
};

// export const register = (avatar, email, name, password, passwordConfirmation) => {
//     return fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//        body: JSON.stringify({ avatar, email, name, password, passwordConfirmation })
//     })
//     .then(response => checkAnswerCorrectness(response))
// };

export const register = (email, name, password, password_confirmation) => {
  return fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({ email, name, password, password_confirmation })
  })
  .then(response => checkAnswerCorrectness(response))
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(response => checkAnswerCorrectness(response))
};

// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//   .then(response => checkAnswerCorrectness(response))
//   .then(data => data)
// };