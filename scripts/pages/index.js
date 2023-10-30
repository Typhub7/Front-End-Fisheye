import { fetchPhotographersData } from '../api/photographerData.js';

/** Generates an HTML template for displaying photographer information.
 * @function
 * @param {Object} photographer - The photographer's data.
 * @returns {Object} - An object containing the HTML template.
 */
function photographerTemplate(photographer) {

    const newPhotographerCard = 
    `
    <article tabindex="0" aria-label="${photographer.name}">
        <a  href="photographer.html?id=${photographer.id}"> 
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

/** Displays photographer data by generating and appending HTML templates.
 * @async
 * @function
 * @param {Array} photographers - An array of photographer data.
 */
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const card = photographerTemplate(photographer);
        photographersSection.innerHTML += card.newPhotographerCard;
    });
}

/** Initiates the data processing and rendering process.
 * @async
 * @function
 */
async function init() {
    const { photographers } = await fetchPhotographersData();
    displayData(photographers);
}

init();
