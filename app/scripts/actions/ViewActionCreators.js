/**
 * @file : ViewActionCreators.js
 * @overview : actions methods to change the app view
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview : Action which show the edit img an tool */
export function changeViewToImgAnEditTool() {
    return {
        type: ImgAnConstants.ActionsTypes.CHANGE_VIEW,
        nextView: "imgAnEditTool"
    }
}

/** @overview : Action which show the view img an tool */
export function changeViewToImgAnViewTool() {
    return {
        type: ImgAnConstants.ActionsTypes.CHANGE_VIEW,
        nextView: "imgAnViewTool"
    }
}


/** @overview : Action which show the index */
export function changeViewToIndex() {
    return {
        type: ImgAnConstants.ActionsTypes.CHANGE_VIEW,
        nextView: "index"
    }
}
