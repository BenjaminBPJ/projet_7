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
    signup(user)
}

function signup(form){
    let data = send(`http://localhost:3000/api/signup`,form)
    data.then (user => {
        window.location = `index.html`
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
