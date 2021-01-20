function profilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/pseudo');
    let data = request(`http://localhost:3000/api/` + urlParam);
    data.then(user => {
        userProfil(user);
        backNetwork(user);
        deleteUser(user);
 
    })
    /*.catch(() => {
        serverDown()
    })*/
}

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

            let data = deleteMethod (`http://localhost:3000/api/` + urlParam );
            window.location = `inscription.html`;
            data.then ( userDelete => {               
            }) 
            .catch((err) => { message : 'impossible de supprimer votre profil'
            })    
    })
}