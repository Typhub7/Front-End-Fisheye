import { fetchPhotographersData } from '../api/photographerData.js';
import { PhotographerInfo } from '../class/photoinfo.js';
import { MediasFactory } from '../class/mediaclass.js';
import {displayModal, closeModal } from '../helpers/contactForm.js';

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
    
    // Données à afficher pour l'entête des informations du photographe
    if (photographer) {
        const photographerProfilContainer = document.querySelector(".photograph-header");
        const PhotogInfoToDisplay =
        `
        <div class="photograph_details" >
            <h2 class="photograph_name">${photographer.name}</h2>
            <h3 class="photograph_citycountry">${photographer.city}, ${photographer.country}</h3>
            <p class="photograph_tag">${photographer.tagline}</p>
        </div>
        <button class="contact_button">Contactez-moi</button>
        
        <div>
            <img class="photograph_picture" src='./assets/photographers/${photographer.portrait}' alt="portrait de ${photographer.name}">
        </div>
        `
        // Ajouter le nom du photographe dans le formulaire
        const contactPhotoName = document.querySelector(".contact_photographer_name");
        contactPhotoName.textContent = photographer.name;

        // Afficher le prix et le nombre de like du photographe
        const photographerLikesContainer = document.querySelector(".photograph-global-like");
        const likesAndPrice =
            `<aside class="photographer_counter" aria-label="footer" role="contentinfo"> 
                <p class=likes_container>
                    <span class="likes_counter">666</span>
                    <i class="fas fa-heart"></i>
                </p>
                <span class="price_counter">${photographer.price} € / jour</span>
            </aside>
            `
        photographerLikesContainer.innerHTML = likesAndPrice;
        // Appel de la fonction pour récupérer des données du photographe 
        photographerProfilContainer.innerHTML = PhotogInfoToDisplay;
    }
}

async function displayPhotographerMedia() {
    const mediaData = await fetchPhotographersData();  
    const medias = mediaData.media.map(media => new MediasFactory(media));
    const photographerMedias = medias.filter(media => media.imgPhotographerId == photographerId);

    // Données à afficher pour le photographe
    if (photographerMedias) {
        const photographerMediaContainer = document.querySelector(".photograph-gallery");

        const mediaContent = photographerMedias.map(media => {
            const mediaItem = media.image
                ? `<img class="gallery_thumbnail" src="./assets/images/${photographerId}/${media.image}" alt="${media.alt}">`
                : `<video class="gallery_thumbnail" aria-label="${media.alt}">
                    <source src="./assets/images/${photographerId}/${media.video}" type="video/mp4">
                   </video>`;
        return `
            <article class="gallery_card">                           
                <a href="#" data-media=${media.id} role="link" aria-label="View media large">
                    <figure>${mediaItem}</figure>
                </a>
                <figcaption>
                    <h2>${media.title}</h2>
                        <div role="group" aria-label="Like button and number of likes">
                            <span class="numberLike">${media.likes}</span> 
                            <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                                <span class="fas fa-heart" aria-hidden="true"></span>
                            </button> 
                        </div>
                </figcaption>
            </article>
            `
        })
        const mediaToDisplay = mediaContent.join('');
        photographerMediaContainer.innerHTML = mediaToDisplay;
        //const modalBtn = document.querySelector(".contact_button");
        //modalBtn.addEventListener("click", displayModal);
        //const closeBtn = document.querySelector(".closemodal_button")
        //closeBtn.addEventListener("click", closeModal);
    }
}

// Fonction qui renvoie une promesse si l'element a été crée
function waitForElement(selector) {
    return new Promise(resolve => {
        function check() {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
}

// Fonction qui attends que le bouton soit crée pour utiliser l'event listener
async function addEventListeners() {
    const modalBtn = await waitForElement(".contact_button");
    modalBtn.addEventListener("click", displayModal);

    const closeBtn = await waitForElement(".closemodal_button");
    closeBtn.addEventListener("click", closeModal);
}

document.addEventListener("DOMContentLoaded", function() {
    addEventListeners();
});

displayPhotographerProfile();
displayPhotographerMedia();



