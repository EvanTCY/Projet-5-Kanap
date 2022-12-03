

function createArticleProduct(){

    const newA = document.createElement("a");
    const newArticle = document.createElement("article");

    document.getElementById('items')
        .appendChild(newA)
            .appendChild(newArticle)
                .innerHTML = '<img></img><h3></h3><p></p>';
                
    document.querySelector('h3').classList.add('productName');
    document.querySelector('p').classList.add('productDescription');         
};
createArticleProduct();

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(lala => console.log(lala))