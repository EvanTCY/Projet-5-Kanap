
/****************** nouvelles balises HTML ****************/
const newA = document.createElement("a");
const newArticle = document.createElement("article");
const newImg = document.createElement("img");
const newH3 = document.createElement("h3");
const newP = document.createElement("p");
/****************** nouvelles balises HTML ****************/


// fonction fetch + convertion des données en format .json + envoie message d'erreur.
async function fetchProduit(){
    const r = await fetch('http://localhost:3000/api/products')
    if(r.ok === true){
        return r.json();    
    }
    throw new Error ('le serveur ne répond pas');
}   

// fetchProduit().then(res => console.log(res));

async function creerProduit(){

    // générer l'élément "a" et "article"
    document.getElementById('items')
        .appendChild(newA)
            .appendChild(newArticle);
    
    // fonction permettant de créer de nouvelles balises comme éléments enfants
    function creationEnfantArticle(newBalise){
         document.querySelector('a > article')
            .appendChild(newBalise);
    };
    // appelle de la fonction pour créer les balises 'img' 'h3' et 'p'
    const imgProduit = creationEnfantArticle(newImg);
    const h3Produit = creationEnfantArticle(newH3);
    const pProduit = creationEnfantArticle(newP);

    // ajout de classes sur les éléments de 'article'
    document.querySelector('article > h3').classList.add('productName');
    document.querySelector('article > p').classList.add('productDescription');

    /*** insertion de données de l'api via fetch ***/
    document.querySelector('article > img').src = await fetchProduit().then(data => data[0].imageUrl);
    document.querySelector('article > h3').textContent = await fetchProduit().then(data => data[0].name);
    document.querySelector('article > p').textContent = await fetchProduit().then(data => data[0].description)
    /*** insertion de données de l'api via fetch ***/
    
};
 creerProduit();


// Pourquoi lorsque j'appelle ma fonction "creerProduit" plusieurs fois, il n'y pas d'autres articles qui apparaissent ?

//trouver comment générer tous les produits de l'api avec la boucle for
//trouver comment renvoyer vers la page produit au click sur un produit