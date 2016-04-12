/**
 * @file : AnActionCreators.js
 * @overview : actions methods to notify components when an annotation state changed
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview : Action which tell that an annotation was saved */
export function annotationSaved() {
    return {
        type: ImgAnConstants.ActionsTypes.AN_SAVED
    }
}

/** @overview : Action which tell that an annotation was loaded */
export function annotationLoaded() {
    return {
        type: ImgAnConstants.ActionsTypes.AN_LOADED
    }
}