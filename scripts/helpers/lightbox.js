import { desactiverNavigationArrierePlan,activerNavigationArrierePlan } from '../pages/photographer.js'

/** Display and manage the lightbox for photographer's media.
 * @param {Element} photographerMediaContainer - The container element for photographer's media.
 * @param {Array} photographerMedias - An array of photographer's media objects.
 * @param {number} photographerId - The ID of the photographer.
 */
export function displayLightbox (photographerMediaContainer,photographerMedias,photographerId) {
    const lightbox = document.querySelector('.lightbox-container');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeLightboxButton = document.getElementById('close-lightbox');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');
    const lightboxTitle = document.querySelector('.lightbox-title');
    let currentMediaIndex = 0;
 
    // function to openLightbox
    function openLightbox(index) {
        desactiverNavigationArrierePlan();
        lightbox.style.display = 'block';
        currentMediaIndex = index;
        const media = photographerMedias[currentMediaIndex];
        
        if (media.image) {
            lightboxVideo.style.display = 'none';
            lightboxImage.style.display = 'block';
            lightboxImage.src = `./assets/images/${photographerId}/${media.image}`;
            lightboxImage.alt = media.title;
            lightboxTitle.innerText = `${media.title}`;
        } else if (media.video) {
            lightboxVideo.src = `./assets/images/${photographerId}/${media.video}`;
            lightboxImage.alt = media.title;
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxTitle.innerText = `${media.title}`;
        }   
    }

    // function to close lightbox
    function closeLightbox() {
        activerNavigationArrierePlan();
        lightbox.style.display = 'none';
    }

    // Display previous image
    function showPrevImage() {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
            openLightbox(currentMediaIndex);
        } else {
            currentMediaIndex = photographerMedias.length - 1;
            openLightbox(currentMediaIndex);
        }
    }

    // Display next image
    function showNextImage() {
        if (currentMediaIndex < photographerMedias.length - 1) {
            currentMediaIndex++;
            openLightbox(currentMediaIndex);
        } else {

            currentMediaIndex = 0;
            openLightbox(currentMediaIndex);
        }
    }

    // Track if lightbox is open :
    let isLightboxOpen = false;

    // Event listener to open Lightbox with click and with enter key
    photographerMediaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('gallery_thumbnail')) {
            const index = photographerMedias.findIndex(media => media.id == event.target.closest('a').dataset.media);
            if (index !== -1) {
                openLightbox(index);
                isLightboxOpen = true;
            }
        }
    });

    photographerMediaContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const anchorElement = event.target.closest('a');
            if (anchorElement) {
                event.preventDefault();
                const index = photographerMedias.findIndex(media => media.id == anchorElement.dataset.media);
                if (index !== -1) {
                    openLightbox(index);
                    isLightboxOpen = true;
                }
            }
        }
    });

    // Event listener to open Lightbox with enter key
    photographerMediaContainer.addEventListener('keydown', (event) => {
        if ( event.key === 'Enter') {
            const index = photographerMedias.findIndex(media => media.id == event.target.closest('a').dataset.media);
            if (index !== -1) {
                openLightbox(index);
                isLightboxOpen = true;
            }
        }
    });

    // Event listener to close the lightbox
    closeLightboxButton.addEventListener('click', () => {
        closeLightbox();
        isLightboxOpen = false;
    });
    
    closeLightboxButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          closeLightbox();
          isLightboxOpen = false;
        }
      });

    // Event listener for next and previous button
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Event Listener to use escape to close and arrow to navigate
    document.addEventListener('keydown', (event) => {
        if (isLightboxOpen) {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            } else if (event.key === 'Escape') {
                closeLightbox();
                isLightboxOpen = false;
            }
        }
    });
}