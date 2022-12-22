// fonction fetch + convertion des données en format .json + envoie message d'erreur.
async function fetchProduct(){
    const r = await fetch('http://localhost:3000/api/products');
    if(r.ok === true){
        return r.json();
    } throw new Error ('le serveur ne répond pas')
}

async function getProductElements(){

    let products = await fetchProduct();
    console.table(products);

    // récupération de l'id produit via le lien de la page
    let urlProductPage = window.location.href;
    let url = new URL(urlProductPage);
    let productId = url.searchParams.get("id");
    
    // récupération de l'index produit via le l'id du produit
    let productIndex = products.findIndex(function(item, i){
        return item._id === productId
      });
    // source : https://stackoverflow.com/questions/36419195/how-can-i-get-the-index-from-a-json-object-with-value

    let itemImg = document.querySelector('.item__img');
    let productTitle = document.getElementById('title');
    let productPrice = document.getElementById('price');
    let productDescription = document.getElementById('description');

    let newImg = document.createElement('img');

    itemImg.appendChild(newImg);

    newImg.src = products[productIndex].imageUrl;
    newImg.alt = products[productIndex].altTxt;
    productTitle.innerText = products[productIndex].name;
    productPrice.innerText = products[productIndex].price;
    productDescription.innerText = products[productIndex].description;
}

getProductElements();