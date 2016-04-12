/**
 * @file : MapActionCreators.js
 * @overview : actions methods to interact with map component
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview : Action which init map lib */
export function initMap() {
    return {
        type: ImgAnConstants.ActionsTypes.INIT_MAP
    }
}

/** @overview : Action which select the select tool */
export function changeToolToAnnotate() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_ANNOTATE
    }
}

/** @overview : Action which select the draw circle tool */
export function changeToolToDrawCircle() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_CIRCLE
    }
}

/** @overview : Action which select the draw point tool */
export function changeToolToDrawPoint() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_POINT
    }
}

/** @overview : Action which select the draw polygon tool */
export function changeToolToDrawPolygon() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_POLYGON
    }
}

/** @overview : Action which select the draw box tool */
export function changeToolToDrawBox() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_BOX
    }
}

/** @overview : Action which select the draw square tool */
export function changeToolToDrawSquare() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_SQUARE
    }
}

/** @overview : Action which select the delete tool */
export function changeToolToDelete() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DELETE
    }
}

/** @overview : Action which select the move tool */
export function changeToolToMove() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_MOVE
    }
}

/** @overview : Action which select the modify tool */
export function changeToolToModify() {
    return {
        type: ImgAnConstants.ActionsTypes.SET_MAP_TOOL_MODIFY
    }
}

/** @overview : Action which center the map lib view (focus on image) */
export function setViewCenter() {
    return {
        type: ImgAnConstants.ActionsTypes.MAP_VIEW_CENTER
    }
}

/** @overview : Action which zoom in the map lib view*/
export function performViewZoomIn() {
    return {
        type: ImgAnConstants.ActionsTypes.MAP_ZOOM_IN
    }
}

/** @overview : Action which zoom out the map lib view*/
export function performViewZoomOut() {
    return {
        type: ImgAnConstants.ActionsTypes.MAP_ZOOM_OUT
    }
}
