profilPage = () => {
    let userId = localStorage.getItem('userId');
    let data = request(`http://localhost:3000/api/auth/` + userId);
    data.then(user => {
        userProfil(user);
        userEditProfil(user)
        goToEditProfil();
        backNetwork();
        backToProfil();
        deleteUser();
        sendUpdateUser(user);
    })
        .catch((error) => {
            console.log(error)
        })
};


//////////// Fait apparaitre le formulaire pour modifier l'utilisateur ////////////
goToEditProfil = () => {
    let button = document.getElementById('goToEdit');
    let form = document.getElementById(`form-update-user`);

    // au click on va faire apparaitre le formulaire
    button.addEventListener('click', function (e) {
        e.preventDefault()
        form.classList.add('show')
    });
};

//////////// modification des infos de l'utilisateur ////////////
updateUserWithOutImage = (newInfo) => {
    let userId = localStorage.getItem('userId');
    let data = updateWithOutImage(`http://localhost:3000/api/auth/` + userId, newInfo);
    data.then(updateUser => {
        window.location = `profil.html`;
    })
        .catch((error) => {
            console.log(error)
        });
};

updateUserWithImage = (newInfo) => {
    let userId = localStorage.getItem('userId');
    let data = updateWithImage(`http://localhost:3000/api/auth/` + userId, newInfo);
    data.then(updateUser => {
        window.location = `profil.html`;
    })
        .catch((error) => {
            console.log(error)
        });
};

getNewInfo = (user) => {
    let photoUser = document.getElementById("image-user").files[0];
    let newDescription = document.getElementById("new-description").value;
    let oldDescription = user.result[0].description;  // je recupere les anciennes données pour les envoyer afin de réussir un bon "PUT"

    // l'utilisateur modifie juste sa photo de profil, on envoie le fichier mais en data on prend son ancienne description
    if (photoUser && newDescription === "") {
        let newProfil = JSON.stringify({
            description: oldDescription,
        });
        console.log(oldDescription)
        const data = new FormData();
        data.append('image', photoUser);
        data.append('description', newProfil);
        updateUserWithImage(data);

    // l'utilisateur modifie que sa description 
    } else if (!photoUser && newDescription !== "") {
            let newProfil = {
                description: newDescription,
            };
            updateUserWithOutImage(newProfil);

    // l'utilisateur modifie sa photo et sa description
    } else if (photoUser && newDescription !== "") {
        let newProfil = JSON.stringify({
            description: newDescription,
        });
        const data = new FormData();
        data.append('image', photoUser);
        data.append('description', newProfil);
        updateUserWithImage(data);

    // Si il envoie un formulaire vide on renvoie une erreur
    } else {
        let small = document.getElementById('small-update-user');
        small.innerHTML = `Veuillez écrire une nouvelle description, envoyer une photo pour modifier votre profil ou cliquer sur retour.`;
    };
};

sendUpdateUser = (user) => {
    let button = document.getElementById('send-profil');
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getNewInfo(user);
    })
}

//////////// Suppression du compte de l'utilisateur ////////////
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


//////////// retour en arrière sur le réseau ou la page actuelle ////////////
backNetwork = () => {
    let button = document.getElementById('back-to-network');
    button.addEventListener('click', function () {
        window.location = `reseau.html`;
    });
};

backToProfil = () => {
    let button = document.getElementById('back-to-profil');
    button.addEventListener('click', function () {
        window.location.reload();
    });
};

profilPage();