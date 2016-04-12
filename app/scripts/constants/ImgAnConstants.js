/**
 * @file : ImgAnConstants.js
 * @overview : Constants for ImageAnotor app
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import KeyMirror from 'keymirror'

/**
 * Object ImageAnotorConstants which contains all the ImageAnotor constants
 */
var ImgAnConstants = {
    ActionsTypes: KeyMirror({
        CHANGE_VIEW: null,
        SEND_IMAGE_URI: null,

        INIT_MAP: null,

        SET_MAP_TOOL_ANNOTATE: null,
        SET_MAP_TOOL_DRAW_BOX: null,
        SET_MAP_TOOL_DRAW_CIRCLE: null,
        SET_MAP_TOOL_DRAW_POLYGON: null,
        SET_MAP_TOOL_DRAW_SQUARE: null,
        SET_MAP_TOOL_DRAW_POINT: null,
        SET_MAP_TOOL_DELETE: null,
        SET_MAP_TOOL_MOVE: null,
        SET_MAP_TOOL_MODIFY: null,

        MAP_VIEW_CENTER: null,
        MAP_ZOOM_IN: null,
        MAP_ZOOM_OUT: null,

        TAG_ADDED: null,
        TAG_SELECTED: null,
        TAG_DELETED: null,
        TAG_UNSELECTED: null,
        TAG_MODIFIED: null,

        AN_LOADED: null,
        AN_SAVED: null

    }),

    MapState: KeyMirror({
        CHANGE_TOOL: null,
        VIEW_CONTROL: null,
        INIT_MAP: null
    }),

    Tools: KeyMirror({
        ANNOTATE: null,
        DRAW_BOX: null,
        DRAW_CIRCLE: null,
        DRAW_POLYGON: null,
        DRAW_SQUARE: null,
        DRAW_POINT: null,
        DELETE: null,
        MOVE: null,
        MODIFY: null
    }),

    viewControls: KeyMirror({
        VIEW_CENTER: null,
        ZOOM_IN: null,
        ZOOM_OUT: null
    }),

    TagState: KeyMirror({
        ADDED: null,
        DELETED: null,
        SELECTED: null,
        UNSELECTED: null,
        MODIFIED: null
    }),

    AnState: KeyMirror({
        LOADED: null,
        SAVED: null
    }),

    tagShapes: KeyMirror({
        SQUARE: null,
        BOX: null,
        CIRCLE: null,
        POINT: null,
        POLYGON: null
    })
};

module.exports = ImgAnConstants;
