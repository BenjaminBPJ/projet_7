async function request(url) {
    let response = await fetch(url, {
        method: "GET",
        headers: {
            'authorization': 'bearer ' + localStorage.getItem('token')
        }
    });

    if (!response.ok) {
        return null
    };
    let data = await response.json();
    return data;
};

async function send(url, data) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'authorization': 'bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    let res = await response.json();
    return res;
};

async function sendPostToApi(url, data) {
    let response = await axios.post(url, data, {
        method: "POST",
        headers: {
            'authorization': 'bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    let res = await response.json();
    return res;
};

async function deleteMethod(url) {
    let response = await fetch(url, { method: "DELETE" });
    let res = await response.json();
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
    return res;
};