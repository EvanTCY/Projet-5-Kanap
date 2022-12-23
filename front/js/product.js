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
    
    // récupération de l'index produit via l'id du produit
    let productIndex = products.findIndex(function(product, i){
        return product._id === productId
      });
    // source : https://stackoverflow.com/questions/36419195/how-can-i-get-the-index-from-a-json-object-with-value

    // localisation des éléments parents pour y intégrer le contenu
    let itemImg = document.querySelector('.item__img');  /*QUESTION TOUT EN BAS, POUR CETTE LIGNE*/
    let productTitle = document.getElementById('title');
    let productPrice = document.getElementById('price');
    let productDescription = document.getElementById('description');

    let newImg = document.createElement('img');
    itemImg.appendChild(newImg);

    // intégration des informations sur le produit
    newImg.src = products[productIndex].imageUrl;
    newImg.alt = products[productIndex].altTxt;
    productTitle.innerText = products[productIndex].name;
    productPrice.innerText = products[productIndex].price;
    productDescription.innerText = products[productIndex].description;

    // itération des options disponnibles en fonction de l'index produit sélectionné
    for(let colors of products[productIndex].colors){

        let productOption = document.getElementById('colors');
        let newOption = document.createElement('option')
        productOption.appendChild(newOption);

        newOption.value = colors;
        newOption.innerText = colors;
  
    }
    
}

getProductElements();

// POURQUOI LE "APPENCHILD" NE MARCHE PAS AVEC UN "GETELEMENTSBYCLASSENAME"