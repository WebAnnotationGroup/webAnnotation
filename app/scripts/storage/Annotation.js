/**
 * @file : Annotation.js
 * @overview : Annotation WAStorage class
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

export default class Annotation {
    /** @overview : Constructor of an Annotation */
    constructor(text, tagId, tagShape) {
        this.text = text;
        this.tagId = tagId;
        this.tagShape = tagShape;
    }

    /** @overview : Getters for tag shape (CIRCLE, POINT, SQUARE, ...) */
    getTagShape() {
        return this.tagShape;
    }

    /** @overview : Getters for annotation text */
    getText() {
        return this.text;
    }

    /** @overview : Getters for annotation id */
    getTagId() {
        return this.tagId;
    }

    /** @overview : Setter for annotation text */
    setText(text) {
        this.text = text;
    }

    /** @overview : Setter for tag shape (CIRCLE, POINT, SQUARE, ...) */
    setTagShape(tagShape) {
        this.tagShape = tagShape;
    }

};
