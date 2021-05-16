function getPosts(){
    let data = request(`http://localhost:3000/api/posts/`);
    data.then(posts => {
        console.log(posts);
            for (const post of posts.result) {
                createOnePost(post);
            };                                      
        })
        .catch((error) => {
        });
};

getPosts();

function createPost(post) {
    let data = sendPostToApi(`http://localhost:3000/api/posts/`, post);
    data.then(post => {
        console.log(post);
    })
        .catch((error) => {
            console.log(error)
            serverDown();
        }); 
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
        e.preventDefault();
        getPostInfo();
        window.location.reload()
    });
};

sendPost()

/* --------------------------- Creation des commentaires --------------------------- */


function profilPage() {
    let urlParam = (new URL(window.location.href)).searchParams.get('/id');
    let data = request(`http://localhost:3000/api/auth/` + urlParam);
    data.then(user => {
    })
    /*.catch(() => {
        serverDown();
    })*/
};
function getComments(post){
    let idPost = post.result[0].id;
    let data = request(`http://localhost:3000/api/comments/${idPost}`);
    data.then(comments => {
        console.log(comments);
            for (const comment of comments.result) {
                createOneComment(comments);
            };                                      
        })
        .catch((error) => {
        });
};

function goToProfil(){
    let profil = document.getElementById('emote-profil');
    let id = JSON.parse(localStorage.getItem('userId'));
    console.log(id);
    profil.addEventListener('click', function (){
        window.location = `profil.html?/id=${id}`
    });
};

goToProfil();

