// Recupération de l'Id transmise par  l'url
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");

// Récupération des données photographes transmises par une variable globale. 
const photographerData = window.appData.photographers;

// Fonction de réécupération des données du photographe de la page
function selectPhotographerInfo(photographerId) {
    const photographer = photographerData.find(photographer => photographer.id === photographerId);
    return photographer;
}

// Cible le DOM correspondant à l'emplacement de l'affichage des données 
const photographerProfilContainer = document.querySelector(".photograph-header");

// Données à afficher pour le photographe
if (photographer) {
    const PhotogInfoToDisplay =
    `
    <div class="photograph-header">
        <div  class="photographer_details" >
            <h2 class="photographer_name">${photographer.name}</h2>
            <h3 class="photographer_citycountry">${photographer.city}, ${photographer.country}</h3>
            <p class="photographer_tagline">${photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        
        <div>
            <img class="photographer_picture" src='./assets/photographers/${photographer.portrait}' alt="portrait de ${photographer.name}">
        </div>
    </div>
    `
    // Appel de la fonction pour récupérer des données du photographe 
    photographerProfilContainer.innerHTML = PhotogInfoToDisplay;
}