getPost = (value, comment) => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<header class ="header-publication">
                            <h3 class="auteur-publication">${value.firstName} ${value.lastName}</h3>
                            <h4 class="date-publication">Posté il y a ${calcTime(value.datePublication)}</h4>
                        </header>
                        <div class="texte-image-publication">
                            <h5>${value.titre}</h5>                           
                            <p>${value.publication}</p>`;

    if (value.imageUrl) {
        article.innerHTML += `<img src="${value.imageUrl}" class="image-publication" alt="image illustrant l'article" />`;
    };

    if (comment) {
        getComment(comment, article);
    } else {
        noComment(article);
    };

    article.innerHTML += `</div>
                        <input type="text" placeholder="ecrivez votre commentaire" class="input-commentaire" id="send-comment${value.id}" />
                        <input type="submit" id="sending-comment${value.id}" value="commenter" />`;

    let currentUser = localStorage.getItem('userId');
    if (value.userId == currentUser) {
        article.innerHTML += `<button type="submit" id="delete-publication${value.id}">Supprimer</button>
                              <small id="small-delete-publication"></small>
                              <button type="submit" id="update-publication">Modifier</button>
                              <small id="small-update-publication"></small>`;
    };
};

getComment = (value, article) => {
    for (i = 0; i < value.length; i++) {
        let comment = document.createElement(`div`);
        article.appendChild(comment);
        comment.classList.add("commentaire");

        comment.innerHTML = `<header class ="header-commentaire">
                                <h3 class="auteur-commentaire">${value[i].firstName} ${value[i].lastName}</h3>
                                <h4 class="date-commentaire">Il y a ${calcTime(value[i].publiAt)}</h4>
                            </header>
                            <p>${value[i].content}</p>`;

        let currentUser = localStorage.getItem('userId');
        if (value[i].userId == currentUser) {
            comment.innerHTML += `<button type="submit" id="delete-comment${value[i].id}">Supprimer</button>
                                  <small id="small-delete-comment"></small><br>
                                  <button type="submit" id="update-comment">Modifier</button><br>
                                  <input class="hidden-update-comment" id="comment-to-update${value[i].id}" />
                                  <input type="submit" class="hidden-update-comment" id="update-comment-done${value[i].id}" value="Modifier commentaire"/>
                                  <small id="small-update-comment"></small>`;
        };
    };
};

noComment = (article) => {
    let comment = document.createElement(`div`);
    article.appendChild(comment);
    comment.classList.add("commentaire");

    comment.innerHTML = `<p>Aucun commentaire</p>`
};

noPost = () => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<div class="texte-image-publication">
                            <p>Aucune publication pour le moment</p>
                        </div>`
};

userProfil = (value) => {
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

userEditProfil = (value) => {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.classList.add("profil");
    console.log(value)

    article.innerHTML = `   <form>
                                <label for="image-user"></label> 
                                <img src= ${value.result[0].imageUrl} class="photo-profil" />
                                <input type="file" name="imageUrl" id="photo-user" accept="image/*" />
                                <small id="small-edit-photo"></small>
                            </form>
                            <h2 class="profil-title">${value.result[0].firstName} ${value.result[0].lastName}</h2>
                            <form>
                            <label for="old-description-user"></label>
                            <p class="profil-description"> Description : </p>
                            <p class="ancienne-description">${value.result[0].description}</p>
                            <label for="new-description-user"></label>
                            <textarea id="new-description" type="text" placeholder="Veuillez renseigner votre description ..." class=""></textarea>
                            <button type="" id="send-profil">modifier</button>
                            </form>
                            <button id="delete-account" class="delete-account">Suppression du compte</button>
                        `;

    let backNetwork = document.createElement(`button`);
    document.querySelector("main").appendChild(backNetwork);
    backNetwork.classList.add("back-network");
    backNetwork.setAttribute("id", 'back-to-network');

    backNetwork.textContent = 'Retour';
};

serverDown = () => {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser.`;
};




calcTime = (time) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = week * 4;
    const year = month * 12;

    const dateCreation = new Date(time)
    const dateNow = new Date()

    const timeDiff = dateNow - dateCreation
    let value = 0;
    if (isNaN(timeDiff)) return NaN;
    switch (true) {
        case timeDiff > year:
            value = dateNow.getFullYear() - dateCreation.getFullYear()
            return value + " an" + value > 1 ? "s" : "";
        case timeDiff > month:
            return value = Math.floor(timeDiff / month) + " mois";
        case timeDiff > week:
            value = Math.floor(timeDiff / week);
            return value + " semaine" + (value > 1 ? "s" : "");
        case (timeDiff > day):
            value = Math.floor(timeDiff / day);
            return value + " jour" + (value > 1 ? "s" : "");
        case timeDiff > hour:
            value = Math.floor(timeDiff / hour);
            return value + " heure" + (value > 1 ? "s" : "");
        case timeDiff > minute:
            value = Math.floor(timeDiff / minute);
            return value + " minute" + (value > 1 ? "s" : "");
        case timeDiff > second:
            value = Math.floor(timeDiff / second);
            return value + " seconde" + (value > 1 ? "s" : "");
        default:
            return undefined;
    };
};

avatar = () => {
    photoProfil = `logos/icons.png`
    return photoProfil
}
