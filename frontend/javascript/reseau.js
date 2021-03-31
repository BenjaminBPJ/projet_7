function getPosts(){
    let data = request(`http://localhost:3000/api/home/pseudo`);
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
goToProfil();
function goToProfil(){
    let profil = document.getElementById('emote-profil');
    let id = JSON.parse(localStorage.getItem('userId'));
    console.log(id);
    profil.addEventListener('click', function (){
        window.location = `profil.html?/id=${id}`
    });
};
