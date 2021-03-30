function login(form){
    let data = send(`http://localhost:3000/api/login`,form)
    data.then (user =>{
        window.location = `reseau.html`
        
        // insertion du pseudo et du token dans le localstorage à la connexion
        let userId = user.userId;
        userId = localStorage.setItem('userId', userId);
        userId = JSON.parse(userdId);
        let token = user.token;
        token = localStorage.setItem('token', token);
        token = JSON.stringify(token);
    })
    .catch((error) => ({ error }));
}

function getUserLogin(){
    let mail = document.getElementById('email').value
    let password = document.getElementById('password').value
    let user = {
        email : mail,
        password : password
    }
    login(user)   
}

function goNetwork(){
    let button = document.getElementById("go-to-network")
    button.addEventListener('click', function (e) {
        e.preventDefault()
        getUserLogin()
    })
}

goNetwork()
