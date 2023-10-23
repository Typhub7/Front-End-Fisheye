import { fetchPhotographersData } from '../api/photographerData.js';
import { PhotographerInfo } from '../class/photoinfo.js';
import { MediasFactory } from '../class/mediaclass.js';
import {displayModal, closeModal } from '../helpers/contactForm.js';
import {sortImages} from '../helpers/sort.js';

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
                    <span class="likes_counter">0</span>
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
let initialGlobalLikeCount = 0

async function displayPhotographerMedia() {
    const mediaData = await fetchPhotographersData();  
    const medias = mediaData.media.map(media => new MediasFactory(media));
    const photographerMedias = medias.filter(media => media.imgPhotographerId == photographerId);

    // Calculer la somme totale des likes des médias du photographe
    initialGlobalLikeCount = photographerMedias.reduce((total, photographerMedias) => total + photographerMedias.likes, 0);
    
    // Données à afficher pour le photographe
    if (photographerMedias) {
        const photographerMediaContainer = document.querySelector(".photograph-gallery-container");

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
                        <div class="number-heart" role="group" aria-label="Like button and number of likes">
                            <span class="numberLike">${media.likes}</span> 
                            <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                                <i class="fa-regular fa-heart heart-empty visible" aria-hidden="true"></i>
                                <i class="fa-solid fa-heart heart-full invisible" aria-hidden="true"></i>
                            </button> 
                        </div>
                </figcaption>
            </article>
            `
        })
        const mediaToDisplay = mediaContent.join('');
        photographerMediaContainer.innerHTML = mediaToDisplay;
        updateGlobalLikesDisplay(initialGlobalLikeCount);
        return initialGlobalLikeCount;     
    }
}

let likeCounters = {};

// Ajoutez un gestionnaire d'événements de clic à chaque bouton
function toggleHeart (event, likeCounters, mediaId, likeInitialCounterDOM) {

    // Cibler les éléments d'icônes à l'intérieur du bouton
    const button = event.currentTarget;
    const heartEmpty = button.querySelector(".heart-empty");
    const heartFull = button.querySelector(".heart-full");

    // Basculer l'opacité des icônes pour afficher/cacher le cœur plein et le cœur vide
    if (heartEmpty.classList.contains("visible")) {
        globalLikeCount++;
        likeCounters[mediaId]++;
        updateGlobalLikesDisplay(globalLikeCount);
        updateIndivLikesDisplay(likeCounters[mediaId], likeInitialCounterDOM);
        heartEmpty.classList.remove("visible");
        heartEmpty.classList.add("invisible");
        heartFull.classList.remove("invisible");
        heartFull.classList.add("visible");       
    } else {
        globalLikeCount--;
        likeCounters[mediaId]--;
        updateGlobalLikesDisplay(globalLikeCount);
        updateIndivLikesDisplay(likeCounters[mediaId], likeInitialCounterDOM);
        heartFull.classList.remove("visible");
        heartFull.classList.add("invisible");
        heartEmpty.classList.remove("invisible");
        heartEmpty.classList.add("visible");   
    }
}
// fonctions de mise à jour de l'affichage du nombre de likes
async function updateGlobalLikesDisplay(newGlobalLike) {
    const likesCounter = await waitForElement(".likes_counter");
    likesCounter.textContent = newGlobalLike;
}

async function updateIndivLikesDisplay(newIndivLike, likeInitialCounterDOM) {
    likeInitialCounterDOM.textContent = newIndivLike;
}

// Fonctions qui renvoient une promesse si l'element a été crée
function waitForElement(selector) {
    return new Promise(resolve => {
        let isResolved = false; 

        function check() {
            if (isResolved) {
                return; 
            }

            const element = document.querySelector(selector);
            if (element) {
                isResolved = true; // Marquez la résolution comme terminée
                resolve(element);
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
}

function waitForElements(selector) {
    return new Promise((resolve) => {
        let isResolved = false; // Variable de contrôle

        function check() {
            if (isResolved) {
                return; // Arrêtez la vérification une fois que les éléments ont été résolus
            }

            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                isResolved = true; // Marquez la résolution comme terminée
                resolve(elements);
            } else {
                requestAnimationFrame(check);
            }
        }

        check();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    addEventListeners();
 });



 // Fonction qui attends que le bouton contact et les coeurs soit crées pour utiliser l'event listener
async function addEventListeners() {
    const modalBtn = await waitForElement(".contact_button");
    modalBtn.addEventListener("click", displayModal);

    const closeBtn = await waitForElement(".closemodal_button");
    closeBtn.addEventListener("click", closeModal); 

    const likeButtons = await waitForElements(".btn_like"); // Utilisez une fonction pour attendre tous les éléments
    likeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const button = event.currentTarget;
            const mediaId = button.getAttribute("data-id");
            const likeInitialCounterDOM = button.closest(".gallery_card").querySelector(".numberLike")
            likeCounters[mediaId] = parseInt(likeInitialCounterDOM.textContent , 10);
            toggleHeart(event, likeCounters, mediaId, likeInitialCounterDOM);
        });
    });
    const selectElement = document.getElementById("selection");
    selectElement.addEventListener("change", (event) => {
        const selectedOption = event.target.value;
        sortImages(selectedOption);
    });
}

displayPhotographerProfile();
let globalLikeCount = await displayPhotographerMedia();




