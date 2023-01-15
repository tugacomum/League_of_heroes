const BASE_URL = "https://psw-server.onrender.com/";
export const PUBLIC_ID = 1;
const PRIVATE_ID = "abce";

export function GetUsers() {
    return fetch(BASE_URL + "Users/", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

export function GetSuperHero(id) {
    return fetch(BASE_URL + "Users/" + id, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        }).then(data => {
            if (data.data) { return JSON.parse(data.data) }
            return data;
        });
}

export function GetTop(id) {
    return fetch(BASE_URL + "Users/" + id + "/top", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        }).then(data => {
            if (data.data) { return JSON.parse(data.data) }
            return data;
        });
}

export function UpdateSuperhero(id, list) {
    return fetch(BASE_URL + "Users/" + PRIVATE_ID, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(list)
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}

export function UpdateTop(id, top) {
    return fetch(BASE_URL + "Users/" + PRIVATE_ID + "/top", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(top)
    })
        .then(response => {
            if (response.status !== 200) {
                return []
            }
            return response.json()
        });
}