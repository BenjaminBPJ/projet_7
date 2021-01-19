goNetwork()

function getUserLogin(){
    let mail = document.getElementById('email').value
    let password = document.getElementById('password').value
    let user = {
        email : mail,
        password : password
    }
    console.log(user)
    login(user)
}

function login(form){
    let data = send(`http://localhost:3000/api/login`,form)
    data.then (user =>{
        let pseudo = user.userPseudo;
        window.location = `reseau.html?/home/pseudo=${pseudo}`
        console.log(pseudo)

        // insertion du pseudo et du token dans le localstorage à la connexion
        pseudo = localStorage.setItem('userPseudo', pseudo)
        pseudo = JSON.stringify(pseudo)
        let token = user.token
        console.log(token)
        token = localStorage.setItem('token', token)
        token = JSON.stringify(token)
    })
    .catch((error) => ({ error }));
}


function goNetwork(){
    let button = document.getElementById("go-to-network")
    button.addEventListener('click', function (e) {
        e.preventDefault()
        getUserLogin()
    })
}

