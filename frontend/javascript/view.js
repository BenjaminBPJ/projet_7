createOnePostWithComment = (value, comment) => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<header class ="header-publication">
                            <h3 class="auteur-publication">${value.firstName} ${value.lastName}</h3>
                            <h4 class="date-publication">${calcTime(value.datePublication)}</h4>
                        </header>
                        <div class="texte-image-publication">
                            <h5>${value.titre}</h5>
                            <p>${value.publication}</p>
                            <img src="${value.imageUrl}" class="image-publication" />
                        </div>
                        <input type="text" placeholder="ecrivez votre commentaire" class="input-commentaire" id="send-comment" />
                        <input type="submit" id="sending-comment" value="commenter" />`

                        createOneComment(comment)
                                                                         
};

createOnePostCurrentUserWithOutComment = (value) => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<header class ="header-publication">
                            <h3 class="auteur-publication">${value.firstName} ${value.lastName}</h3>
                            <h4 class="date-publication">${calcTime(value.datePublication)}</h4>
                        </header>
                        <div class="texte-image-publication">
                            <h5>${value.titre}</h5>
                            <p>${value.publication}</p>
                            <img src="${value.imageUrl}" class="image-publication" />
                        </div>
                        <input type="" placeholder="ecrivez votre commentaire" class="input-commentaire" id="send-comment" />
                        <button type="submit" id="sending-comment">commenter</button>
                        <button type="submit" id="delete">supprimer</button>`
noComment()
};

noPost = () => {
    let article = document.createElement(`div`);
    document.querySelector("h3").appendChild(article);
    article.classList.add("publication");

    article.innerHTML = `<div class="texte-image-publication">
                            <p>Aucune publication pour le moment</p>
                        </div>`
};

createOneComment = (value) => {
    console.log(value)
    let article = document.createElement(`div`);
    document.querySelector(".texte-image-publication").appendChild(article);
    article.classList.add("commentaire", "hidden-com");

    for (i = 0; i < value.length; i++){
        article.innerHTML = `<header class ="header-commentaire">
        <div class="image-nom-commentaire">
            <img src="${value[i].usersimageUrl}" class="photo-profil" />
            <h3 class="auteur-commentaire">${value[i].firstName} ${value[i].lastName}</h3>
        </div>
        <h4 class="date-commentaire">${calcTime(value[i].publiAt)}</h4>
    </header>
    <p>${value[i].content}</p>`
    }


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

serverDown = () => {
    let article = document.createElement(`article`);
    document.querySelector("main").appendChild(article);
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser.`;
};

noComment = () => {
    let article = document.createElement(`div`);
    document.querySelector(".texte-image-publication").appendChild(article);
    article.classList.add("commentaire");

    article.innerHTML = `<p>Aucun commentaire</p>`
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
            value = date2.getFullYear() - date1.getFullYear()
            return value + " an" + value > 1 ? "s" : "";
        case timeDiff > month:
            return (
                (dateNow.getFullYear() * 12 + date2.getMonth()) -
                (dateCreation.getFullYear() * 12 + date1.getMonth())
            ) + " mois";
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
