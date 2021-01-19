function profilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/pseudo')
    let data = request(`http://localhost:3000/api/`+ urlParam)
    data.then( user => {
        console.log(user)
        console.log(data)
        console.log(urlParam)
        userProfil(user)
    })
        /*.catch(() => {
            console.log(data)
            serverDown()
        })*/
}

profilPage()