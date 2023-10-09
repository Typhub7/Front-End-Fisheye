    // Cette fonction utilise la méthode fetch pour récupérer les données depuis le fichier JSON
    // Retourne les donnéees en ne récupérant que les données photographers

    async function getPhotographers() {
        try {
            const response = await fetch('../data/photographers.json');
    
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données des photographes.');
            }
    
            const data = await response.json();
            const photographers = data.photographers;
            console.log(photographers)
            return photographers;
            
        } catch (error) {
            console.error(error);
            // En cas d'erreur remplir le champ pour gérer l'erreur ou renvoyer une valeur par défaut si nécessaire
            return [] ;
        }
    }
        

    // Cette fonction reçoit en un tableau contennant les données des photographes
    // Elle les affiche dans la section HMTL de classe .photographer_section
    // Pour chaque photographe, elle utilise photographerTemplate qui crée 
    // un modèle de cate utilisateur et récupère l'element DOM avec getUserCardDOM
    // Cet élement DOM est ensuite ajouter à la section.
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            console.log ("photographer", photographer)
            const photographerModel = photographerTemplate(photographer);
            console.log ("photographerModel",photographerModel)
            const userCardDOM = photographerModel.getUserCardDOM();
            console.log ("userCardDOM", userCardDOM)
            photographersSection.appendChild(userCardDOM);
        });
    }

    // Cette fonction démarre le processus de traitement.
    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
