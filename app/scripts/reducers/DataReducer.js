/**
 * @file : DataReducer.js
 * @overview : Reducer which manage data of the ImageAnotor app
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview State of the Data reducer */
var initialDATAState = {
    imgId: -1,
    imgUri: "", //image Base64
    imgWidth: 0,
    imgHeight: 0
};

/** @overview Function who handles launched actions */
export default function _UI(state = initialDATAState, action) {
    switch (action.type) {
        case ImgAnConstants.ActionsTypes.SEND_IMAGE_URI: //If we get a new image uri (base64)
            return {
                ...state,
                imgId: action.imgId,
                imgUri: action.imgUri, //We set the new image URI
                imgWidth: action.imgWidth,
                imgHeight: action.imgHeight
            };
        default: //If action not concern this reducer
            return state; //We return base state
    }
}
