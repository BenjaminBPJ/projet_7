/* --------------------------- Creation et affichage des publications --------------------------- */
function getPosts() {
    let dataPost = request(`http://localhost:3000/api/posts/`);
    dataPost.then(posts => {
        for (let post of posts.result) {
            let idPost = post.id;
            let dataComment = request(`http://localhost:3000/api/comments/` + idPost);
            dataComment.then(commentsFromApi => {
                createOnePost(post);

                let commentToSend = document.getElementById('send-comment').value;
                console.log(commentToSend)
                let comment = {
                    comments: commentToSend
                };
                console.log(comment)
                sendComment(idPost, comment);

                for (let commentaire of commentsFromApi.result) {
                    createOneComment(commentaire)
                }
            })
        }
        /*.catch((error) => {
         });*/
    })
    /*.catch((error) => {
    });*/
};

getPosts();

/* --------------------------- Envois d'une publication --------------------------- */
function createPost(post) {
    let data = sendPostToApi(`http://localhost:3000/api/posts/`, post);
    data.then(post => {
        console.log(post);
    })
    /*.catch((error) => {
        console.log(error)
        serverDown();
    });*/
};

function getPostInfo() {
    let titre = document.getElementById('titre-publication').value;
    let content = document.getElementById('textarea-publi').value;
    let image = document.getElementById('image-publi').files[0];
    let formData = new FormData()
    formData.append('image', image);
    formData.append("post", JSON.stringify({
        titre: titre,
        publication: content
    }));
    createPost(formData);
};

function sendPost() {
    let button = document.getElementById("send-post");
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getPostInfo();
        window.location.reload()
    });
};

sendPost()

/* --------------------------- Envois d'un commentaire --------------------------- */
function sendCommentToApi(postId, comment) {
    let data = send(`http://localhost:3000/api/comments/` + postId, comment);
    data.then(commentaire => {
    })
    /*.catch((error) => {
        console.log(error)
        serverDown();
    });*/
};

function sendComment(postId, comment) {
    let button = document.getElementById("sending-comment");
    console.log(button)
    button.addEventListener('click', function (e) {
        //e.preventDefault();
        sendCommentToApi(postId, comment);
        //window.location.reload();
    });
}

/* --------------------------- Aller sur la page profil --------------------------- */
function goToProfil() {
    let profil = document.getElementById('emote-profil');
    let id = JSON.parse(localStorage.getItem('userId'));
    profil.addEventListener('click', function () {
        window.location = `profil.html?/id=${id}`
    });
};

goToProfil();

