function createOnePost(value) {
    let article = document.createElement(`div`)
    document.querySelector("publication-home").appendChild(article)
    division.classList.add("publication")

    article.innerHTML = `<h3>${value.userPseudo}</h3>
                         <h4>${value.datePublication}</h4>
                        <img de la publication si il y a />
                        <p>${value.publication}</p>`
}

function userProfil(value) {
    let article = document.createElement(`article`); 
    document.querySelector("main").appendChild(article);
    console.log(value)

    article.innerHTML = `<h2>${value[0].firstName}</h2> 
                         <h3>${value[0].lastName}</h3> 
                         <img src= ${value[0].imageUrl} class="teddy"/>
                         <textarea class="profil-description">${value[0].description}</textarea>
                         <button class="back-network">retour</button>
                         <button class="delete-account">Suppression du compte</button>`
}

function serverDown() {
    let article = document.createElement(`article`) // création de l'article principal
    document.querySelector("main").appendChild(article)
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser`
}

