import { fetchPhotographersData } from '../api/photographerData.js';
import { PhotographerInfo } from '../class/photoinfo.js';
import { MediasFactory } from '../class/mediaclass.js';
import { displayModal, closeModal } from '../helpers/contactForm.js';
import { displayLightbox } from '../helpers/lightbox.js'


/*****    Retrieval of the ID transmitted by the URL..   *****/
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get("id");


/** Extract the Data from the choosen photographer using ID.
 * @param {number} photographerId - The ID of the photographer.
 * @param {Object[]} photographers - An array of photographer objects.
 * @returns {Object} The photographer's information.
 */

function selectPhotographerInfo(photographerId, photographers) {
    return photographers.find(photographer => photographer.id == photographerId);
}

/** Display the photographer's profile and information.*/
async function displayPhotographerProfile() {
    const photographerData = await fetchPhotographersData();
    const photographers = photographerData.photographers.map(photographer => new PhotographerInfo(photographer));
    const photographer = selectPhotographerInfo(photographerId, photographers);
    
    // Data to display for the photographer's information header.
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
        // Add the photographer's name to the form
        const contactPhotoName = document.querySelector(".contact_photographer_name");
        contactPhotoName.textContent = photographer.name;

        // Display the photographer's price and the number of likes.
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

        // Call the function to retrieve photographer data.
        photographerProfilContainer.innerHTML = PhotogInfoToDisplay;
    }
}

let initialGlobalLikeCount = 0
let photographerMedias = {}

/** Display the photographer's media based on the selected sort option or by default (json order).
 * @async
 * @param {string} selectedOption - The selected sorting option ("popularite", "date", "titre").
 */
async function displayPhotographerMedia(selectedOption) {
    const photographerMediaContainer = document.querySelector(".photograph-gallery-container");
    if (Object.keys(photographerMedias).length === 0) {
        const mediaData = await fetchPhotographersData(); 
        const medias = mediaData.media.map(media => new MediasFactory(media));
        photographerMedias = medias.filter(media => media.imgPhotographerId == photographerId);
    } else {
        photographerMediaContainer.innerHTML = ""
        if (selectedOption === "popularite") {
            photographerMedias.sort((a,b) => b.likes - a.likes);    
        } else if (selectedOption === "date") {
            photographerMedias.sort((a, b) => {
                const dateA = new Date(a.date.split('-'));
                const dateB = new Date(b.date.split('-'));
                return dateB - dateA;
            });
        } else if (selectedOption === "titre") {
            photographerMedias.sort((a, b) => a.title.localeCompare(b.title));
        } 
    }
    
    // Calculate the total sum of the photographer's media likes
    initialGlobalLikeCount = photographerMedias.reduce((total, photographerMedias) => total + photographerMedias.likes, 0);
  
    // Display the Gallery of the photographer
    if (photographerMedias) {
        const mediaContent = photographerMedias.map(media => {
            const mediaItem = media.image
                ? `<img class="gallery_thumbnail" src="./assets/images/${photographerId}/${media.image}" alt = "${media.title}, closeup view">`
                : `<video class="gallery_thumbnail" aria-label="${media.title}">
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
                            <button class="btn_like" type="button" aria-label="likes" data-id="${media.id}">
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

        // Event listeneer and heart like counter
        const likeButtons = await waitForElements(".btn_like");
        likeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const button = event.currentTarget;
                const mediaId = button.getAttribute("data-id");
                const likeInitialCounterDOM = button.closest(".gallery_card").querySelector(".numberLike")
                likeCounters[mediaId] = parseInt(likeInitialCounterDOM.textContent , 10);
                toggleHeart(event, likeCounters, mediaId, likeInitialCounterDOM);
            });
        });

        displayLightbox(photographerMediaContainer,photographerMedias,photographerId)
 
        updateGlobalLikesDisplay(initialGlobalLikeCount);
        return initialGlobalLikeCount;     
    }
}

let likeCounters = {};

/**Toggle the like button and update the like count.
 * @param {Event} event - The click event.
 * @param {Object} likeCounters - An object containing the database like counts for each media.
 * @param {string} mediaId - The ID of the media.
 * @param {HTMLElement} likeInitialCounterDOM - The DOM element displaying the initial like count.
 */

function toggleHeart (event, likeCounters, mediaId, likeInitialCounterDOM) {

    const button = event.currentTarget;
    const heartEmpty = button.querySelector(".heart-empty");
    const heartFull = button.querySelector(".heart-full");

    if (heartEmpty.classList.contains("visible")) {
        globalLikeCount++;
        likeCounters[mediaId]++;
        updateGlobalLikesDisplay(globalLikeCount);
        updateIndivLikesDisplay(likeCounters[mediaId], likeInitialCounterDOM);
        heartEmpty.classList.replace("visible", "invisible");
        heartFull.classList.replace("invisible", "visible");    
    } else {
        globalLikeCount--;
        likeCounters[mediaId]--;
        updateGlobalLikesDisplay(globalLikeCount);
        updateIndivLikesDisplay(likeCounters[mediaId], likeInitialCounterDOM);
        heartFull.classList.replace("visible", "invisible");
        heartEmpty.classList.replace("invisible", "visible");   
    }
}

/** Update the global of individual like counts.
 * @param {number} newGlobalLike - The new individual like count.
 */
async function updateGlobalLikesDisplay(newGlobalLike) {
    const likesCounter = await waitForElement(".likes_counter");
    likesCounter.textContent = newGlobalLike;
}


/** Update the display of individual like counts.
 * @param {number} newIndivLike - The new individual like count.
 * @param {HTMLElement} likeInitialCounterDOM - The DOM element displaying the initial like count.
 */
async function updateIndivLikesDisplay(newIndivLike, likeInitialCounterDOM) {
    likeInitialCounterDOM.textContent = newIndivLike;
}

/** Wait for an HTML element to be created and resolve the promise once it's found.
 * @param {string} selector - The CSS selector for the element to wait for.
 * @returns {Promise<HTMLElement>} A promise that resolves to the found element.
 */

function waitForElement(selector) {
    return new Promise(resolve => {
        let isResolved = false; 

        function check() {
            if (isResolved) {
                return; 
            }

            const element = document.querySelector(selector);
            if (element) {
                isResolved = true;
                resolve(element);
            } else {
                requestAnimationFrame(check);
            }
        }
        check();
    });
}
/**Wait for multiple HTML elements to be created and resolve the promise once they're found.
 * @param {string} selector - The CSS selector for the elements to wait for.
 * @returns {Promise<HTMLElement[]>} A promise that resolves to an array of found elements.
 */

function waitForElements(selector) {
    return new Promise((resolve) => {
        let isResolved = false; 

        function check() {
            if (isResolved) {
                return; 
            }

            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                isResolved = true; 
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

/**
 * Event listener for opening/closing the modal when the contact button is clicked.
 * @returns {Promise<void>} Resolves when the event listener is added.
 */
async function addEventListeners() {
    // 
    const modalBtn = await waitForElement(".contact_button");
    modalBtn.addEventListener("click", () => {
        desactiverNavigationArrierePlan();
        displayModal();
    }); 
}

// ****** Dropbox DOM element ***** /
const expendDropButton = document.querySelector(".btn_drop");
const arrow = document.querySelector(".fa-chevron-down");
const filterMenu = document.querySelector(".btn_select");
const options = filterMenu.querySelectorAll(".option");
const filterButtons = document.querySelectorAll(".btn_select button");

function ouvertureDropbox() {
    expendDropButton.setAttribute("aria-expanded", true);
    filterMenu.classList.add("expend_drop");
    arrow.classList.add("rotate");
    filterMenu.setAttribute("aria-hidden", "false");
    filterButtons.forEach(button => button.setAttribute("tabindex", "0"));
}

function fermetureDropbox() {
    expendDropButton.setAttribute("aria-expanded", false);
    filterMenu.classList.remove("expend_drop");
    arrow.classList.remove("rotate");
    filterMenu.setAttribute("aria-hidden", "true");
    filterButtons.forEach(button => button.setAttribute("tabindex", "-1"));
}

expendDropButton.addEventListener("click", () => {
    const isExpanded = expendDropButton.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
        fermetureDropbox();
    } else {
        ouvertureDropbox();
    }
});

/** Initialize event listeners for filter buttons and set the default selected filter for display.
 * @param {HTMLElement} defaultOption - The element representing the currently selected filter.
 * @param {HTMLElement[]} allOptions - An array of filter buttons.
 */
const defaultOption = document.querySelector('#default_option');
const allOptions = Array.from(document.querySelectorAll('.btn_select li button'))

// Diplaying the chosen option
let chosenOption = allOptions.find(filter => filter.textContent == defaultOption.textContent);
chosenOption.style.display = 'none';

allOptions.forEach(filter => {
    filter.addEventListener('click', () => {
        defaultOption.textContent = filter.textContent;
        if (chosenOption) 
        chosenOption.style.display = 'block'; 
        chosenOption = filter;
        chosenOption.style.display = 'none';
        fermetureDropbox()
    })
});

// Gallery image sorting 
options.forEach(option => {
    option.addEventListener("click", () => {
        const selectedValue = option.getAttribute("data-value");
        displayPhotographerMedia(selectedValue);
    });
});

// Enable arrow navigation when the dropbox is open :
const selectNavButtons = document.querySelectorAll(".btn_select button, .btn_drop");
let currentIndex = 0;

  function previoustabindex() {
    if (currentIndex > 0) {
        if (currentIndex === 2) {
            currentIndex--;
        }
        currentIndex--;
    } else {
        currentIndex = selectNavButtons.length - 1;
    }
    selectNavButtons[currentIndex].focus();
  }
  
  function nexttabindex() {
    currentIndex++;
    if (currentIndex === 1) {
        currentIndex++;
    }
    
    if (currentIndex >= selectNavButtons.length) {
        currentIndex = 0;
    }
    selectNavButtons[currentIndex].focus();
  }


// Event listeneer for Arrow and Tab auto-closing for DropBox
let tabCounter = 0;
document.addEventListener('keydown', (event) => {
    if (expendDropButton.getAttribute("aria-expanded") === "true") {
        if (event.key === 'ArrowUp') {
          previoustabindex();
          event.preventDefault();
        } else if (event.key === 'ArrowDown') {
          nexttabindex();
          event.preventDefault();
        } else if (event.key === 'Tab' && tabCounter === 2 && !event.shiftKey) {
            fermetureDropbox();
        } else if (event.key === 'Tab'&& !event.shiftKey) {
            tabCounter++;
        } else if (event.key === 'Tab' && event.shiftKey) {
            tabCounter--;
        }
    }
});


displayPhotographerProfile();
let globalLikeCount = await displayPhotographerMedia();

// Disable background navigation to improve accessibility in Form and lightbox.
export function desactiverNavigationArrierePlan() {
    const logoElements = document.querySelectorAll(".logo");
    logoElements.forEach((logoElement, index) => {
        logoElement.setAttribute('tabindex', index + 1);
    });
    const mainElement = document.querySelector("main");
    const elementsArrierePlan = mainElement.querySelectorAll("*");
    elementsArrierePlan.forEach(element => {
        if (element.classList.contains('tabindex')) {
            console.log(element.getAttribute('tabindex'))
            if (element.getAttribute('tabindex') === '0') {
                console.log("celui la vaut 0")
                element.classList.add('tabindexinit'); 
                element.setAttribute('tabindex', '-1'); 
            }
        } else {
            element.setAttribute('tabindex', '-1')
        }
    });
}

// Enable naviation for accessibility after closing Form and lightbox.
export function activerNavigationArrierePlan() {
    const logoElement = document.querySelector(".logo");
    logoElement.setAttribute('tabindex', '0');
    const mainElement = document.querySelector("main");
    const elementsArrierePlan = mainElement.querySelectorAll("*");
    elementsArrierePlan.forEach(element => {
        if (element.classList.contains('tabindex')) {
            if (element.classList.contains('tabindexinit')) {
                element.setAttribute('tabindex', '0'); 
                element.classList.remove('tabindexinit'); 
            }
        } else {
            element.removeAttribute('tabindex');
        }
    });
}