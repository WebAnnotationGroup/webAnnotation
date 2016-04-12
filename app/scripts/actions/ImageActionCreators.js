/**
 * @file : ImageActionCreators.js
 * @overview : actions methods to change current work image data
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview : Action who send data of current work image (base64, dims) */
export function sendCurrentImageData(imgId, imgUri, width, height) {
    return {
        type: ImgAnConstants.ActionsTypes.SEND_IMAGE_URI,
        imgId: imgId,
        imgUri: imgUri,
        imgWidth: width,
        imgHeight: height
    }
}
