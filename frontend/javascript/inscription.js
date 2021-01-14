goNetwork()

function getUserSignup(){
    let mail = document.getElementById('email').value
    let lastName = document.getElementById('lastName').value
    let firstName = document.getElementById('firstName').value
    let pseudo = document.getElementById('pseudo').value
    let password = document.getElementById('password').value
    let user = {
        email : mail,
        lastName : lastName,
        firstName : firstName,
        pseudo : pseudo,
        password : password
    }
    console.log(user)
    login(user)
}

function login(form){
    let data = send(`http://localhost:3000/api/signup`,form)
    data.then (user =>{
        let pseudo = user.pseudo;
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
        getUserSignup()
    })
}
