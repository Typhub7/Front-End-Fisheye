import { fetchPhotographersData } from '../utils/photographerData.js';

// Cette fonction utilise la méthode fetch pour récupérer les données depuis le fichier JSON
// Retourne les donnéees en ne récupérant que les données photographers
function photographerTemplate(photographer) {

    const newPhotographerCard = 
    `
    <article>
        <a  href="../photographer.html?id=${photographer.id}">  
            <img class="photographer_picture" src='./assets/photographers/${photographer.portrait}' alt="portrait de ${photographer.name}">
            <h2 class="photographer_name">${photographer.name}</h2>
        </a>
        <p class="photographer_citycountry">${photographer.city}, ${photographer.country}</p>
        <p class="photographer_tagline">${photographer.tagline}</p>
        <p class="photographer_price">${photographer.price} €/jour</p>
    </article>
    `
    return {newPhotographerCard}
}  

// Cette fonction reçoit  un tableau contennant les données des photographes
// Elle cible le DOM section HMTL de classe .photographer_section
// Pour chaque photographe, elle affiche la carte
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const card = photographerTemplate(photographer);
        photographersSection.innerHTML += card.newPhotographerCard;
    });
}

// Cette fonction démarre le processus de traitement.
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await fetchPhotographersData();
    displayData(photographers);
}

init();
