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

    // itération du options du produit
    for(let colors of product.colors){

        let productOption = document.getElementById('colors');
        let newOption = document.createElement('option')
        productOption.appendChild(newOption);

        newOption.value = colors;
        newOption.innerText = colors;
  
    }
    
}

getProductElements();


async function addToCart(){

    let product = await fetchProduct();

    let optionValue = document.getElementsByTagName('option');
    let quantityValue = document.getElementById('quantity');
    let addToCartButton = document.getElementById('addToCart');
    let errorMessage = document.getElementsByClassName('item__content__settings__quantity');

    let newP = document.createElement('p');
    

    quantityValue.value = '1';

    console.log(optionValue.value);

    addToCartButton.addEventListener('click', function(){
        if(quantityValue.value <= 100 && quantityValue.value > 0){

            addToCartButton.style.color = "green";

            let localStorageProduct = {
                id : productId,
                quantity : quantityValue.value,
                color : this.optionValue.value
            }
            let newLocalStorageProduct = JSON.stringify(localStorageProduct);
            localStorage.setItem("product", newLocalStorageProduct);

        }else{

            addToCartButton.style.color = "red";

        }
    })
}    
addToCart();

// POURQUOI LE "APPENCHILD" NE MARCHE PAS AVEC UN "GETELEMENTSBYCLASSENAME"