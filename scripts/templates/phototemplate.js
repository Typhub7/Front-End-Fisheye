/* Cette fonction en paramètre data 
*/
function photographerTemplate(data) {
    const { name,id , portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        const photographerLink = document.createElement('a');
        photographerLink.href = `./photographer.html?id=${id}`;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.classList.add("photographer_picture")

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.classList.add("photographer_name")

        const placeElement = document.createElement( 'p' );
        placeElement.textContent = `${city}, ${country}`;
        placeElement.classList.add("photographer_place")

        const taglineElement = document.createElement( 'p' );
        taglineElement.textContent = tagline;
        taglineElement.classList.add("photographer_tagline")

       const priceElement = document.createElement( 'p' );
        priceElement.textContent = `${price} €/jour`;
        priceElement.classList.add("photographer_price") 
        
        article.appendChild(photographerLink);
        photographerLink.appendChild(img);
        article.appendChild(h2);
        article.appendChild(placeElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        return (article);
    }
    
    return { name, picture, getUserCardDOM }
}