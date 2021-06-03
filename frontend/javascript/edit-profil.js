editProfilPage = () => {
    let userId = localStorage.getItem('userId')
    let data = request(`http://localhost:3000/api/auth/` + userId);
    data.then(user => {
        userEditProfil(user);
        backNetwork();
        deleteUser(user);
        sendUpdateUser();
    })
    .catch(() => {
    })
};

editProfilPage();

deleteUser = () => {
    let button = document.getElementById('delete-account');
    button.addEventListener('click', function () {
        let userId = localStorage.getItem('userId');

        alert(`Votre compte a bien été supprimé. Vous êtes redirigé vers la page d'inscription.`);

        let data = deleteMethod(`http://localhost:3000/api/auth` + userId);
        window.location = `inscription.html`;
        data.then(userDelete => {
        })
            .catch((err) => ({ error: 'Impossible de supprimer votre compte.' + err }));
    });
};

updateUser = (newInfo) => {
    let userId = localStorage.getItem('userId');
    let data = update(`http://localhost:3000/api/auth/` + userId, newInfo);
    data.then(updateUser => {

    })
    .catch((error) => {
    console.log(error)
});
};

getNewInfo = () => {
    let photoUser = document.getElementById("photo-user").files[0];
    let newDescription = document.getElementById("area-description").value;
    let newProfil = {
        description: newDescription,
        imageUrl: photoUser
    }
    console.log(description)
    updateUser(newProfil);
};

sendUpdateUser = () => {
    let button = document.getElementById('send-profil');
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getNewInfo();
        window.location = `profil.html`
    })
}