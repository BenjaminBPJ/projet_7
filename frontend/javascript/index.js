function login(form) {
    let data = send(`http://localhost:3000/api/auth/login`, form)
    data.then(user => {
        if (user === 1 ) {
            return badEmail();
        };
        if (user === 2 ) {
            return badPassword();
        };
        if (user === 3 ) {
            return tooManyRequests();
        };

        let userId = user.userId;
        window.location = `reseau.html?/userId=${userId}`;

        // insertion du pseudo et du token dans le localstorage à la connexion
        userId = localStorage.setItem('userId', userId);
        userId = JSON.stringify(userId);
        let token = user.token;
        token = localStorage.setItem('token', token);
        token = JSON.stringify(token);
    })
        .catch((error) => {
        });
};

function getUserLogin() {
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = {
        email: mail,
        password: password
    };
    login(user);
};

function goNetwork() {
    let button = document.getElementById("go-to-network");
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getUserLogin();
    });
};

goNetwork();
