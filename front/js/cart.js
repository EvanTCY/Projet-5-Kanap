// récupération des produits dans le local storage
function getProductsFromLocalStorage(){
    let products = localStorage.getItem('product');
    if(products == null){
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
    } throw new Error ('le serveur ne répond pas')
};


async function setCartProducts(){

    let localStorageProducts = getProductsFromLocalStorage();

    if(localStorageProducts.length == 0){

      document.querySelector('h1')
        .innerText = 'Votre panier est vide';

    }else{

      for(let product of localStorageProducts){

        let productFromApi = await fetchProduct(product.id);

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
        newArticle.classList.add('cart__item')
        newArticle.setAttribute("data-id", product.id)
        newArticle.setAttribute("data-color", product.color)
        newArticle.innerHTML = cartProductBody;
        document.getElementById('cart__items').appendChild(newArticle)
    }
  }
  removeProductFromCart();
}
setCartProducts();


async function setTotalCartPrice(){

  let localStorageProducts = getProductsFromLocalStorage();
  let totalPrice = document.getElementById('totalPrice');
  let totalCartPrice = 0;
   
  if(localStorageProducts.length == 0){
    totalPrice.innerText = '0';
  }else{
    for(let product of localStorageProducts){
      let productFromApi = await fetchProduct(product.id);
      totalCartPrice += product.quantity * productFromApi.price;
      totalPrice.innerText = totalCartPrice;
    } 
  }
}
setTotalCartPrice();


function setProductsCartNumber(){

  let localStorageProducts = getProductsFromLocalStorage();
  let totalQuantity = document.getElementById('totalQuantity');
  let totalProductsNumber = 0;
   
  if(localStorageProducts.length == 0){
    totalQuantity.innerText = '0';
  }else{
    for(let product of localStorageProducts){
      totalProductsNumber += product.quantity;
      totalQuantity.innerText = totalProductsNumber;
    } 
  }
}
setProductsCartNumber();


function removeProductFromCart(){
  
  let removeButtons = document.querySelectorAll('.deleteItem');
  let products = getProductsFromLocalStorage();

  removeButtons.forEach(button => button.addEventListener('click', function(){

    let articleBalise = button.closest('article');
    let clickedButtonProductId = articleBalise.getAttribute('data-id');
    let clickedButtonProductColor = articleBalise.getAttribute('data-color');

    articleBalise.style.display = 'none';

    products = products.filter(product => product.id !== clickedButtonProductId || product.color !== clickedButtonProductColor);
    let newProducts = JSON.stringify(products);
    localStorage.setItem('product', newProducts)
  }))
}


function isValidForm(){

  let nameInput = document.getElementById('firstName');
  let nameRegex = /^[A-Z][A-Za-z\é\è\ê\-]+$/;

  let lastNameInput = document.getElementById('lastName');
  let lastNameRegex = /^[A-Z][A-Za-z\é\è\ê\-]+$/;

  let addressInput = document.getElementById('address');
  let addressRegex = /^[A-Z][A-Za-z\é\è\ê\-]+$/;

  let cityInput = document.getElementById('city');
  let cityRegex = /^[A-Z][A-Za-z\é\è\ê\-]+$/;

  let emailInput = document.getElementById('email');
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  let styleError = "solid red 2px";

    if(!nameRegex.test(nameInput.value)){
      nameInput.style.border = styleError;
      document.getElementById('firstNameErrorMsg').innerText = "Votre prénom n'est pas valide";
      return false;
    }  if(!lastNameRegex.test(lastNameInput.value)){
      lastNameInput.style.border = styleError;
      document.getElementById('lastNameErrorMsg').innerText = "Votre nom n'est pas valide";
      return false;
    } if(!addressRegex.test(addressInput.value)){
      addressInput.style.border = styleError;
      document.getElementById('addressErrorMsg').innerText = "Votre adresse n'est pas valide";
      return false;
    } if(!cityRegex.test(cityInput.value)){
      cityInput.style.border = styleError;
      document.getElementById('cityErrorMsg').innerText = "Votre ville n'est pas valide";
      return false;
    }if(!emailRegex.test(emailInput.value)){
      emailInput.style.border = styleError;
      document.getElementById('emailErrorMsg').innerText = "Votre email n'est pas valide";
      return false;
    }
    // else{
    //   nameInput.style.border = "none";
    //   lastNameInput.style.border = "none";
    //   addressInput.style.border = "none";
    //   cityInput.style.border = "none";
    //   emailInput.style.border = "none";

    //   document.getElementById('firstNameErrorMsg').innerText = "";
    //   document.getElementById('lastNameErrorMsg').innerText = "";
    //   document.getElementById('addressErrorMsg').innerText = "";
    //   document.getElementById('cityErrorMsg').innerText = "";
    //   document.getElementById('emailErrorMsg').innerText = "";

      return true   
}

function getOrder(){

  document.getElementById('order').addEventListener('click', function(e){

    e.preventDefault();

    if(isValidForm()){

      console.log('ok')
    }
  })
}
getOrder();


        /*TASKS :
        * rendre la page dynamique (changement de prix et nbr article lors de modification du nombre d'article ou suppression, faire disparaitre article lors de sa suppression)
        * Trouver des regex plus adéquat et précis et les comprendres
        * mettre en place requête post
        */
