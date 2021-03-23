export const BASE_URL = 'https://guest-book.naveksoft.com';

const checkAnswerCorrectness = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`)
};

export const getReviews = (token) => {
  return fetch(`${BASE_URL}/api/v1/posts`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => checkAnswerCorrectness(response))
};