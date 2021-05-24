function login(form) {
    let data = sendLog(`http://localhost:3000/api/auth/login`, form)
    data.then(user => {
        console.log(user)
        if (user.userId) {
            let userId = user.userId;
            window.location = `reseau.html`;

            // insertion du pseudo et du token dans le localstorage à la connexion
            userId = localStorage.setItem('userId', userId);
            userId = JSON.stringify(userId);
            let token = user.token;
            token = localStorage.setItem('token', token);
            token = JSON.stringify(token);
        } else {
            let small = document.getElementById('small-email');
            small.innerHTML = user.error;
        };
    })
        .catch((error) => {
            let small = document.getElementById('small-email');
            small.innerHTML = error;
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

