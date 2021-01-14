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
        window.location = `reseau.html?pseudo=${pseudo}`
        console.log(pseudo)
        console.log(user)
    })
    .catch((error) => ({ error }));
}


function goNetwork(){
    let button = document.getElementById("go-to-network")
    button.addEventListener('click', function (e) {
        e.preventDefault()
        getUser()
    })
}

