import { fetchPhotographersData } from '../utils/photographerData.js';
import { PhotographerInfo } from '../templates/photoinfo.js';

// Recupération de l'Id transmise par  l'url
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");



// Fonction de réécupération des données du photographe de la page
function selectPhotographerInfo(photographerId, photographers) {
    return photographers.find(photographer => photographer.id == photographerId);
}

async function displayPhotographerProfile() {
    const photographerData = await fetchPhotographersData();
    const photographers = photographerData.photographers.map(photographer => new PhotographerInfo(photographer));
    const photographer = selectPhotographerInfo(photographerId, photographers);

    // Données à afficher pour le photographe
    if (photographer) {
        const photographerProfilContainer = document.querySelector(".photograph-header");
        const PhotogInfoToDisplay =
        `
        <div  class="photographer_details" >
            <h2 class="photographer_name">${photographer.name}</h2>
            <h3 class="photographer_citycountry">${photographer.city}, ${photographer.country}</h3>
            <p class="photographer_tag">${photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        
        <div>
            <img class="photographer_picture" src='./assets/photographers/${photographer.portrait}' alt="portrait de ${photographer.name}">
        </div>
        `
        // Appel de la fonction pour récupérer des données du photographe 
        photographerProfilContainer.innerHTML = PhotogInfoToDisplay;
    }
}
displayPhotographerProfile();