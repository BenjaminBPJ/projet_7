editProfilPage = () => {
    let userId = localStorage.getItem('userId')
    let data = request(`http://localhost:3000/api/auth/` + userId);
    data.then(user => {
        console.log(user.result)
        userEditProfil(user);
        backNetwork();
        deleteUser(user);
        sendUpdateUser();
    })
        .catch(() => {
        })
};

deleteUser = () => {
    let button = document.getElementById('delete-account');
    button.addEventListener('click', function () {
        let userId = localStorage.getItem('userId');

        alert(`Votre compte a bien été supprimé. Vous êtes redirigé vers la page d'inscription.`);

        let data = deleteMethod(`http://localhost:3000/api/auth` + userId);
        data.then(userDelete => {
            window.location = `inscription.html`;
        })
            .catch((err) => ({ err }));
    });
};

updateUser = (newInfo) => {
    let userId = localStorage.getItem('userId');
    let data = update(`http://localhost:3000/api/auth/` + userId, newInfo);
    data.then(updateUser => {
        console.log(updateUser)
        window.location = `profil.html`;
    })
        .catch((error) => {
            console.log(error)
        });
};

getNewInfo = () => {
    let photoUser = document.getElementById("photo-user").files[0];
    let newDescription = document.getElementById("new-description").value;

    if (photoUser) {
        let avatar = document.getElementById('photo-user').files[0].name;
        let newProfil = {
            description: newDescription,
            imageUrl: avatar,
        };
        updateUser(newProfil);
    } else {
        let newProfil = {
            description: newDescription,
        };
        updateUser(newProfil);
    };
};

sendUpdateUser = () => {
    let button = document.getElementById('send-profil');
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getNewInfo();
    })
}

editProfilPage();