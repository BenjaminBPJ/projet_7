signup = (form) => {
    let data = sendLog(`http://localhost:3000/api/auth/signup`, form);
    data.then(user => {
        let userId = user.userId;
        window.location = `reseau.html`;

        userId = localStorage.setItem('userId', userId);
        userId = JSON.stringify(userId);
        let token = user.token;
        token = localStorage.setItem('token', token);
        token = JSON.stringify(token);
    })
        .catch((error) => ({ error }));
};

getUserSignup = () => {
    let mail = document.getElementById('email').value;
    let lastName = document.getElementById('lastName').value;
    let firstName = document.getElementById('firstName').value;
    let password = document.getElementById('password').value;
    let user = {
        email: mail,
        lastName: lastName,
        firstName: firstName,
        password: password
    };
    signup(user);
};

emailValide = (inputEmail) => {
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

lastNameValide = (inputName) => {
    let nameRegExp = new RegExp(`^[A-Za-zÀ-ÖØ-öø-ÿ-]+( {0,1}[A-Za-zÀ-ÖØ-öø-ÿ-]?){1,60}$`, 'g');
    let testName = nameRegExp.test(inputName.value);
    let small = document.getElementById(`small-lastName`);
    if (testName) {
        small.innerHTML = `Nom valide.`;
        return true;
    } else {
        small.innerHTML = `Merci d'écrire votre nom en toutes lettres.`;
        return false;
    };
};

firstNameValide = (inputName) => {
    let nameRegExp = new RegExp(`^[A-Za-zÀ-ÖØ-öø-ÿ-]+( {0,1}[A-Za-zÀ-ÖØ-öø-ÿ-]?){1,60}$`, 'g');
    let testName = nameRegExp.test(inputName.value);
    let small = document.getElementById(`small-firstName`);
    if (testName) {
        small.innerHTML = `Prénom valide.`;
        return true;
    } else {
        small.innerHTML = `Merci d'écrire votre prénom en toutes lettres.`;
        return false;
    };
};

passwordValide = (inputPassword) => {
    let passwordRegExp = new RegExp(`^(?=.{8,})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$`, `g`);
    let testPassword = passwordRegExp.test(inputPassword.value);
    let small = document.getElementById(`small-password`);
    if (testPassword) {
        small.innerHTML = `Mot de passe valide.`;
        return true;
    } else {
        small.innerHTML = `Votre mot de passe doit contenir au moins un chiffre, une minuscule, une majuscule et être composé de 8 caractères minimum !`;
        return false;
    };
};

confirmPassword = () => {
    let mdp = document.getElementById('password').value;
    console.log(mdp)
    let confirmMdp = document.getElementById('confirmPassword').value;
    console.log(confirmMdp)
    let small = document.getElementById(`small-confirmPassword`);

    if (mdp !== confirmMdp) {
        small.innerHTML = `Votre mot de passe n'est pas le même.`;
        return false;
    } else {
        small.innerHTML = `Votre mot de passe est correct.`;
        return true;
    };
};

validForm = () => {
    let form = document.getElementById("sign-up-form");
    // validation du formulaire
    form.email.addEventListener('change', function () {
        emailValide(this);
    });
    form.lastName.addEventListener('change', function () {
        lastNameValide(this);
    });
    form.firstName.addEventListener('change', function () {
        firstNameValide(this);
    });
    form.password.addEventListener('change', function () {
        passwordValide(this);
    });
    form.confirmPassword.addEventListener('change', function () {
        confirmPassword(this);
    });
};

goNetwork = () => {
    let form = document.getElementById("sign-up-form");
    let button = document.getElementById("go-to-network");

    button.addEventListener('click', function (e) {
        e.preventDefault();
        if (emailValide(form.email) && lastNameValide(form.lastName) && firstNameValide(form.firstName) && passwordValide(form.password) && confirmPassword(form.confirmPassword)) {
            getUserSignup();
        };
    });
};

validForm();
goNetwork();


