async function request(url) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'authorization': 'bearer ' + localStorage.getItem('token')
        }
    });
    let res = await response.json();
    if (!response.ok) {
        throw res
    };
    return res;
};

async function sendLog(url, data) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    let res = await response.json()
    return res;
};

async function sendWithOutImage(url, data) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    let res = await response.json()
    console.log('ici', response.ok, response.status, res)
    if (!response.ok) {
        throw res
    }
    return res;
};

async function sendWithImage(url, data) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data;boundary=<calculated when request is sent>",
            'authorization': 'bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data.post)
    });
    let res = await response.json()
    return res;
};

async function deleteMethod(url) {
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            'authorization': 'bearer ' + localStorage.getItem('token')
        }
    });
    let res = await response.json();
    if (!response.ok) {
        throw res
    }
    return res;
};

async function update(url, data) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    let res = await response.json();
    if (!response.ok) {
        throw res
    }
    return res;
};