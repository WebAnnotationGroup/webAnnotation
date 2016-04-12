/**
 * @file : Storage.js
 * @overview : WAStorage class, he act like a sort of "local storage" but when
 * application is shutted down (by refresh, ...) all data is lost.
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import Image from './Image';

class Storage {
    /** @overview : Constructor of the storage */
    constructor() {
        this.images = [];
        this.imagesGeneratorid = 0;
    }

    getImages() {
        return this.images;
    }

    getImage(id) {
        for (let i = this.images.length - 1; i >= 0; i--) {
            if (this.images[i].getId() === id) {
                return this.images[i];
            }
        }
    }

    setImage(image) {
        for (let i = this.images.length - 1; i >= 0; i--) {
            if (this.images[i].getId() === image.id) {
                this.images[i] = image;
            }
        }
    }

    addImage(name, base64, width, height) {
        this.imagesGeneratorid += 1;
        this.images.push(new Image(this.imagesGeneratorid, name, base64, width, height));
        return this.imagesGeneratorid;
    }

    rmImage(id) {
        for (let i = this.images.length - 1; i >= 0; i--) {
            if (this.images[i].getId() === id) {
                this.images.splice(i, 1);
            }
        }
    }

    getJSONImAnData(imageId) {
        let image = Object.assign({}, this.getImage(imageId));
        image = this.getImage(imageId);
        let jsonAsString = JSON.stringify(image);
        let jsonobj = JSON.parse(jsonAsString);
        jsonobj.features = JSON.parse(jsonobj.features);
        jsonAsString = JSON.stringify(jsonobj, null, '\t');
        return jsonAsString;
    }

    loadJSONAnImage(json) {
        let jsonobj = JSON.parse(json);
        let imageName = jsonobj.name;
        let imageBase64 = jsonobj.base64;
        let imageWidth = jsonobj.width;
        let imageHeight = jsonobj.height;
        let imageFeatures = JSON.stringify(jsonobj.features);
        this.addImage(imageName, imageBase64, imageWidth, imageHeight);
        let imageId = this.imagesGeneratorid;
        let image = this.getImage(imageId);
        image.setFeatures(imageFeatures);
        let annotations = jsonobj.annotations;
        for (let i = 0; i < annotations.length; i++) {
            let anText = annotations[i].text;
            let tagId = annotations[i].tagId;
            let tagShape = annotations[i].tagShape;
            image.addAnnotation(anText, tagId, tagShape)
        }
    }
}

var WAStorage = new Storage();

module.exports = WAStorage;
