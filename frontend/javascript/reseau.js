function getPosts(){
    let data = request(`http://localhost:3000/api/posts/`);
    data.then(posts => {
        console.log(posts);
            for (const post of posts.result) {
                createOnePost(post);
                for (const comment of comment)
                getComments(posts)
                console.log(posts.result[0].id)
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
    console.log(image)
    let formData = new FormData()
    formData.append('image', image);
    formData.append("post", JSON.stringify({
        titre: titre,
        publication: content
    }));
    createPost(formData);
    console.log(formData)
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

