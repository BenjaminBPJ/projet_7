function profilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let data = request(`http://localhost:3000/api/` + urlParam);
    data.then(user => {
        userProfil(user);
        backNetwork(user);
        goToEditProfil();
    })
    /*.catch(() => {
        serverDown();
    })*/
};

profilPage();

function goToEditProfil() {
    let button = document.getElementById('goToEdit');
    let id = JSON.parse(localStorage.getItem('userId'));
    button.addEventListener('click', function (e) {
        e.preventDefault()
        window.location = `edit-profil.html?/id=${id}`
    });
};

