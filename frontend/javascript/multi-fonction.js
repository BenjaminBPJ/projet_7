function backNetwork() {
    let button = document.getElementById('back-to-network');
    button.addEventListener('click', function () {
        window.location = `reseau.html`;
    });
};

function emailValide(inputEmail) {
    let emailRegExp = /^[\w-]+(\.[\w-]+)*@groupomania.fr?$/;
    let testEmail = emailRegExp.test(inputEmail.value);
    let small = document.getElementById(`small-email`);
    if (testEmail) {
        small.innerHTML = `Email valide.`;
        return true;
    } else {
        small.innerHTML = `Merci d'écrire une adresse mail de notre entreprise valide.`;
        return false;
    };
};
