/* --------------------------- Creation et affichage des publications --------------------------- */
getPosts = () => {
    let currentUser = localStorage.getItem('userId');
    let urlPost = `http://localhost:3000/api/posts/`;
    let urlComment = `http://localhost:3000/api/comments/`;
    let dataPost = request(urlPost);
    dataPost.then(posts => {
        let publication = posts.result;
        publication.forEach(onePublication => {
            let idPost = onePublication.id;
            let urlForOnePost = urlPost + idPost;
            let urlCommentFromOnePost = urlComment + idPost;
            let dataComment = request(urlComment + idPost);
            dataComment.then(comments => {
                let commentaire = comments.result
                getPost(onePublication, commentaire)
                createComment(urlCommentFromOnePost, onePublication)
                if (onePublication.userId == currentUser) {
                    postToDelete(urlForOnePost, onePublication);
                }
                commentaire.forEach(oneComment => {
                    let idComment = oneComment.id;
                    let urlOneComment = urlComment + idComment;
                    commentToUpdate(urlOneComment, oneComment);
                    commentToDelete(urlOneComment, oneComment);
                });
            })
                .catch(() => {
                    getPost(onePublication)
                    createComment(urlCommentFromOnePost, onePublication)
                    if (onePublication.userId == currentUser) {
                        postToDelete(urlForOnePost, onePublication)
                    }
                });
        });
    })
        .catch((error) => {
        })
};

getPosts();

/* --------------------------- Envois d'une publication --------------------------- */
createPostWithImage = (post) => {
    let data = sendWithImage(`http://localhost:3000/api/posts/`, post);
    data.then(publication => {
        console.log(publication)
    })
        .catch((error) => {
            console.log(error)
        });
};

createPostWithOutImage = (post) => {
    let data = sendWithOutImage(`http://localhost:3000/api/posts/`, post);
    data.then(publication => {
        console.log('ici publication', publication)
    })
        .catch((error) => {
            console.log('ici error', error)
        });
};

getPostInfo = () => {
    let titre = document.getElementById('titre-publication').value;
    let content = document.getElementById('textarea-publi').value;
    let imageValue = document.getElementById('image-publi').files[0];

    if (imageValue) {
        let image = document.getElementById('image-publi').files[0].name;

        let postContent = {
            titre: titre,
            publication: content,
        }

        let publication = {
            post: postContent,
            image: image
        }

        createPostWithImage(publication);
    } else {
        let publication = {
            titre: titre,
            publication: content,
        }
        createPostWithOutImage(publication);
    }
};

sendPost = () => {
    let button = document.getElementById("send-post");
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getPostInfo();
        //window.location.reload()
    });
};

sendPost()

/* --------------------------- Suppression d'une publication --------------------------- */
deletePost = (url) => {
    let data = deleteMethod(url);
    data.then(post => {
    })
        .catch((err) => { err });
};

postToDelete = (url, value) => {
    let button = document.getElementById(`delete-publication${value.id}`);
    button.addEventListener('click', function (e) {
        e.preventDefault();
        deletePost(url);
        window.location.reload();
        alert(`Vous avez supprimé votre publication`)
    });
};

/* --------------------------- Envois d'un commentaire --------------------------- */
sendCommentToApi = (url, comment) => {
    let data = sendWithOutImage(url, comment);
    data.then(commentaire => {
        window.location.reload();
    })
        .catch((error) => {
            console.log(error)
        });
};

newCommentCreate = (url, post) => {
    let comment = document.getElementById(`send-comment${post.id}`).value;
    console.log(comment)
    let newCommentaire = {
        comments: comment
    };
    sendCommentToApi(url, newCommentaire);
};

createComment = (url, post) => {
    let button = document.getElementById(`sending-comment${post.id}`);
    button.addEventListener('click', function (e) {
        newCommentCreate(url, post);
    });
};

/* --------------------------- Modification d'un commentaire --------------------------- */
updateComment = (url, value) => {
    let data = update(url, value);
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

