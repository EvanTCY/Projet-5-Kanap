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

        // création de la balise article pour y insérer "cartProductBody" via un "innerHTML"
        let newArticle = document.createElement('article');
        newArticle.classList.add('cart__item')
        newArticle.setAttribute("data-id", product.id)
        newArticle.setAttribute("data-color", product.color)
        newArticle.innerHTML = cartProductBody;
        document.getElementById('cart__items').appendChild(newArticle)
    }
}
setCartProducts();



        // let productToStoreInCArt = document.getElementById('cart__items').innerHTML = article;

        // if(cart == null ){
        //     cart = [];
        //     cart.push(productToStoreInCArt);
        // }else{
        //     cart.push(productToStoreInCArt);
        // }
        

       // let article = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        //     <div class="cart__item__img">
        //       <img src="${productFromApi.imageUrl}" alt="${productFromApi.altTxt}">
        //     </div>
        //     <div class="cart__item__content">
        //       <div class="cart__item__content__description">
        //         <h2>${productFromApi.name}</h2>
        //         <p>${product.color}</p>
        //         <p>${productFromApi.price} €</p>
        //       </div>
        //       <div class="cart__item__content__settings">
        //         <div class="cart__item__content__settings__quantity">
        //           <p>Quantité :</p>
        //           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.quantity}>
        //         </div>
        //         <div class="cart__item__content__settings__delete">
        //           <p class="deleteItem">Supprimer</p>
        //         </div>
        //       </div>
        //     </div>
        //   </article>`;










