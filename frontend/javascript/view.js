function createOnePost(value) {
    let article = document.createElement(`div`)
    document.querySelector("publication-home").appendChild(article)
    article.classList.add("publication")

    article.innerHTML = `<h3>${value.userPseudo}</h3>
                         <h4>${value.datePublication}</h4>
                        <img de la publication si il y a />
                        <p>${value.publication}</p>`
}

function userProfil(value) {
    let article = document.createElement(`article`); 
    document.querySelector("main").appendChild(article);
    article.classList.add("profil")

    article.innerHTML = `<div class="photo-nom">
                            <h2 class="profil-title"> Profil de <br>
                            ${value[0].firstName} ${value[0].lastName}
                            </h2>
                                <div class="photo-pseudo">
                                    <i class="fas fa-pen pen-photo"></i>
                                    <img src= ${value[0].imageUrl} class="photo-profil"/>
                                    <p class="pseudo-user">Votre pseudo :<br> ${value[0].pseudo}</p>
                                </div>
                        </div>
                            <i id="pen-d" class="fas fa-pen pen-description"></i>
                            <p class="profil-description"> Description : </p>
                            <p id="text-description" class="profil-description" rows="5">${value[0].description}</p><br>
                            <textarea id="area-description" class="hidden" rows="5" placeholder="Ecrivez ici, pour modifier ou créer votre description"></textarea>
                            <button type="submit" id="b-s" class="hidden" send-description">modifier</button>
                            <button id="delete-account" class="delete-account">Suppression du compte</button>
                        `
    let backNetwork = document.createElement(`button`); 
    document.querySelector("main").appendChild(backNetwork);
    backNetwork.classList.add("back-network");
    backNetwork.setAttribute("id", 'back-to-network');

    backNetwork.textContent = 'Retour'
}

function serverDown() {
    let article = document.createElement(`article`) 
    document.querySelector("main").appendChild(article)
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser`
}

