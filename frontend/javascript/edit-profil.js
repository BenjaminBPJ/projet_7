function editProfilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let data = request(`http://localhost:3000/api/auth/` + urlParam);
    data.then(user => {
        userEditProfil(user);
        backNetwork();
        deleteUser(user);
        sendUpdateUser();
    })
    /*.catch(() => {
        serverDown();
    })*/
};

editProfilPage();

function deleteUser() {
    let button = document.getElementById('delete-account');
    button.addEventListener('click', function () {
        let urlParam = (new URL(window.location.href)).searchParams.get('/id');

        alert(`Votre compte a bien été supprimé. Vous êtes redirigé vers la page d'inscription.`);

        let data = deleteMethod(`http://localhost:3000/api/auth` + urlParam);
        window.location = `inscription.html`;
        data.then(userDelete => {
        })
            .catch((err) => ({ error: 'Impossible de supprimer votre compte.' + err }));
    });
};

function updateUser(newInfo) {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let data = update(`http://localhost:3000/api/auth/` + urlParam, newInfo);
    data.then(updateUser => {

    })
    /*.catch(() => {
    serverDown();
})*/
};

function getNewInfo() {
    let photoUser = document.getElementById("photo-user").files[0];
    let newDescription = document.getElementById("area-description").value;
    let newProfil = {
        description: newDescription,
        imageUrl: photoUser
    }
    console.log(description)
    updateUser(newProfil);
};

function sendUpdateUser() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let button = document.getElementById('send-profil');
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getNewInfo();
        window.location = `profil.html/id=${urlParam}`
    })
}