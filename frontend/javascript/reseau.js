function getPosts(){
    let urlParam = (new URL(window.location.href)).searchParams.get('/userId');
    let data = request(`http://localhost:3000/api/posts/` + urlParam);
    data.then(posts => {
        console.log(posts);
            for (const post of posts.result){
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
