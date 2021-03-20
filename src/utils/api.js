export const BASE_URL = 'https://guest-book.naveksoft.com';
// const token = localStorage.getItem('token');
// console.log(token);

const checkAnswerCorrectness = (response) => {
    if (response.ok) {
        return response.json();
    }

    // if (response === 200) {
    //     return response.json();
    // }

    return Promise.reject(`Ошибка ${response.status}`)
};

// export const getReviews = () => {
//     return fetch(`${BASE_URL}/api/v1/posts`, {
//       method: 'GET',
//       headers: {
//         authorization: token
//       }
//     })
//     .then(response => checkAnswerCorrectness(response))
//     .then(data => data)
// };

// export const getReviews = (token) => {
//     return fetch(`${BASE_URL}/api/v1/posts`, {
//       method: 'GET',
//       headers: {
//         authorization: { token }
//       }
//     })
//     .then(response => checkAnswerCorrectness(response))
//     .then(data => data)
// };

// export const getReviews = () => {
//     return fetch(`${BASE_URL}/api/v1/posts`, {
//       headers: {
//         authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJiYTliNzEyYWFhZDNiN2I2MTdkYjI5NTVmNjk1OWRjZjFiMWFiZmU2YWUxOGM4MmE1ZDM0ZjkxY2RjMWNjMzk2OWM4Y2ZhNjA0YWRkMGRmIn0.eyJhdWQiOiIxIiwianRpIjoiMmJhOWI3MTJhYWFkM2I3YjYxN2RiMjk1NWY2OTU5ZGNmMWIxYWJmZTZhZTE4YzgyYTVkMzRmOTFjZGMxY2MzOTY5YzhjZmE2MDRhZGQwZGYiLCJpYXQiOjE2MTYxNzA1NjEsIm5iZiI6MTYxNjE3MDU2MSwiZXhwIjoxNjQ3NzA2NTYxLCJzdWIiOiI5MCIsInNjb3BlcyI6W119.G9ypvZMRaWGqoM4DT3rY8NeawWI9L7sH7gowXd_fvgM_mHZ4buBOD0LQJQ8LzWt-TAzOrbBOZ4sYhmsnwGoTrF1hKJU-mA3c7Dw1XLDc0XaMo1R-zGnAW4cgX3vqqwP_uO7Svak2xzvzqxRUDHGk5Gk-IDcndqesB-ATigL-Kahd-NAiaM4GDWL-M2vF5Os8UYyJNbFIJ1c9zGDu830oUCwo0rZOEDwR26Wu73MVu_J_PKqZ1Gf_p6UP6J_6svrH8g4MqfveEpY0efgqLQtQPcQsfMDdLyhw86ytHc26QfFVm8RXjrYq3wsKO4CGxZ7tCYWO7RfDgfdKfUWIaYeRgm7sOT3YvMcp-2r8gZ51eXXv1NiYV_bPZUxKtaBRRkuAtopa3MqxkHSkOpmLyRpB86Yb5a8Fvv-nCXGuyX5_XnPZ-mPqU28Em7WGnaTaUXXCZbz8pX_syc_7VeIHa_zmRF_oofb0VXksNEFrCYWiJoXxS57S-ji-1DnxwFsj_gKNV5f5CBZilFkxD8XR2Xw1uErnwDfn-QCpeQRMpsnin5Ii_R4yAseUkMmqsgRLcSxGXNsk55yGeqkOH5b1-4VX6_tLgvbuhf6AMCoMTe-DTFUCB4usWLr2JZyO2YzSQX6DIucLO415BBayIEnxkvZelknJqz5TXSz93PL_TaRg-P4`
//       }
//     })
//     .then(response => checkAnswerCorrectness(response))
// };

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