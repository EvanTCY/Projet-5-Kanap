// fonction fetch + convertion des données en format .json + envoie message d'erreur.
async function fetchProduct(){
    const r = await fetch('http://localhost:3000/api/products');
    if(r.ok === true){
        return r.json();
    } throw new Error ('le serveur ne répond pas')
}


async function createProduct(){

    let products = await fetchProduct();
    let items = document.getElementById('items');
    
    for(let product of products){
    
        // construction des balises            
        let newA = document.createElement("a");
        let newArticle = document.createElement('article');
        let newImg = document.createElement("img");
        let newH3 = document.createElement("h3");
        let newP = document.createElement("p");

        // ajout des éléments "alt" et "src" pour l'image            
        newImg.src = product.imageUrl;
        newImg.alt = product.altTxt;

        // ajout des contenus textuels            
        newH3.innerText = product.name;
        newP.innerText = product.description;

        // ajout des classes            
        newH3.classList.add('productName');
        newP.classList.add('productDescription');

        // ajout des liens selon l'id des produits            
        newA.href = `product.html?id=${product._id}`;

        // création des éléments enfants            
        newArticle.appendChild(newImg);
        newArticle.appendChild(newH3);
        newArticle.appendChild(newP);
        newA.appendChild(newArticle);
        items.appendChild(newA);

    }; 
    
};

createProduct()