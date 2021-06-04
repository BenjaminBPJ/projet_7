/* --------------------------- Creation et affichage des publications --------------------------- */
getPosts = () => {
    let currentUser = localStorage.getItem('userId');
    let urlPost = `http://localhost:3000/api/posts/`;
    let dataPost = request(urlPost);
    dataPost.then(posts => {
        let publication = posts.result;
        publication.forEach(onePublication => {
            let idPost = onePublication.id;
            let dataComment = request(`http://localhost:3000/api/comments/` + idPost);
            dataComment.then(comments => {
                let commentaire = comments.result
                    getPost(onePublication, commentaire)
            })
                .catch((error) => {                  
                    getPost(onePublication)
                    if (onePublication.userId == currentUser){
                        let urlForDelete = urlPost + idPost;
                        postToDelete(urlForDelete, onePublication)
                    }
                    
                })
        })
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
    .catch((err) => {err});    
}

postToDelete = (url, value) => {
    let button = document.getElementById(`delete-publication${value.id}`);
    console.log(button)
    button.addEventListener('click', function (e) {
        e.preventDefault();
        deletePost(url);
        window.location.reload();
        alert(`Vous avez supprimé votre publication`)
    });
}

/* --------------------------- Envois d'un commentaire --------------------------- */
sendCommentToApi = (postId, comment) => {
    let data = send(`http://localhost:3000/api/comments/` + postId, comment);
    data.then(commentaire => {
    })
    /*.catch((error) => {
        console.log(error)
    });*/
};

sendComment = (postId, comment) => {
    let button = document.getElementById("sending-comment");
    console.log(button)
    button.addEventListener('click', function (e) {
        //e.preventDefault();
        sendCommentToApi(postId, comment);
        //window.location.reload();
    });
}

/* --------------------------- Aller sur la page profil --------------------------- */
goToProfil = () => {
    let profil = document.getElementById('emote-profil');
    profil.addEventListener('click', function () {
        window.location = `profil.html`
    });
};

goToProfil();

