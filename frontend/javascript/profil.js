function profilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/pseudo');
    let data = request(`http://localhost:3000/api/` + urlParam);
    data.then(user => {
        userProfil(user);
        backNetwork(user);
        deleteUser(user);
        getDescriptionScreen(user);
        sendDescription(user);
    })
    /*.catch(() => {
        serverDown();
    })*/
};

profilPage();

function backNetwork(user) {
    let pseudo = user[0].pseudo;
    let button = document.getElementById('back-to-network');
    button.addEventListener('click', function () {
        window.location = `reseau.html?/home/pseudo=${pseudo}`;
    });
};


function deleteUser() {
    let button = document.getElementById('delete-account');
    button.addEventListener('click', function () {
        let urlParam = (new URL(window.location.href)).searchParams.get('/pseudo');

        alert(`Votre compte a bien été supprimé. Vous êtes redirigé vers la page d'inscription.`);

        let data = deleteMethod(`http://localhost:3000/api/` + urlParam);
        window.location = `inscription.html`;
        data.then(userDelete => {
        })
        .catch((err) => ({ error : 'Impossible de supprimer votre compte.' + err }));
    });
};

function getDescriptionScreen() {
    let button = document.getElementById('pen-d');
    let sendDescription = document.getElementById('b-s');
    let newDescription = document.getElementById("area-description");

    button.addEventListener('click', function () {
        newDescription.classList.remove('hidden');
        sendDescription.classList.remove('hidden');        
    });    
};

function sendDescription(){
    let newDescription = document.getElementById("area-description").value;
    let sendDescription = document.getElementById('b-s');
    let descriptionInput = {
        description: newDescription
    };
    console.log(descriptionInput);

    sendDescription.addEventListener('click', function(e){
        e.preventDefault()
        modifyDescription(descriptionInput);
        window.location.reload()
    });
};

function modifyDescription(description) {
    let urlParam = (new URL(window.location.href)).searchParams.get('/pseudo');
    let data = update(`http://localhost:3000/api/` + urlParam, description);
    data.then(descri => {
        console.log(descri);
    })
    .catch((error) => ({ error }));
};