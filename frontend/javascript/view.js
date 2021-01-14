function serverDown() {
    let article = document.createElement(`article`) // création de l'article principal
    document.querySelector("main").appendChild(article)
    article.innerHTML = `Serveur momentanément indisponible, veuillez nous excuser`
}