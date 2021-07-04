getPost = (value) => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");
    article.setAttribute('id', `post-${value.id}`);

    article.innerHTML = `<header class ="header-publication">
                            <h3 class="auteur-publication${value.id} auteur-publication">
                                <p class="name-auteur">${value.firstName} ${value.lastName}</p>
                            </h3>
                            <h4 id="date-publication${value.id}" class="date-publication-post">Posté il y a ${calcTime(value.datePublication)}</h4>                                                     
                        </header>
                        <div class="texte-image-publication">
                            <h5 class="titre-publication${value.id} titre-publication">${value.titre}</h5>
                            <p class="content-publication${value.id} content-publication">${value.publication}</p>`;

    if (value.imageUrl) {
        article.innerHTML += `<img src="${value.imageUrl}" class="image-publication${value.id} image-publication" alt="image illustrant l'article" />`;
    };

    article.innerHTML += `</div>
                          <div class="input-new-comment">
                             <textarea type="text" placeholder="Ecrivez votre commentaire" class="input-commentaire" id="send-comment${value.id}"></textarea>
                             <input type="submit" id="sending-comment${value.id}" class="button-comment-post" value="Commenter" />
                         </div>
                         <small id="small-send-comment${value.id}" class="small small-input-new-comment"></small>`;

                         imageUser(value)
};

deleteUpdatePostIcon = (value) => {
    let div = document.createElement('div');
    document.getElementById(`date-publication${value.id}`).appendChild(div);

    div.innerHTML += `<div>
                        <i class="fas fa-trash-alt" id="delete-publication${value.id}"></i>
                        <small id="small-delete-publication"></small>
                        <i class="fas fa-edit" id="update-publication${value.id}"></i>
                        <small id="small-update-publication" class="small"></small>
                     </div>`;
};

imageUser = (value) => {
    let imageUser = document.createElement('div')
    document.querySelector(`.auteur-publication${value.id}`).appendChild(imageUser)
    if (value.usersimageUrl !== null){
        imageUser.innerHTML = `<img src="${value.usersimageUrl}" class="photo-user-publication" />`
    }else{
        imageUser.innerHTML = `<img src="logos/icon.svg"  class="photo-user-publication"/>`
    }
}

formUpdatePost = (value) => {
    let form = document.createElement(`form`);
    document.querySelector(".main-reseau").appendChild(form);
    form.setAttribute('id', `form-modale-update${value.id}`);
    form.classList.add('form-modale');

    form.innerHTML = `<form aria-hidden="true">
                            <label for="new-title" class="label-form-modale">Titre</label>
                            <input id="new-title" class="input-update-form" placeholder="écrivez votre nouveau titre" value="${value.titre}"/>
                            <label for="new-post" class="label-form-modale">Article</label>
                            <textarea id="new-post" class="input-update-form" placeholder="écrivez votre nouvel article" rows="5">${value.publication}</textarea>
                            <div class="ask-image">
                                <label for="new-image">Vous vous changer votre image de plublication ?</label>
                                <input type="file" class="input-update-form input-file-modale" id="new-image"/><br>
                            </div>
                            <div class="old-image-publication${value.id}"></div>  
                            <div class="button-form-update-post">
                                <button type="submit" id="close-form-update-post" class="pointer-input button-modale-update-post">Annuler</button>
                                <button type="submit" id="send-form-update-post${value.id}" class="pointer-input button-modale-update-post">Valider</button>
                            </div>
                            <small id="small-form-update" class="small"></small>
                      </form>`;

                      postImage(value)
};

postImage = (value) => {
    let image = document.createElement('div')
    document.querySelector(`.old-image-publication${value.id}`).appendChild(image);
    if (value.imageUrl !== null) {
        image.innerHTML = ` <img src="${value.imageUrl}" class="image-publication-modale" alt="image de publication de l'utilisateur" />`;
    }else{
        image.innerHTML = ` <img src="logos/icon.svg" class="image-publication-modale" alt="logo de l'entreprise Groupomania car l'utilisateur n'a pas utilisé d'image pour sa publication"/>`;
    }
};


getComment = (value) => {
    let article = document.getElementById(`post-${value.publiId}`);
    let comment = document.createElement(`div`);
    article.appendChild(comment);
    comment.setAttribute(`id`, `commentaire${value.id}`);
    comment.classList.add("commentaire");

    let currentUser = localStorage.getItem('userId');
    let roleUser = localStorage.getItem('role');
    if (value.userId == currentUser || roleUser === 'administrateur') {
        comment.innerHTML = `<header class="header-commentaire">
                                <h3 class="auteur-commentaire">${value.firstName} ${value.lastName}</h3>
                                <h4 class="date-commentaire">Il y a ${calcTime(value.publiAt)}</h4>
                            </header>
                            <div class="content-commentaire${value.id} showCommentaire">
                                <i class="fas fa-trash-alt" id="delete-comment${value.id}"></i>
                                <i class="fas fa-edit" id="update-comment${value.id}"></i>
                                <p>${value.content}</p>
                            </div>
                            <div class="modifCom${value.id} hideCommentaire">           
                                <textarea id="comment-to-update${value.id}">${value.content}</textarea>
                                <input type="submit" id="update-comment-done${value.id}" value="Modifier commentaire">
                                <small id="small-update-comment${value.id}"></small>
                            </div>`;
    } else {
        comment.innerHTML = `<header class="header-commentaire">
                                <h3 class="auteur-commentaire">${value.firstName} ${value.lastName}</h3>
                                <h4 class="date-commentaire">Il y a ${calcTime(value.publiAt)}</h4>
                            </header>
                            <div class="commentaire${value.id}">
                                <p>${value.content}</p>
                            </div>`;
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
                            <input type="submit" id="go-to-edit" value="Modification de votre profil" class="pointer-input" /><br>
                            <button type="submit" id="back-to-network" class="pointer-input">retour</buttton>
                            </div>
                        `;
    noUserImage(value)
    noUserDescription(value)
};

noUserImage = (value) => {
    let image = document.createElement('span');
    document.querySelector('.image-user-profil').appendChild(image);
    if (value.result[0].imageUrl === null) {
        image.innerHTML = `<img src="logos/icon.svg" class="photo-profil" alt="image illustrant l'utilisateur"/>`;
    } else {
        image.innerHTML = ` <img src="${value.result[0].imageUrl}" class="photo-profil" alt="image illustrant l'utilisateur" />`;
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
                            <small id="small-update-user" class="small"></small>   
                            <div class="div-button-update-user">
                                <button type="submit" id="delete-account" class="button-update-user">Suppression du compte</button><br>     
                                <button type="submit" id="back-to-profil" class="button-update-user">Retour au profil</buttton>  
                            </div>                 
                        `;
    noImageUpdateUser(value)
};

noImageUpdateUser = (value) => {
    let image = document.createElement('div');
    document.querySelector('.user-image-edit-profil').appendChild(image);
    image.classList.add('photo-user-before-edit')
    if (value.result[0].imageUrl === null) {
        image.innerHTML = `<img src="logos/icon.svg" class="photo-profil" alt="image illustrant l'utilisateur" />`;
    } else {
        image.innerHTML = ` <img src="${value.result[0].imageUrl}" class="photo-profil" alt="image illustrant l'utilisateur"/>`;
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

escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};