function createOnePost(value) {
    console.log(value.id)
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<header class ="header-publication">
                            <h3 class="auteur-publication">${value.userId}</h3>
                            <h4 class="date-publication">${value.datePublication}</h4>
                        </header>
                        <div class="texte-image-publication">
                            <h5>${value.titre}</h5>
                            <p>${value.publication}</p>
                            <img src="backend/images/${value.imageUrl}" class="image-publication" />
                        </div>
                        <input type="" placeholder="ecrivez votre commentaire" class="input-commentaire" id="send-comment" />
                        <button type="submit" id="sending-comment">commenter</button>`  

};

function createOneComment(value) {
    let article = document.createElement(`div`);
    document.querySelector(".texte-image-publication").appendChild(article);
    article.classList.add("commentaire");

    article.innerHTML = `<header class ="header-commentaire">
                            <div class="image-nom-commentaire">
                                <img src="backend/images/${value.imageUrl}" class="" />
                                <h3 class="auteur-commentaire">${value.userFirstName} ${value.userLastName}</h3>
                            </div>
                            <h4 class="date-commentaire">${value.publiAt}</h4>
                        </header>
                        <p>${value.content}</p>`
};

function userProfil(value) {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.classList.add("profil");
    console.log(value)

    article.innerHTML = `   <img src= "${value.result[0].imageUrl}" class="photo-profil"/>
                            <h2 class="profil-title">${value.result[0].firstName} ${value.result[0].lastName}</h2>
                            <p class="profil-description"> Description : </p>
                            <p id="text-description" class="profil-description" rows="5">${value.result[0].description}</p><br>
                            <button id="goToEdit">Modification de votre profil</buttton>
                        `;

    let backNetwork = document.createElement(`button`);
    document.querySelector("main").appendChild(backNetwork);
    backNetwork.classList.add("back-network");
    backNetwork.setAttribute("id", 'back-to-network');

    backNetwork.textContent = 'Retour';
};

function userEditProfil(value) {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.classList.add("profil");
    console.log(value)

    article.innerHTML = `   <form> 
                                <img src= ${value.result[0].imageUrl} class="photo-profil" />
                                <input type="file" name="imageUrl" id="photo-user" accept="image/*" />
                                <small id="small-edit-photo"></small>
                            </form>
                            <h2 class="profil-title">${value.result[0].firstName} ${value.result[0].lastName}</h2>
                            <form>
                            <p class="profil-description"> Description : </p>
                            <p class="ancienne-description">${value.result[0].description}</p>
                            <label for="description"></label>
                            <textarea id="new-description" type="text" placeholder="Veuillez renseigner votre description ..." class=""></textarea>
                            <input type="submit" class="send-profil"/>
                            </form>
                            <button id="delete-account" class="delete-account">Suppression du compte</button>
                        `;

    let backNetwork = document.createElement(`button`);
    document.querySelector("main").appendChild(backNetwork);
    backNetwork.classList.add("back-network");
    backNetwork.setAttribute("id", 'back-to-network');

    backNetwork.textContent = 'Retour';
};

function serverDown() {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser.`;
};

function badEmail() {
    let small = document.getElementById('small-email');
    small.innerHTML = `Votre email est incorrect.`;
};

function badPassword() {
    let small = document.getElementById('small-password');
    small.innerHTML = `Votre mot de passe est incorrect.`;
};

function tooManyRequests() {
    let small = document.getElementById('small-email');
    small.innerHTML = `Vous avez eu trop d'échecs de connexion, veuillez attendre 3 minutes.`;
};

