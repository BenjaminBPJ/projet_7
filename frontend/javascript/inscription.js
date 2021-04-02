goNetwork()

function getUserSignup(){
    let mail = document.getElementById('email').value
    let lastName = document.getElementById('lastName').value
    let firstName = document.getElementById('firstName').value
    let password = document.getElementById('password').value
    let user = {
        email : mail,
        lastName : lastName,
        firstName : firstName,
        password : password
    }
    console.log(user)
    signup(user)
}

function signup(form){
    let data = send(`http://localhost:3000/api/signup`,form)
    data.then (user => {
        let userId = user.userId
        window.location = `reseau.html/userId=${userId}`
     
        userId = localStorage.setItem('userId', userId)
        userId = JSON.stringify(userdId)
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
        getUserSignup()
    })
}
