profilPage = () => {
    let userId = localStorage.getItem('userId');
    let data = request(`http://localhost:3000/api/auth/` + userId);
    data.then(user => {
        userProfil(user);
        backNetwork(user);
        goToEditProfil();
    })
    .catch((error) => {
        console.log(error)
    })
};

goToEditProfil = () => {
    let button = document.getElementById('goToEdit');
    button.addEventListener('click', function (e) {
        e.preventDefault()
        window.location = `edit-profil.html`
    });
};

profilPage();