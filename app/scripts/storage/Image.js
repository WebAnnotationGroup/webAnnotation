/**
 * @file : Image.js
 * @overview : Image WAStorage class
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import Annotation from './Annotation';

export default class Image {
    /** @overview : Constructor of an Image */
    constructor(id, name, base64, width, height) {
        this.id = id;
        this.base64 = base64;
        this.name = name;
        this.width = width;
        this.height = height;
        this.annotations = [];
        this.features; //GEO Json object
    }

    /**
     * @overview method to add a new annotation
     * @param text Annotation text
     * @param tagId Annotation id (link with feature id)
     * @param tagShape Annotation tag shape
     */
    addAnnotation(text, tagId, tagShape) {
        this.annotations.push(new Annotation(text, tagId, tagShape));
    }

    /**
     * @overview method to remove an annotation
     * @param tagId
     */
    rmAnnotation(tagId) {
        for (let i = this.annotations.length - 1; i >= 0; i--) {
            if (this.annotations[i].getTagId() === tagId) {
                this.annotations.splice(i, 1);
            }
        }
    }

    /**
     * @overview Setter of the id of the image
     * @param id new Id
     */
    setId(id) {
        this.id = id;
    }

    /**
     * @overview Getter for the array of annotations
     * @returns {Array} all annotations
     */
    getAnnotations() {
        return this.annotations;
    }

    /**
     * @overview Getter for one annotation with a precise tag id
     * @param tagId
     * @returns The annotation
     */
    getAnnotation(tagId) {
        for (let i = this.annotations.length - 1; i >= 0; i--) {
            if (this.annotations[i].getTagId() === tagId) {
                return this.annotations[i];
            }
        }
    }

    /**
     * @overview Getter for the image id
     * @returns The image id
     */
    getId() {
        return this.id;
    }

    /**
     * @overview Getter for the image base64
     * @returns The image base64
     */
    getBase64() {
        return this.base64;
    }

    /**
     * @overview Getter for the image width
     * @returns The image width
     */
    getWidth() {
        return this.width;
    }

    /**
     * @overview Getter for the image height
     * @returns The image height
     */
    getHeight() {
        return this.height;
    }

    /**
     * @overview Getter for the image name
     * @returns The image name
     */
    getName() {
        return this.name;
    }

    /**
     * @overview Setter for the image name
     * @param name The new image name
     */
    setName(name) {
        this.name = name;
    }

    /**
     * @overview Setter for the image features (all tags)
     * @param geojson object with contains all tags data (coordonates, tagId, ...)
     */
    setFeatures(features) {
        this.features = features;
    }

    /**
     * @overview Getter for the image features (all tags)
     * @returns All the features
     */
    getFeatures() {
        return this.features;
    }

    //DRAWING functions
    drawPoint(x, y) {
        //Create coordinates
        let coordinates = [];
        coordinates.push(x);
        coordinates.push(y);
        let geometry = {coordinates: coordinates, type: "Point"};
        //create annotation
        this.createAnnotation(geometry, "POINT");
        console.log(this.annotations);
    }

    drawBox(bottomLeftX, bottomLeftY, width, height) {
        //Create coordinates
        let coordinates = [];
        let points = [];
        points.push([bottomLeftX, bottomLeftY]);
        points.push([bottomLeftX + width, bottomLeftY]);
        points.push([bottomLeftX + width, bottomLeftY + height]);
        points.push([bottomLeftX, bottomLeftY + height]);
        points.push([bottomLeftX, bottomLeftY]);
        coordinates.push(points);
        let geometry = {coordinates: coordinates, type: "Polygon"};
        //create annotation
        this.createAnnotation(geometry, "BOX");
    }

    drawSquare(centerX, centerY, width, height, angle) {
        let coordinates = [];
        let points = [];
        points.push([centerX-(width/2) , centerY-(height/2)]);
        points.push([centerX+(width/2) , centerY-(height/2)]);
        points.push([centerX+(width/2) , centerY+(height/2)]);
        points.push([centerX-(width/2) , centerY+(height/2)]);
        points.push([centerX-(width/2) , centerY-(height/2)]);

        for(let i = 0 ; i < points.length ; i++) {
            points[i] = this.rotatePoint(centerX, centerY, points[i], angle);
        }

        coordinates.push(points);
        let geometry = {coordinates: coordinates, type: "Polygon"};
        //create annotation
        this.createAnnotation(geometry, "SQUARE");
    }

    rotatePoint(centerX, centerY, point, angle) {
        let s = Math.sin(angle);
        let c = Math.cos(angle);

        point[0] -= centerX;
        point[1] -= centerY;

        let newX = point[0] * c - point[1] * s;
        let newY = point[0] * s + point[1] * c;

        point[0] = centerX + newX;
        point[1] = centerY + newY;

        return point;
    }

    createAnnotation(geometry, tagShape) {
        let parsed = JSON.parse(this.features);
        let newId = this.getLastAnnotationId() + 1;
        //Create annotation
        this.addAnnotation("vide", newId, tagShape);
        //Create tag
        let properties = {id:newId};
        parsed.features.push({geometry:geometry, properties:properties, type:"Feature"});
        this.features = JSON.stringify(parsed);
        console.log(parsed);
    }

    getLastAnnotationId() {
        let id = 0;
        for (let i = this.annotations.length - 1; i >= 0; i--) {
            if (this.annotations[i].getTagId() >= id) {
                id = this.annotations[i].getTagId();
            }
        }
        return id;
    }

};
