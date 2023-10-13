import { fetchPhotographersData } from '../api/photographerData.js';
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
        <div class="photograph_details" >
            <h2 class="photograph_name">${photographer.name}</h2>
            <h3 class="photograph_citycountry">${photographer.city}, ${photographer.country}</h3>
            <p class="photograph_tag">${photographer.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        
        <div>
            <img class="photograph_picture" src='./assets/photographers/${photographer.portrait}' alt="portrait de ${photographer.name}">
        </div>
        `
        // Appel de la fonction pour récupérer des données du photographe 
        photographerProfilContainer.innerHTML = PhotogInfoToDisplay;
    }
}
displayPhotographerProfile();