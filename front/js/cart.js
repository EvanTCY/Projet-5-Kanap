function getProduct(){
    let product = localStorage.getItem('product');
    if(product == null){
        return [];
    }else{
        return JSON.parse(product);
    }
}

async function fetchProduct(){
    const r = await fetch("http://localhost:3000/api/products/"+getProduct().id);
    if(r.ok === true){
        return r.json();
    } throw new Error ('le serveur ne répond pas')
};


async function productAdded(){

    let productCart = await fetchProduct();
    console.table(productCart);

 

    let article = document.createElement('article');
    document.getElementById('cart__items').appendChild(article);
    article.className = 'cart__item';


    let divImg = document.createElement('div');
    article.appendChild(divImg);
    divImg.className = 'cart__item__img';

    let img = document.createElement('img');;
    divImg.appendChild(img);
    img.src = productCart.imageUrl;
    img.alt = productCart.altTxt;


    let divContent = document.createElement('div');
    article.appendChild(divContent);
    divContent.className = "cart__item__content";

    let divDescription = document.createElement('div');
    divContent.appendChild(divDescription);
    divDescription.className = 'cart__item__content__description';

    let productName = document.createElement('h2');
    divDescription.appendChild(productName);
    productName.innerText = productCart.name;

    let productColor = document.createElement('p');
    divDescription.appendChild(productColor);

    let productPrice = document.createElement('p');
    divDescription.appendChild(productPrice);
    productPrice.innerText = productCart.price + "€";

    // let divSettings = document.createElement('div');
    // divContent.appendChild(divDescription);
    // divDescription.className = 'cart__item__content__settings';

    // let divQuantity = document.createElement('div');
    // divSettings.appendChild(divQuantity);
    // divQuantity.className = 'cart__item__content__settings__quantity';

    // let productQuantity = document.createElement('p');
    // divQuantity.appendChild(productQuantity);
    // productQuantity.innerText = "Qté";


    


   



    


}

productAdded();