/* Cette fonction en paramètre data 
*/

function getUserCardDOM(name, portrait, city, country, tagline, price ) {
        
    const newPhotographerCard = `
    <article>
        <img class="photographer_picture" src='.assets/photographers/${photographer.portrait}' alt="portrait de ${photographer.name}"/>
        <h1 class="photographer_name">${photographer.name}</h1>
        <p class="photographer_citycountry">${photographer.city}, ${photographer.country}</p>
        <p class="photographer_tagline">${photographer.tagline}</p>
        <p class="photographer_price">${photographer.price} €/jour</p>
    </article>
    `
    return newPhotographerCard
    }

 function photographerTemplate(photographerdata) {
    const { name, portrait, city, country, tagline, price } = photographerdata;

    return { name, portrait, city, country, tagline, price };
}