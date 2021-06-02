profilPage = () => {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let data = request(`http://localhost:3000/api/auth/` + urlParam);
    data.then(user => {
        userProfil(user);
        backNetwork(user);
        goToEditProfil();
    })
    /*.catch(() => {
        serverDown();
    })*/
};

goToEditProfil = () => {
    let button = document.getElementById('goToEdit');
    let id = JSON.parse(localStorage.getItem('userId'));
    button.addEventListener('click', function (e) {
        e.preventDefault()
        window.location = `edit-profil.html?/id=${id}`
    });
};

profilPage();