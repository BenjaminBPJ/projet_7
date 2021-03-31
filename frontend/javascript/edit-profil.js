function profilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let data = request(`http://localhost:3000/api/` + urlParam);
    data.then(user => {
        userEditProfil(user);
        backNetwork(user);
        deleteUser(user);
        getDescriptionScreen(user);
        sendDescription(user);
    })
    /*.catch(() => {
        serverDown();
    })*/
};

function deleteUser() {
    let button = document.getElementById('delete-account');
    button.addEventListener('click', function () {
        let urlParam = (new URL(window.location.href)).searchParams.get('/id');

        alert(`Votre compte a bien été supprimé. Vous êtes redirigé vers la page d'inscription.`);

        let data = deleteMethod(`http://localhost:3000/api/` + urlParam);
        window.location = `inscription.html`;
        data.then(userDelete => {
        })
        .catch((err) => ({ error : 'Impossible de supprimer votre compte.' + err }));
    });
};

/*function sendDescription(){
    let newDescription = document.getElementById("area-description").value;
    let sendDescription = document.getElementById('b-s');
    let description = {
        description : newDescription
    }
    console.log(description)

    sendDescription.addEventListener('click', function(e){
        e.preventDefault()
        modifyDescription(newDescription);
        //window.location.reload()
    });
};

function modifyDescription(newDescription) {
    let urlParam = (new URL(window.location.href)).searchParams.get('/pseudo');
    let data = update(`http://localhost:3000/api/` + urlParam, newDescription);
    data.then(descri => {
        console.log(descri);
    })
    //.catch((error) => ({ error }));
};*/