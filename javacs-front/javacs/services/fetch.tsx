export class HttpTransaction {
    constructor() { }

    fetch_data = (url: string, method: string, body?: any) => {
        return fetch('http://190.159.67.58:3000/' + url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body? JSON.stringify(body) : ""
        }).then(response => response.json())
            .then(json => {
                return json;
            }).catch(error => {
                throw error;
            });
    }
}