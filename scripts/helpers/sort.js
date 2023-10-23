// Fonction pour trier les images en fonction de l'option sélectionnée
function sortImages(option) {
    const gallery = document.getElementById("photograph-gallery");
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

// Écoutez l'événement change de l'élément select
const selectElement = document.getElementById("selection");
selectElement.addEventListener("change", (event) => {
    const selectedOption = event.target.value;
    sortImages(selectedOption);
});