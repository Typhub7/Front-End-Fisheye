/** Represents photographer information.
 * @constructor
 * @param {Object} data - The data object containing photographer details.
 * @property {string} name - The name of the photographer.
 * @property {number} id - The unique identifier of the photographer.
 * @property {string} city - The city where the photographer is based.
 * @property {string} country - The country where the photographer is located.
 * @property {string} tagline - The tagline or description of the photographer's.
 * @property {number} price - The price or rate of the photographer's services.
 * @property {string} portrait - The URL of the photographer's portrait.
 */
export class PhotographerInfo {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    } 
}