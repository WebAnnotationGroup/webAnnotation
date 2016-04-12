/**
 * @file : UIReducer.js
 * @overview : Reducer which manage data for the UI part of the ImageAnotor app
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview State of the Data reducer */
var initialUIState = {
    view: "index" //View label (index, imgAnEditTool, imgAnViewTool)
};

/** @overview Function who handles launched actions */
export default function _UI(state = initialUIState, action) {
    switch (action.type) {
        case ImgAnConstants.ActionsTypes.CHANGE_VIEW: //If view have to be changed
            return {
                ...state,
                view: action.nextView //We set the new view
            };
        default: //If action not concern this reducer
            return state; //We return base state
    }
}
