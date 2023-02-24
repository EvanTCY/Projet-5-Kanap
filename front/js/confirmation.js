// récupération de l'id de commande via le lien de la page
function getOrderId(){
    let urlProductPage = window.location.href;
    let url = new URL(urlProductPage);
    let orderId = url.searchParams.get("id");
    return orderId;
}

// Affichage du numéro de commande sur la page
document.getElementById('orderId').innerText = getOrderId();