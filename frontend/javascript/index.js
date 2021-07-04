login = (form) => {
    let data = sendLog(`http://localhost:3000/api/auth/login`, form)
    data.then(user => {
        if (user.userId) {
            let userId = user.userId;
            window.location = `reseau.html`;

            // insertion du userId, du token et du role dans le localstorage à la connexion
            userId = localStorage.setItem('userId', userId);
            userId = JSON.stringify(userId);
            let token = user.token;
            token = localStorage.setItem('token', token);
            token = JSON.stringify(token);
            let role = user.role;
            role = localStorage.setItem('role', role);
            role = JSON.stringify(role);
        } else {
            let small = document.getElementById('small-email');
            small.innerHTML = user.error;
        };
    })
        .catch(() => {
            let small = document.getElementById('small-email');
            small.innerHTML = `Erreur de serveur, Impossible de se connecter.`;
        });
};

getUserLogin = () => {
    let mail = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = {
        email: mail,
        password: password
    };
    login(user);
};

goNetwork = () => {
    let button = document.getElementById("go-to-network");
    button.addEventListener('click', (e) => {
        e.preventDefault();
        getUserLogin();
    });
};

goNetwork();

