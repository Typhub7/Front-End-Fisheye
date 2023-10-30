/** Represents media information.
 * @constructor
 * @param {Object} data - The data object containing media details.
 * @property {number} id - The unique identifier of the media.
 * @property {string} title - The title or name of the media.
 * @property {number} imgPhotographerId - The photographer's identifier of the media.
 * @property {number} likes - The number of likes the media has received.
 * @property {string} date - The date when the media was captured.
 * @property {number} price - The price or cost of the media.
 */
export class Media {
    constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.imgPhotographerId = data.photographerId;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
    }
}

/** Represents an image media.
 * @constructor
 * @extends Media
 * @param {Object} data - The data object containing image media details.
 * @property {string} image - The URL or path to the image.
 */
export class Image extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }
};

/** Represents a video media.
 * @constructor
 * @extends Media
 * @param {Object} data - The data object containing video media details.
 * @property {string} video - The URL or path to the video.
 */
export class Video extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }
};

/** Factory class for creating media objects (Image or Video).
 * @constructor
 * @param {Object} data - The data object containing media details.
 * @returns {Image|Video} - An instance of either Image or Video based on the data format.
 * @throws {string} - Throws an error if the data format is incompatible with images or videos.
 */
export class MediasFactory {
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw 'Format incompatible avec les images ou les videos'
        }
    }
}

