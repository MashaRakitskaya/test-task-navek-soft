class Api {
    constructor({ address, token }) {
        this._address = address;
        this._token = token;
    }

    // получить карточки с сервера
    getReviews() {
        return fetch(`${this._address}/posts`, {
            headers: {
            authorization: this._token
            }
        })
        .then(response => this._checkAnswerCorrectness(response))
        
    }

    //получить информацию о пользователе с сервера
    getUserInformation() {
        return fetch(`${this._address}/users/me`, {
            headers: {
            authorization: this._token
            }
        })
        .then(response => this._checkAnswerCorrectness(response)) 
    }

    //добавить информацию о пользователе на сервер
    addUserInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(response => this._checkAnswerCorrectness(response))
    }
};

const config = {
    address: 'https://guest-book.naveksoft.com',
    token: '369f7f82-3628-418a-9ccf-d1d1496569f6'
};

const api = new Api(config);
export default api;