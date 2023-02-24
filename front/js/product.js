// récupération de l'id du produit via le lien de la page
function getProductId(){
    let productPageUrl = window.location.href;
    let url = new URL(productPageUrl);
    let productId = url.searchParams.get("id");
    return productId;
}

// Appel de l'api pour récupérer les caractéristiques d'un produit en particulier, via son id
async function fetchProduct(){
    const r = await fetch("http://localhost:3000/api/products/"+getProductId());
    if(r.ok === true){
        return r.json();
    } throw new Error ('le serveur ne répond pas')
}


// affichage des données du produit
async function getProductElements(){

    let productFromApi = await fetchProduct();
    console.table(productFromApi);

    // localisation des éléments parents pour y intégrer le contenu
    let itemImg = document.querySelector('.item__img'); 
    let productTitle = document.getElementById('title');
    let productPrice = document.getElementById('price');
    let productDescription = document.getElementById('description');

    let newImg = document.createElement('img');
    itemImg.appendChild(newImg);

    // intégration des informations sur le produit
    newImg.src = productFromApi.imageUrl;
    newImg.alt = productFromApi.altTxt;
    productTitle.innerText = productFromApi.name;
    productPrice.innerText = productFromApi.price;
    productDescription.innerText = productFromApi.description;

    // itération des options du produit
    for(let colors of productFromApi.colors){

        let productColors = document.getElementById('colors');
        let newColor = document.createElement('option')
        productColors.appendChild(newColor);

        newColor.value = colors;
        newColor.innerText = colors;
    } 
}
getProductElements();


/* création des variables utiles aux 2 fonctions ci-dessous*/
let productColor = document.getElementById('colors'); 
let addToCartButton = document.getElementById('addToCart');
let errorNumberAndColor = document.getElementById('errorNumberAndColor');
let confirmationMessage = document.getElementById('confirmationMessage');
let selectedQuantity = document.getElementById('quantity');
selectedQuantity.value = "1";
/* fin de création des variables utiles aux 2 fonctions ci-dessous*/


// ajout du produit dans le local storage
function storProduct(){

    // création du produit qui sera envoyé dans le local storage
    let localStorageProduct = {
        id : getProductId(),
        quantity : parseInt(selectedQuantity.value),
        color : productColor.value
    }

    // création du tableau qui accueillera les produits dans le local storage
    let productList;
    let productsFromLocalStorage = localStorage.getItem('products');
    if(productsFromLocalStorage == null){
        productList = [];
    }else{
        productList = JSON.parse(productsFromLocalStorage);
    }

    // gestion de la quantité pour un produit déjà existant dans le local storage
    let availableProduct = productList.find( p => p.id == localStorageProduct.id && p.color == localStorageProduct.color )
    if(availableProduct != undefined){
        availableProduct.quantity = availableProduct.quantity + localStorageProduct.quantity; 
    }else{
        productList.push(localStorageProduct);
    }   

    // création de l'item dans le local storage
    let newLocalStorageProduct = JSON.stringify(productList);
    localStorage.setItem('products', newLocalStorageProduct); 
}


// gestion des conditions du bouton "ajouter au panier" + appel de "storProduct()" pour ajouter les produits dans le local storage
function addToLocalStorage(){

    addToCartButton.addEventListener('click', function(){

        if(selectedQuantity.value > 100 || selectedQuantity.value <= 0){

            // Affichage du message d'erreur
            addToCartButton.style.color = "red";
            errorNumberAndColor.style.display = "block";
            confirmationMessage.style.display = "none";

        }else if(productColor.value === ""){

            // Affichage du message d'erreur
            addToCartButton.style.color = "red";
            errorNumberAndColor.style.display = "block";
            confirmationMessage.style.display = "none";
        
        }else{

            // Affichage du message de confirmation d'ajout au panier
            errorNumberAndColor.style.display = "none";
            confirmationMessage.style.display = "block";
            let removeConfirmation = setTimeout(function(){
                confirmationMessage.style.display = "none";
            }, 2500);
            addToCartButton.style.color = "white";
            
            // ajout du produit dans le local storage
            storProduct();

        }
    })
}    
addToLocalStorage();