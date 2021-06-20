/* --------------------------- Creation et affichage des publications --------------------------- */
getPosts = () => {
    let currentUser = localStorage.getItem('userId');
    let roleUser = localStorage.getItem('role');
    console.log(roleUser)
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
                deleteUpdatePostIcon(onePublication)
                postToDelete(urlForOnePost, onePublication);
                formUpdatePost(onePublication);
                makeInputUpdateAppear(onePublication);
                //sendPostToUpdate(urlForOnePost, onePublication);       
            };
            let dataComment = request(urlComment + idPost);
            dataComment.then(comments => {
                let commentaire = comments.result
                commentaire.forEach(oneComment => {
                    let idComment = oneComment.id;
                    let urlOneComment = urlComment + idComment;
                    getComment(oneComment, onePublication);
                    commentToUpdate(urlOneComment, oneComment);
                    commentToDelete(urlOneComment, oneComment);
                })
            })
                .catch((error) => {
                });
        });
    })
        .catch((error) => {
            if (error.error) {
                noPost()
            }
        })
};

getPosts();

/* --------------------------- Envois d'une publication --------------------------- */
createPostWithImage = (post) => {
    let data = sendWithImage(`http://localhost:3000/api/posts/`, post);
    data.then(publication => {
        console.log(publication)
        window.location.reload()
    })
        .catch((error) => {
            console.log(error)
        });
};

createPostWithOutImage = (post) => {
    let data = sendWithOutImage(`http://localhost:3000/api/posts/`, post);
    data.then(publication => {
        console.log('ici publication', publication)
        window.location.reload()
    })
        .catch((error) => {
            console.log('ici error', error)
        });
};

getPostInfo = () => {
    let titre = document.getElementById(`titre-publication`).value;
    let content = document.getElementById(`textarea-publi`).value;
    let imageValue = document.getElementById(`image-publi`).files[0];

    if (imageValue && titre) {
        let postContent = JSON.stringify({
            titre: titre,
            publication: content
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        createPostWithImage(data);
    } else if (titre !== "" && content !== "") {
        let publication = {
            titre: titre,
            publication: content
        };
        createPostWithOutImage(publication);
    } else {
        let small = document.getElementById('small-form-publication');
        small.innerHTML = `Veuillez écrire un titre à votre publication et y insérer un article ou une image.`;
    };
};

sendPost = () => {
    let button = document.getElementById("send-post");
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getPostInfo();
    });
};

sendPost();

/* --------------------------- Modification d'une publication --------------------------- */
updatePostWithImage = (url, postUpdate) => {
    let data = updateWithImage(url, postUpdate);
    data.then(publication => {
        console.log(publication)
        //window.location.reload()
    })
        .catch((error) => {
            console.log(error)
        });
};

updatePostWithOutImage = (url, postUpdate) => {
    let data = updateWithOutImage(url, postUpdate);
    data.then(publication => {
        console.log('ici publication', publication)
        //window.location.reload()
    })
        .catch((error) => {
            console.log('ici error', error)
        });
};

getPostInfoForUpdate = (url) => {
    let titre = document.getElementById(`new-title`).value;
    let content = document.getElementById(`new-post`).value;
    let imageValue = document.getElementById(`new-image`).files[0];

    if (imageValue && titre) {
        let postContent = JSON.stringify({
            titre: titre,
            publication: content
        });
        const data = new FormData();
        data.append('image', imageValue);
        data.append('post', postContent);
        updatePostWithImage(url, data);
    } else if (titre !== "" && content !== "") {
        let publication = {
            titre: titre,
            publication: content
        };
        updatePostWithOutImage(url, publication);
    } else {
        let small = document.getElementById('small-form-update');
        small.innerHTML = `Veuillez écrire un titre à votre publication et y insérer un article ou une image.`;
    };
};

sendPostToUpdate = (url, post) => {
    let button = document.getElementById(`send-form-update-post${post.id}`);
    button.addEventListener('click', function (e) {
        //e.preventDefault();
        getPostInfoForUpdate(url);
    });
};

// apparition des inputs de modification
makeInputUpdateAppear = (post) => {
    let button = document.getElementById(`update-publication${post.id}`);
    let form = document.getElementById(`form-modale-update${post.id}`)
    button.addEventListener('click', function (e) {
        e.preventDefault();
        form.classList.add('show');
    })
}
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
    button.addEventListener('click', function (e) {
        e.preventDefault();
        deletePost(url);
    });
};

/* --------------------------- Envois d'un commentaire --------------------------- */
sendCommentToApi = (url, comment) => {
    let data = sendWithOutImage(url, comment);
    data.then(commentaire => {
        //window.location.reload();
    })
        .catch((error) => {
            console.log(error)
        });
};

newCommentCreate = (url, post) => {
    let comment = document.getElementById(`send-comment${post.id}`).value;
    let small = document.getElementById(`small-send-comment${post.id}`);

    console.log(comment)
    if (comment === "") {
        small.innerHTML = `Veuillez écrire un commentaire.`;
    } else {
        let newCommentaire = {
            comments: comment
        };
        sendCommentToApi(url, newCommentaire);
    };
};

createComment = (url, post) => {
    let button = document.getElementById(`sending-comment${post.id}`);
    button.addEventListener('click', function (e) {
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
    console.log(comment)
    let newCommentaire = {
        comments: comment
    };
    updateComment(url, newCommentaire);
};

commentToUpdate = (url, commentaire) => {
    let button = document.getElementById(`update-comment-done${commentaire.id}`);
    button.addEventListener('click', function (e) {
        //e.preventDefault();
        newCommentUpdate(url, commentaire);
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
    button.addEventListener('click', function (e) {
        e.preventDefault();
        deleteComment(url);
    });
};

/* --------------------------- Aller sur la page profil --------------------------- */
goToProfil = () => {
    let profil = document.getElementById('emote-profil');
    profil.addEventListener('click', function () {
        window.location = `profil.html`
    });
};

goToProfil();