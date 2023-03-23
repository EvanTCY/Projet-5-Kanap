// récupération de l'id produit via le lien de la page
let urlProductPage = window.location.href;
let url = new URL(urlProductPage);
let productId = url.searchParams.get("id");


// fonction fetch + convertion des données en format .json + envoie message d'erreur.
async function fetchProduct(){
    const r = await fetch("http://localhost:3000/api/products/"+productId);
    if(r.ok === true){
        return r.json();
    } throw new Error ('le serveur ne répond pas')
}


// affichage des données du produit
async function getProductElements(){

    let product = await fetchProduct();
    console.table(product);

    // localisation des éléments parents pour y intégrer le contenu
    let itemImg = document.querySelector('.item__img');  /*QUESTION TOUT EN BAS, POUR CETTE LIGNE*/
    let productTitle = document.getElementById('title');
    let productPrice = document.getElementById('price');
    let productDescription = document.getElementById('description');

    let newImg = document.createElement('img');
    itemImg.appendChild(newImg);

    // intégration des informations sur le produit
    newImg.src = product.imageUrl;
    newImg.alt = product.altTxt;
    productTitle.innerText = product.name;
    productPrice.innerText = product.price;
    productDescription.innerText = product.description;

    // itération des options du produit
    for(let colors of product.colors){

        let productOption = document.getElementById('colors');
        let newOption = document.createElement('option')
        productOption.appendChild(newOption);

        newOption.value = colors;
        newOption.innerText = colors;
  
    } 
}
getProductElements();


// gestion du bouton "ajouter au panier" avec le local storage
function addToLocalStorage(){

    let optionValue = document.getElementById('colors');
    let quantityValue = document.getElementById('quantity');
    let addToCartButton = document.getElementById('addToCart');
    let errorNumberAndColor = document.getElementById('errorNumberAndColor');
    let confirmationMessage = document.getElementById('confirmationMessage');
    

    quantityValue.value = "1";

    addToCartButton.addEventListener('click', function(){
        if(quantityValue.value > 100 || quantityValue.value <= 0){

            // Affichage du message d'erreur
            addToCartButton.style.color = "red";
            errorNumberAndColor.style.display = "block";
            confirmationMessage.style.display = "none";
            

        }else if(optionValue.value === ""){

            // Affichage du message d'erreur
            addToCartButton.style.color = "red";
            errorNumberAndColor.style.display = "block";
            confirmationMessage.style.display = "none";
        
        }else{

            // Affichage du message de confirmation d'ajout au panier
            errorNumberAndColor.style.display = "none";
            confirmationMessage.style.display = "block";
            let timeOutRemoveConfirmation = setTimeout(function(){
                confirmationMessage.style.display = "none";
            }, 4000);
            addToCartButton.style.color = "white";
            
            // gestion du local storage
            function storProduct(){

                // création du produit qui sera envoyé dans le local storage
                let localStorageProduct = {
                    id : productId,
                    quantity : parseInt(quantityValue.value),
                    color : optionValue.value
                }

                // création du tableau qui accueillera les produits dans le local storage
                let productList;
                let product = localStorage.getItem('product');
                if(product == null){
                    productList = [];
                }else{
                    productList = JSON.parse(product);
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
                localStorage.setItem('product', newLocalStorageProduct);

            }
            storProduct();

        }
    })
}    
addToLocalStorage();
