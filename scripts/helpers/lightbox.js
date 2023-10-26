export function displayLightbox (photographerMediaContainer,photographerMedias,photographerId ) {
    // Elements du DOM et Variables
    const lightbox = document.querySelector('.lightbox-container');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeLightboxButton = document.getElementById('close-lightbox');
    const prevButton = document.getElementById('lightbox-prev');
    const nextButton = document.getElementById('lightbox-next');
    const lightboxTitle = document.querySelector('.lightbox-title');
    let currentMediaIndex = 0;
 
    // Fonction pour ouvrir la lightbox
    function openLightbox(index) {
        lightbox.style.display = 'block';
        currentMediaIndex = index;
        const media = photographerMedias[currentMediaIndex];
        
        if (media.image) {
            lightboxVideo.style.display = 'none';
            lightboxImage.style.display = 'block';
            lightboxImage.src = `./assets/images/${photographerId}/${media.image}`;
            lightboxImage.alt = media.alt;
            lightboxTitle.innerText = `${media.title}`;
        } else if (media.video) {
            lightboxVideo.src = `./assets/images/${photographerId}/${media.video}`;
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxTitle.innerText = `${media.title}`;
        }   
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
        } else {
            // Si c'est la première image, passez à la dernière
            currentMediaIndex = photographerMedias.length - 1;
            openLightbox(currentMediaIndex);
        }
    }

    // Fonction pour afficher l'image suivante
    function showNextImage() {
        if (currentMediaIndex < photographerMedias.length - 1) {
            currentMediaIndex++;
            openLightbox(currentMediaIndex);
        } else {
            // Si c'est la dernière image, revenez à la première
            currentMediaIndex = 0;
            openLightbox(currentMediaIndex);
        }
    }
    // Gestion de l'evenement de l'ouverture de la lightbox
    photographerMediaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('gallery_thumbnail')) {
            const index = photographerMedias.findIndex(media => media.id == event.target.closest('a').dataset.media);
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
        if (event.key === 'ArrowLeft') {
            showPrevImage();
        } else if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'Escape') {
            closeLightbox();
        }
    });
}