async function request(url) {
    let response = await fetch(url)
    if (!response.ok){
        return null
    }
    let data = await response.json()
    return data
}

async function send(url, data) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    let res = await response.json()
    return res
}

async function deleteMethod (url) {
    let response = await fetch(url, { method: "DELETE" })
    let res = await response.json()
    return res
}