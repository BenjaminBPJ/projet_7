/* --------------------------- Creation et affichage des publications --------------------------- */
function getPosts() {
    let dataPost = request(`http://localhost:3000/api/posts/`);
    dataPost.then(posts => {
        for (let post of posts.result) {
            

            let idPost = post.id;
            let dataComment = request(`http://localhost:3000/api/comments/` + idPost);
            dataComment.then(comments => {
                createOnePost(post);
                for (let commentaire of comments.result) {
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
    console.log('image=' + image)
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
        //e.preventDefault();
        getPostInfo();
        //window.location.reload()
    });
};

sendPost()

/* --------------------------- Envois d'un commentaire --------------------------- */
function sendComment() {

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

