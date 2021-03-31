function createOnePost(value) {
    console.log(value);
    let article = document.createElement(`div`);
    document.querySelector("h4").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<h3>${value.userPseudo}</h3>
                         <h4>${value.datePublication}</h4>
                        <p>${value.publication}</p>`
};

function userProfil(value) {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.classList.add("profil");
    
    article.innerHTML = `   <img src= ${value[0].imageUrl} class="photo-profil"/>
                            <h2 class="profil-title">${value[0].firstName} ${value[0].lastName}</h2>
                            <p class="profil-description"> Description : </p>
                            <p id="text-description" class="profil-description" rows="5">${value[0].description}</p><br>
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
    
    article.innerHTML = `   <form> 
                                <img src= ${value[0].imageUrl} class="photo-profil"/>
                                <input type="file" name="sampleFile" accept="image/*"/>
                                <small id="small-edit-photo"></small>
                                <input type="submit"/>
                            </form>
                            <h2 class="profil-title">${value[0].firstName} ${value[0].lastName}</h2>
                            <form>
                            <p class="profil-description"> Description : </p>
                            <label for="description"></label>
                            <textarea id="new-description" type="text" placeholder="Veuillez renseigner votre description ..." class=""></textarea>
                            <input type="submit"/>
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
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser`;
};

