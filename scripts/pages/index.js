import { fetchPhotographersData } from '../api/photographerData.js';

// Cette fonction utilise la méthode fetch pour récupérer les données depuis le fichier JSON
// Retourne les donnéees en ne récupérant que les données photographers
function photographerTemplate(photographer) {

    const newPhotographerCard = 
    `
    <article tabindex="0" aria-label="${photographer.name}">
        <a  href="../photographer.html?id=${photographer.id}"> 
            <div class="photographer_imgcontainer">
                <img class="photographer_picture" src='./assets/photographers/${photographer.portrait}' alt="Portrait de ${photographer.name}">          
            </div>
            <h2 class="photographer_name" aria-label="nom du photographe">${photographer.name}</h2>
        </a>
        <h3 class="photographer_citycountry" aria-label="Sa ville et son pays">${photographer.city}, ${photographer.country}</h3>
        <p class="photographer_tagline" aria-label="Son slogan">${photographer.tagline}</p>
        <p class="photographer_price" aria-label="Son tarif journalier">${photographer.price} €/jour</p>
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
