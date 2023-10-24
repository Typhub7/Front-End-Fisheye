export function displayLightbox (photographerMediaContainer,photographerMedias) {
    // Variables
    console.log("photographerMediaContainer",photographerMediaContainer)
    console.log("photographerMedias",photographerMedias)
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightboxButton = document.getElementById('close-lightbox');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');
    let currentMediaIndex = 0;
 

    // Fonction pour ouvrir la lightbox
     function openLightbox(index) {
        lightbox.style.display = 'block';
        currentMediaIndex = index;
        const media = photographerMedias[currentMediaIndex];
        lightboxImage.src = `./assets/images/${photographerId}/${media.image}`;
        lightboxImage.alt = media.alt;
        lightbox.style.display = 'block';
    }

    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    // Fonction pour afficher l'image précédente
    function showPrevImage() {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
            openLightbox(currentMediaIndex);
        }
    }

    // Fonction pour afficher l'image suivante
    function showNextImage() {
        if (currentMediaIndex < photographerMedias.length - 1) {
            currentMediaIndex++;
            openLightbox(currentMediaIndex);
        }
    }
    // Gestion de l'evenement de l'ouverture de la lightbox
    photographerMediaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('gallery_thumbnail')) {
            const index = photographerMedias.findIndex(media => media.id === event.target.dataset.media);
            if (index !== -1) {
                openLightbox(index);
            }
        }
        });

    closeLightboxButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Fermer la lightbox en appuyant sur la touche "Echap"
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });
}