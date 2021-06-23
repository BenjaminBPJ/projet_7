getPost = (value) => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");
    article.setAttribute('id', `post-${value.id}`);

    article.innerHTML = `<header class ="header-publication">
                            <h3 class="auteur-publication">${value.firstName} ${value.lastName}</h3>
                            <h4 id="date-publication${value.id}">Posté il y a ${calcTime(value.datePublication)}</h4>                                                     
                        </header>
                        <div class="texte-image-publication">
                            <h5 class="titre-publication${value.id}">${value.titre}</h5>
                            <p class="content-publication${value.id}">${value.publication}</p>`;

    if (value.imageUrl) {
        article.innerHTML += `<img src="${value.imageUrl}" class="image-publication${value.id}" alt="image illustrant l'article" />`;
    };

    article.innerHTML += `</div>
                          <div class="input-new-comment">
                             <input type="text" placeholder="ecrivez votre commentaire" class="input-commentaire" id="send-comment${value.id}" />
                             <input type="submit" id="sending-comment${value.id}" value="commenter" />
                             <small id="small-send-comment${value.id}"></small>
                         </div>`;

};

deleteUpdatePostIcon = (value) => {
    let div = document.createElement('div');
    document.getElementById(`date-publication${value.id}`).appendChild(div);

    div.innerHTML += `<div>
                        <i class="fas fa-trash-alt" id="delete-publication${value.id}"></i>
                        <small id="small-delete-publication"></small>
                        <i class="fas fa-edit" id="update-publication${value.id}"></i>
                        <small id="small-update-publication"></small>
                     </div>`;
};

formUpdatePost = (value) => {
    let form = document.createElement(`form`);
    document.querySelector(".main-reseau").appendChild(form);
    form.setAttribute('id', `form-modale-update${value.id}`);
    form.classList.add('form-modale');

    form.innerHTML = `<form>
                            <label for="old-title">Ancien titre</label><br>
                            <p id="old-tile">${value.titre}</p>
                            <label for="new-title">Nouveau titre</label><br>
                            <input id="new-title" class="input-update-form" placeholder="écrivez votre nouveau titre" /><br>
                            <label for="old-post">ancien article</label><br>
                            <p id="old-post">${value.publication}</p>
                            <label for="new-post">Nouvel article</label><br>
                            <textarea id="new-post" class="input-update-form" placeholder="écrivez votre nouvel article"></textarea><br>
                            
                            
                            <label for="new-image">Nouvelle image</label><br>
                            <input type="file" class="input-update-form" id="new-image"/><br>
                            <button  id="close-form-update-post">Fermer</button>
                            <button  id="send-form-update-post${value.id}">Modifier</button>
                            <small id="small-form-update"></small>
                        </form>`;

    // ` if (value.imageUrl) {form.innerHTML += `<label for="old-image">ancienne image partagée</label><br<img src="${value.imageUrl}" id="old-image" />`}                  form.innerHTML += `
};

getComment = (value) => {
    let article = document.getElementById(`post-${value.publiId}`);
    let comment = document.createElement(`div`);
    article.appendChild(comment);
    comment.setAttribute(`id`, `commentaire${value.id}`);
    comment.classList.add("commentaire");

    comment.innerHTML = `<header class ="header-commentaire">
                                <h3 class="auteur-commentaire">${value.firstName} ${value.lastName}</h3>
                                <h4 class="date-commentaire">Il y a ${calcTime(value.publiAt)}</h4>
                            </header>
                            <p>${value.content}</p>`;

    let currentUser = localStorage.getItem('userId');
    let roleUser = localStorage.getItem('role');
    if (value.userId == currentUser || roleUser === 'administrateur') {
        comment.innerHTML += `<button type="submit" id="delete-comment${value.id}">Supprimer</button>
                                  <small id="small-delete-comment"></small><br>
                                  <input  id="comment-to-update${value.id}" />
                                  <input type="submit" id="update-comment-done${value.id}" value="Modifier commentaire"/>
                                  <small id="small-update-comment${value.id}"></small>`;
    };
};

noPost = () => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<div class="texte-image-publication">
                            <p>Aucune publication pour le moment</p>
                        </div>`;
};

userProfil = (value) => {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.classList.add("profil");

    article.innerHTML = `   <div class="profil-card">
                                <div class="image-and-name-user">
                                    <div class="image-user-profil"></div>
                                    <h2 class="profil-title">${value.result[0].firstName} ${value.result[0].lastName}</h2>
                                </div>
                            <p class="profil-description"> Description : </p>
                            <input type="submit" id="go-to-edit" value="Modification de votre profil" /><br>
                            <button type="submit" id="back-to-network">retour</buttton>
                            </div>
                        `;
    noUserImage(value)
    noUserDescription(value)
};

noUserImage = (value) => {
    let image = document.createElement('span');
    document.querySelector('.image-user-profil').appendChild(image);
    if (value.result[0].imageUrl === null) {
        image.innerHTML = `<img src="logos/icon.svg" class="photo-profil"/>`;
    } else {
        image.innerHTML = ` <img src="${value.result[0].imageUrl}" class="photo-profil" />`;
    };
};

noUserDescription = (value) => {
    let article = document.createElement('p');
    document.querySelector('.profil-description').appendChild(article);
    if (value.result[0].description === null) {
        article.innerHTML = `<p>Aucune description pour le moment.</p>`;
    } else {
        article.innerHTML = `<p>${value.result[0].description}</p>`;
    };
};

userEditProfil = (value) => {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.setAttribute('id', 'form-update-user');
    article.classList.add("profil-update");

    article.innerHTML = `  <div class="image-for-update">
                            <p class="user-image-edit-profil">Choississez un fichier si vous voulez modifier votre image</p>
                            <input type="file" name="image" id="image-user" accept="image/*" />   
                            </div>                            
                            <h2 class="profil-title">${value.result[0].firstName} ${value.result[0].lastName}</h2>
                            <form>
                            <label for="old-description">Description : </label>
                            <p id="old-description" >${value.result[0].description}</p>
                            <label for="new-description"></label>
                            <textarea id="new-description" type="text" rows="5" placeholder="Veuillez renseigner votre nouvelle description ..."></textarea><br>
                            <button type="submit" id="send-profil">Valider</button>
                            </form>
                            <small id="small-update-user"></small>   
                            <div class="div-button-update-user">
                            <button id="delete-account" class="button-update-user">Suppression du compte</button><br>     
                            <button id="back-to-profil" class="button-update-user">Retour au profil</buttton>  
                            </div>                 
                        `;
                        noImageUpdateUser(value)
};

noImageUpdateUser = (value) => {
    let image = document.createElement('div');
    document.querySelector('.user-image-edit-profil').appendChild(image);
    image.classList.add('photo-user-before-edit')
    if (value.result[0].imageUrl === null) {
        image.innerHTML = `<img src="logos/icon.svg" class="photo-profil"/>`;
    } else {
        image.innerHTML = ` <img src="${value.result[0].imageUrl}" class="photo-profil" />`;
    };
};

noProfil = () => {
    let article = document.createElement(`div`);
    document.querySelector("main").appendChild(article);

    article.innerHTML = `<p class="no-server">Impossible de charger votre profil,<br>
                            veuillez réessayer ultérieurement.</p>`;
};

calcTime = (time) => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = week * 4;
    const year = month * 12;

    const dateCreation = new Date(time);
    const dateNow = new Date();

    const timeDiff = dateNow - dateCreation;
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
        case timeDiff < second:
            value = Math.floor(timeDiff / second);
            return "moins d'une seconde";
        default:
            return undefined;
    };
};

/*<div class="profil-card">
                            <img src= "${value.result[0].imageUrl}" class="photo-profil"/>
                            <h2 class="profil-title">${value.result[0].firstName} ${value.result[0].lastName}</h2>
                            <p class="profil-description"> Description : </p>
                            <p id="text-description" class="profil-description" rows="5">${value.result[0].description}</p><br>
                            <button type="submit" id="goToEdit">Modification de votre profil</buttton>
                            <button type="submit" id="back-to-network">retour</buttton>
                            </div>*/