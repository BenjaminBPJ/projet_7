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
        //window.location = `profil.html`;
    })
        .catch((error) => {
            console.log(error)
        });
};

getNewInfo = () => {
    let photoUser = document.getElementById("photo-user").files[0];
    let newDescription = document.getElementById("new-description").value;
    let oldDescription = document.getElementsByClassName(".ancienne-description");
console.log(oldDescription)
    if (photoUser && newDescription === "") {
        let newProfil = JSON.stringify({
            description: oldDescription[0],
        });
        const data = new FormData();
        data.append('image', photoUser);
        data.append('description', newProfil)
        updateUserWithImage(newProfil);
    } else if (photoUser) {
            let newProfil = JSON.stringify({
                description: newDescription,
            });
            const data = new FormData();
            data.append('image', photoUser);
            data.append('description', newProfil)
            updateUserWithImage(newProfil);
    } else {
        let newProfil = {
            description: newDescription,
        };
        updateUserWithOutImage(newProfil);
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