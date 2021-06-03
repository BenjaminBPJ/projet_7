/* --------------------------- Creation et affichage des publications --------------------------- */
getPosts = () => {
    let dataPost = request(`http://localhost:3000/api/posts/`);
    dataPost.then(posts => {
        let publication = posts.result;
        publication.forEach(onePublication => {
            let idPost = onePublication.id;
            let dataComment = request(`http://localhost:3000/api/comments/` + idPost);
            dataComment.then(comments => {
                if (comments){
                    let commentaire = comments.result;
                    if(onePublication.id === commentaire.publiId )
                    createOnePostWithComment(onePublication, comments)
                    /*let commentaire = comments.result;
                    let currentUser = localStorage.getItem('userId')
                    if (onePublication.userId == currentUser) {
                        createOnePostCurrentUser(onePublication, commentaire)
                    } else {
                        createOnePost(onePublication);
                    }*/
                }else{
                    createOnePostCurrentUserWithOutComment(onePublication)
                }

                
            })
                .catch((error) => {
                    console.log(error)
                })
        })
    })
        .catch((error) => {
            console.log(error)
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
        console.log(publication)
    })
        .catch((error) => {
            console.log(error)
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

