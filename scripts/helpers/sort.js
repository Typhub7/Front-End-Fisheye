// Fonction pour trier les images en fonction de l'option sélectionnée
export function sortImages(option) {
    const gallery = document.querySelector("photograph-gallery-container");
    console.log("gallery",gallery)
    const images = Array.from(gallery.getElementsByClassName("gallery_card"));

    images.sort((a, b) => {
        if (option === "popularite") {
            const likesA = parseInt(a.querySelector(".numberLike").textContent, 10);
            const likesB = parseInt(b.querySelector(".numberLike").textContent, 10);
            return likesB - likesA; // Trie par popularité décroissante
        } else if (option === "date") {
            // Mettez en place votre logique de tri par date ici
        } else if (option === "titre") {
            const titleA = a.querySelector("h2").textContent.toLowerCase();
            const titleB = b.querySelector("h2").textContent.toLowerCase();
            return titleA.localeCompare(titleB); // Trie par titre alphabétique
        }
    });

    // Réinsérez les images triées dans la galerie
    images.forEach(image => gallery.appendChild(image));
}

