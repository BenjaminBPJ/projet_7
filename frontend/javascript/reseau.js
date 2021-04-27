function getPosts(){
    let data = request(`http://localhost:3000/api/posts/`);
    data.then(posts => {
        console.log(posts);
            for (const post of posts.result) {
                createOnePost(post);
            }                                      
        });
        /*.catch((error) => {
            error
        })*/
};

getPosts();

function goToProfil(){
    let profil = document.getElementById('emote-profil');
    let id = JSON.parse(localStorage.getItem('userId'));
    console.log(id);
    profil.addEventListener('click', function (){
        window.location = `profil.html?/id=${id}`
    });
};

goToProfil();

function createPost(post) {
    let data = send(`http://localhost:3000/api/posts/`, post);
    data.then(post => {
        console.log(post);
    })
      /*  .catch((error) => {
            console.log(error)
            serverDown();
        }); */
};

function getPostInfo() {
    let titre = document.getElementById('titre-publication').value;
    let content = document.getElementById('textarea-publi').value;
    let image = document.getElementById('image-publi').value;
    let publication = {
        title: titre,
        content: content,
        contentImage: image
    };
    createPost(publication);
};

function sendPost() {
    let button = document.getElementById("send-post");
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getPostInfo();
    });
};

sendPost()

