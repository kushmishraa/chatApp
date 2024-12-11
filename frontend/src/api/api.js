const BACKEND_URL = 'http://localhost:3001'
export const makeApiCall = async (options) => {
    const { method, body, path } = options;
    const result = await fetch(`${BACKEND_URL}/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const res = await result.json();
    console.log(res);
    return res;
}