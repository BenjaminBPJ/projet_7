/* --------------------------- Creation et affichage des publications --------------------------- */
getPosts = () => {
    let currentUser = localStorage.getItem('userId');
    let roleUser = localStorage.getItem('role');
    let urlPost = `http://localhost:3000/api/posts/`;
    let urlComment = `http://localhost:3000/api/comments/`;
    let dataPost = request(urlPost);
    dataPost.then(posts => {
        let publication = posts.result;
        publication.forEach(onePublication => {
            let idPost = onePublication.id;
            let urlForOnePost = urlPost + idPost;
            let urlCommentFromOnePost = urlComment + idPost;
            getPost(onePublication);
            createComment(urlCommentFromOnePost, onePublication);
            if (onePublication.userId == currentUser || roleUser === 'administrateur') {
                deleteUpdatePostIcon(onePublication);
                postToDelete(urlForOnePost, onePublication);
                formUpdatePost(onePublication);
                makeInputUpdateAppear(onePublication);
                sendPostToUpdate(urlForOnePost, onePublication);
            };
            let dataComment = request(urlComment + idPost);
            dataComment.then(comments => {
                let commentaire = comments.result;
                commentaire.forEach(oneComment => {
                    let idComment = oneComment.id;
                    let urlOneComment = urlComment + idComment;
                    getComment(oneComment);
                    if (oneComment.userId == currentUser || roleUser === 'administrateur') {
                        commentToUpdate(urlOneComment, oneComment);
                        commentToDelete(urlOneComment, oneComment);
                        makeInputCommentUpdateAppear(oneComment);
                    };
                });
            })
                .catch((error) => {
                });
        });
    })
        .catch((error) => {
            noPost();
        });
};

getPosts();

/* --------------------------- Envois d'une publication --------------------------- */
createPostWithImage = (post) => {
    let data = sendWithImage(`http://localhost:3000/api/posts/`, post);
    data.then(publication => {
        window.location.reload();
    })
        .catch((error) => {
            console.log(error);
        });
};

createPostWithOutImage = (post) => {
    let data = sendWithOutImage(`http://localhost:3000/api/posts/`, post);
    data.then(publication => {
        window.location.reload();
    })
        .catch((error) => {
        });
};

getPostInfo = () => {
    let titre = document.getElementById(`titre-publication`).value;
    let content = document.getElementById(`textarea-publi`).value;
    let imageValue = document.getElementById(`image-publi`).files[0];

    if (imageValue && titre) {
        let postContent = JSON.stringify({
            titre: escapeHtml(titre),
            publication: escapeHtml(content)
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        createPostWithImage(data);
    } else if (titre !== "" && content !== "") {
        let publication = {
            titre: escapeHtml(titre),
            publication: escapeHtml(content)
        };
        createPostWithOutImage(publication);
    } else {
        let small = document.getElementById('small-form-publication');
        small.innerHTML = `Veuillez écrire un titre à votre publication et y insérer un article ou une image.`;
    };
};

sendPost = () => {
    let button = document.getElementById("send-post");
    let form = document.querySelector(".form-publication")
    button.addEventListener('click', (e) => {
        e.preventDefault();
        getPostInfo();
        form.reset();
    });
};

sendPost();

/* --------------------------- Modification d'une publication --------------------------- */
// fetch = envois d'un FormData ( car il y a un file ) au back pour modifier la publication 
updatePostWithImage = (url, postUpdate) => {
    let data = updateWithImage(url, postUpdate);
    data.then(publication => {
        window.location.reload();
    })
        .catch((error) => {
            console.log(error);
        });
};

// fecth = envois de données sous format JSON au back pour faire la modification
updatePostWithOutImage = (url, postUpdate) => {
    let data = updateWithOutImage(url, postUpdate);
    data.then(publication => {
        window.location.reload();
    })
        .catch((error) => {
        });
};

getPostInfoForUpdate = (url, postValue) => {
    let titre = document.getElementById(`new-title${postValue.id}`).value;
    let content = document.getElementById(`new-post${postValue.id}`).value;
    let imageValue = document.getElementById(`new-image${postValue.id}`).files[0];
    let oldContent = postValue.publication;
    let oldTitle = postValue.titre;

    // Si il y a tout de remplis dans le formulaire
    if (imageValue && titre && content) {
        let postContent = JSON.stringify({
            titre: escapeHtml(titre),
            publication: escapeHtml(content)
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        updatePostWithImage(url, data);

        // Si juste l'image est changée
    } else if (imageValue && titre === "" && content === "") {
        let postContent = JSON.stringify({
            titre: oldTitle,
            publication: oldContent
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        updatePostWithImage(url, data);

        // Si tout est changé sauf le message de publication
    } else if (imageValue && titre !== "" && content === "") {
        let postContent = JSON.stringify({
            titre: escapeHtml(titre),
            publication: oldContent
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        updatePostWithImage(url, data);

        // Si tout est changé sauf le titre
    } else if (imageValue && titre === "" && content !== "") {
        let postContent = JSON.stringify({
            titre: oldTitle,
            publication: escapeHtml(content)
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        updatePostWithImage(url, data);

        // Si le titre et l'article sont modifiés
    } else if (!imageValue && titre !== "" && content !== "") {
        let publication = {
            titre: escapeHtml(titre),
            publication: escapeHtml(content)
        };
        updatePostWithOutImage(url, publication);

        // Si juste l'article est modifié
    } else if (!imageValue && titre === "" && content !== "") {
        let publication = {
            titre: oldTitle,
            publication: escapeHtml(content)
        };
        updatePostWithOutImage(url, publication);

        // Si juste le titre est modifié
    } else if (!imageValue && titre !== "" && content === "") {
        let publication = {
            titre: escapeHtml(titre),
            publication: oldContent
        };
        updatePostWithOutImage(url, publication);

        // Si rien n'a été modifié on envois un message d'erreur à l'utilisateur
    } else {
        let small = document.getElementById('small-form-update');
        small.innerHTML = `Veuillez écrire un titre à votre publication et y insérer un article ou une image avant de cliquer sur modifier.`;
    };
};

sendPostToUpdate = (url, post) => {
    let button = document.getElementById(`send-form-update-post${post.id}`);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        getPostInfoForUpdate(url, post);
    });
};

// apparition des inputs de modification
makeInputUpdateAppear = (post) => {
    let button = document.getElementById(`update-publication${post.id}`);
    let form = document.getElementById(`form-modale-update${post.id}`);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        form.classList.add('show');
    });
};
/* --------------------------- Suppression d'une publication --------------------------- */
deletePost = (url) => {
    let data = deleteMethod(url);
    data.then(post => {
        window.location.reload();
        alert(`Vous avez supprimé votre publication`);
    })
        .catch((err) => { err });
};

postToDelete = (url, value) => {
    let button = document.getElementById(`delete-publication${value.id}`);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        deletePost(url);
    });
};

/* --------------------------- Envois d'un commentaire --------------------------- */
sendCommentToApi = (url, comment) => {
    let data = sendWithOutImage(url, comment);
    data.then(commentaire => {
        window.location.reload();
    })
        .catch((error) => {
            console.log(error);
        });
};

newCommentCreate = (url, post) => {
    let comment = document.getElementById(`send-comment${post.id}`).value;
    let small = document.getElementById(`small-send-comment${post.id}`);

    // envois d'une erreur si rien n'est écris
    if (comment === "") {
        small.innerHTML = `Veuillez écrire un commentaire.`;
    } else {
        let newCommentaire = {
            comments: escapeHtml(comment)
        };
        sendCommentToApi(url, newCommentaire);
    };
};

createComment = (url, post) => {
    let button = document.getElementById(`sending-comment${post.id}`);
    button.addEventListener('click', (e) => {
        newCommentCreate(url, post);
    });
};

/* --------------------------- Modification d'un commentaire --------------------------- */
updateComment = (url, value) => {
    let data = updateWithOutImage(url, value);
    data.then(comment => {
        window.location.reload();
    })
        .catch((error) => {
        });
};

newCommentUpdate = (url, commentaire) => {
    let comment = document.getElementById(`comment-to-update${commentaire.id}`).value;
    if (comment === "") {
        let small = document.getElementById(`small-update-comment${commentaire.id}`);
        small.innerHTML = `Veuillez écrire un commentaire pour le modifier.`;
    } else {
        let newCommentaire = {
            comments: escapeHtml(comment)
        };
        updateComment(url, newCommentaire);
    };
};

commentToUpdate = (url, commentaire) => {
    let button = document.getElementById(`update-comment-done${commentaire.id}`);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        newCommentUpdate(url, commentaire);
    });
};

// apparition input modif commentaire
makeInputCommentUpdateAppear = (commentaire) => {
    let button = document.getElementById(`update-comment${commentaire.id}`);
    let input = document.querySelector(`.modifCom${commentaire.id}`);
    let oldComment = document.querySelector(`.content-commentaire${commentaire.id}`);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        input.classList.remove('hideCommentaire');
        oldComment.classList.add('hideCommentaire');
    });
};

/* --------------------------- Suppression d'un commentaire --------------------------- */
deleteComment = (url) => {
    let data = deleteMethod(url);
    data.then(comment => {
        window.location.reload();
    })
        .catch((err) => { err });
};

commentToDelete = (url, value) => {
    let button = document.getElementById(`delete-comment${value.id}`);
    button.addEventListener('click', (e) => {
        e.preventDefault();
        deleteComment(url);
    });
};

/* --------------------------- Aller sur la page profil --------------------------- */
goToProfil = () => {
    let profil = document.getElementById('emote-profil');
    profil.addEventListener('click', () => {
        window.location = `profil.html`;
    });
};

goToProfil();