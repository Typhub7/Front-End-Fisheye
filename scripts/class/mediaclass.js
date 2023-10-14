export class Media {
    constructor(data) {
      this.id = data.id;
      this.image = data.image;
      this.title = data.title;
      this.imgPhotographerId = data.photographerId;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
    }
}

export class Image extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }
};

export class Video extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }
};

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

