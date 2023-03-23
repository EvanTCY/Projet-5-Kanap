// récupération des produits dans le local storage
function getProductsFromLocalStorage(){
    let products = localStorage.getItem('products');
    if(products === null){
        return [];
    }else{
        return JSON.parse(products);
    }
}


// récupération d'un produit de l'api en particulier, via son id situé dans le local storage
async function fetchProduct(id){
    const r = await fetch("http://localhost:3000/api/products/" + id);
    if(r.ok === true){
        return r.json();
    } throw new Error ('le serveur ne répond pas');
};


// Affichage des produits présent dans le local storage, sur la page panier
async function setCartProducts(){

    let productsFromLocalStorage = getProductsFromLocalStorage();

      for(let product of productsFromLocalStorage){

        const productFromApi = await fetchProduct(product.id);

        // création du produit tel qu'il sera présenté dans le panier
        let cartProductBody = `<div class="cart__item__img">
          <img src="${productFromApi.imageUrl}" alt="${productFromApi.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productFromApi.name}</h2>
            <p>${product.color}</p>
            <p>${productFromApi.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Quantité :</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
            </div>
            <div class="cart__item__content__settings__delete">
               <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>`;

        // création de la balise article pour y insérer "cartProductBody" via un innerHTML
        let newArticle = document.createElement('article');
        newArticle.classList.add('cart__item');
        newArticle.setAttribute("data-id", product.id);
        newArticle.setAttribute("data-color", product.color);
        newArticle.innerHTML = cartProductBody;
        document.getElementById('cart__items').appendChild(newArticle);
    }
    
  removeProductFromCart();
  modifyProductsQuantity();
}
setCartProducts();


// remise à niveau du prix et du nombre d'article affichés sur la page, en prenant compte du local storage 
async function updateTotalCartPriceAndArticle(){

  let productsFromLocalStorage = getProductsFromLocalStorage();

  let cartTitlte = document.querySelector('h1');

  let includeTotalPrice = document.getElementById('totalPrice');
  let totalPrice = 0;

  let includeTotalQuantity = document.getElementById('totalQuantity');
  let totalQuantity = 0;

  // dans le cas où le local storage serait vide
  if(productsFromLocalStorage.length == 0){

    cartTitlte.innerText = 'Votre panier est vide';
    includeTotalPrice.innerText = 0;
    includeTotalQuantity.innerText = 0;

  // dans le cas où le local storage serait remplit 
  }else{

    cartTitlte.innerText = 'Votre panier';

    for(let product of productsFromLocalStorage){

      // calcul du prix total
      let productFromApi = await fetchProduct(product.id);
      totalPrice += parseInt(product.quantity) * productFromApi.price;
      includeTotalPrice.innerText = totalPrice;

      // calcul du nombre total d'article
      totalQuantity += parseInt(product.quantity);
      includeTotalQuantity.innerText = totalQuantity;
    } 
  }
}
updateTotalCartPriceAndArticle();


// suppression des produits au clic sur le bouton "supprimer"
function removeProductFromCart(){
  
  let removeButtons = document.querySelectorAll('.deleteItem');

  removeButtons.forEach(button => button.addEventListener('click', function(){

    let productsFromLocalStorage = getProductsFromLocalStorage();

    let articleBalise = button.closest('article');
    let clickedButtonProductId = articleBalise.getAttribute('data-id');
    let clickedButtonProductColor = articleBalise.getAttribute('data-color');

    // suppression de l'affichage des produits, sur la page panier
    articleBalise.remove();

    // supression des produits présents dans le local storage
    let selectedProduct = productsFromLocalStorage.find(product => product.id === clickedButtonProductId && product.color === clickedButtonProductColor);
    
    let indexOfProduct = productsFromLocalStorage.indexOf(selectedProduct);
    productsFromLocalStorage.splice(indexOfProduct, 1)


    console.log(productsFromLocalStorage);
    let newProducts = JSON.stringify(productsFromLocalStorage);
    localStorage.setItem('products', newProducts);

    // mise à jour des quantités et prix totaux
    updateTotalCartPriceAndArticle();
  }))

}


// remplacement des quantités du local storage par les quantités saisies
function modifyProductsQuantity(){

  let quantityInput = document.querySelectorAll('.itemQuantity');

  quantityInput.forEach(input => input.addEventListener('change', function(){

    let newQuantity = input.value;
    let articleBalise = input.closest('article');
    let clickedButtonProductId = articleBalise.getAttribute('data-id');
    let clickedButtonProductColor = articleBalise.getAttribute('data-color');

    let productsFromLocalStorage = getProductsFromLocalStorage(); 
    productsFromLocalStorage.forEach((product) => {
  
      // si l'id et la couleur du produit présent dans le local storage correspondent à ceux du produit sélectionné, alors modifier sa quantité
      if(clickedButtonProductColor === product.color && product.id === clickedButtonProductId){
          product.quantity = newQuantity;
      }
    })

    let newProducts = JSON.stringify(productsFromLocalStorage);
    localStorage.setItem('products', newProducts);

    // mise à jour des quantités et prix totaux
    updateTotalCartPriceAndArticle();
  }))
}


/* création des variables utiles aux fonctions ci-dessous*/
let nameInput = document.getElementById('firstName');
let lastNameInput = document.getElementById('lastName');
let addressInput = document.getElementById('address');
let cityInput = document.getElementById('city');
let emailInput = document.getElementById('email');
/* fin de création des variables utiles aux fonctions ci-dessous*/


// création des regex qui permettront de valider le formulaire
function isValidForm(){

  const namesRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  const adressRegex = /^[a-zA-Z0-9áâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/gi;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const styleError = "solid red 2px";

    if(!namesRegex.test(nameInput.value)){
      nameInput.style.border = styleError;
      document.getElementById('firstNameErrorMsg').innerText = "Votre prénom n'est pas valide";
      return false;
    }if(!namesRegex.test(lastNameInput.value)){
      lastNameInput.style.border = styleError;
      document.getElementById('lastNameErrorMsg').innerText = "Votre nom n'est pas valide";
      return false;
    }if(!adressRegex.test(addressInput.value)){
      addressInput.style.border = styleError;
      document.getElementById('addressErrorMsg').innerText = "Votre adresse n'est pas valide";
      return false;
    }if(!namesRegex.test(cityInput.value)){
      cityInput.style.border = styleError;
      document.getElementById('cityErrorMsg').innerText = "Votre ville n'est pas valide";
      return false;
    }if(!emailRegex.test(emailInput.value)){
      emailInput.style.border = styleError;
      document.getElementById('emailErrorMsg').innerText = "Votre email n'est pas valide";
      return false;
    }
    return true   
}


// création de la requête POST + redirection vers la page "confirmation"
async function postProductsAndUsersInformations(){

  let productsFromLocalStorage = getProductsFromLocalStorage();
  let cartProductsId = productsFromLocalStorage.map(product => product.id);
  let clientOrder = {
    contact : {
      firstName : nameInput.value,
      lastName : lastNameInput.value,
      address : addressInput.value,
      city : cityInput.value,
      email : emailInput.value
    },
    products : cartProductsId
  };

let fetchOptions =  {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(clientOrder)
}

  const response =  await fetch('http://localhost:3000/api/products/order', fetchOptions);
  const result = await response.json();
  
  // redirection vers la page "confirmation", en incluant l'id de la commande dans l'url
  let orderId = result.orderId;
  if(localStorage.length !== 0){
    window.location = `confirmation.html?id=${orderId}`;
    localStorage.removeItem('products');
  }
}
 

async function getOrder(){

  document.getElementById('order').addEventListener('click', function(e){

    e.preventDefault();

    if(isValidForm()){
      postProductsAndUsersInformations();
    }
  })
}
getOrder();
