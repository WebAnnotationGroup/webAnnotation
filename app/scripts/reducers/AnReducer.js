/**
 * @file : AnReducer.js
 * @overview : Reducer which manage data of the Annotations
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview State of the Data reducer */
var initialANState = {
    anState: null
};

/** @overview Function who handles launched actions */
export default function _AN(state = initialANState, action) {
    switch (action.type) {
        case ImgAnConstants.ActionsTypes.AN_LOADED:
            return {
                ...state,
                anState: ImgAnConstants.AnState.LOADED
            };
        case ImgAnConstants.ActionsTypes.AN_SAVED:
            return {
                ...state,
                anState: ImgAnConstants.AnState.SAVED
            };
        default:
            return state;
    }
}
