/**
 * @file : MapReducer.js
 * @overview : Reducer which manage map component of the ImageAnotor app
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import ImgAnConstants from '../constants/ImgAnConstants';

/** @overview State of the Data reducer */
var initialMAPState = {
    tagId: -1,
    tagState: null,
    mapTool: ImgAnConstants.Tools.MOVE,
    viewControl: null,
    forceMapRefresh: 1,
    renderType: null
};

/** @overview Function who handles launched actions */
export default function _MAP(state = initialMAPState, action) {
    switch (action.type) {
        case ImgAnConstants.ActionsTypes.INIT_MAP:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.INIT_MAP,
                viewControl: null,
                forceMapRefresh: state.forceMapRefresh + 1,
                tagId: -1,
                mapTool:ImgAnConstants.Tools.MOVE
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_ANNOTATE:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.ANNOTATE,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_BOX:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.DRAW_BOX,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_CIRCLE:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.DRAW_CIRCLE,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_POLYGON:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.DRAW_POLYGON,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_SQUARE:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.DRAW_SQUARE,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DRAW_POINT:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.DRAW_POINT,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_DELETE:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.DELETE,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_MOVE:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.MOVE,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.SET_MAP_TOOL_MODIFY:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.CHANGE_TOOL,
                mapTool: ImgAnConstants.Tools.MODIFY,
                viewControl: null,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.MAP_VIEW_CENTER:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.VIEW_CONTROL,
                viewControl: ImgAnConstants.viewControls.VIEW_CENTER,
                forceMapRefresh: state.forceMapRefresh + 1
            };

        case ImgAnConstants.ActionsTypes.MAP_ZOOM_IN:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.VIEW_CONTROL,
                viewControl: ImgAnConstants.viewControls.ZOOM_IN,
                forceMapRefresh: state.forceMapRefresh + 1
            };

        case ImgAnConstants.ActionsTypes.MAP_ZOOM_OUT:
            return {
                ...state,
                renderType: ImgAnConstants.MapState.VIEW_CONTROL,
                viewControl: ImgAnConstants.viewControls.ZOOM_OUT,
                forceMapRefresh: state.forceMapRefresh + 1
            };

        case ImgAnConstants.ActionsTypes.TAG_ADDED:
            return {
                ...state,
                tagState: ImgAnConstants.TagState.ADDED,
                tagId: action.tagId,
                forceMapRefresh: state.forceMapRefresh + 1
            };


        case ImgAnConstants.ActionsTypes.TAG_SELECTED:
            return {
                ...state,
                tagState: ImgAnConstants.TagState.SELECTED,
                tagId: action.tagId
            };

        case ImgAnConstants.ActionsTypes.TAG_UNSELECTED:
            return {
                ...state,
                tagState: ImgAnConstants.TagState.UNSELECTED,
                tagId: -1
            };

        case ImgAnConstants.ActionsTypes.TAG_DELETED:
            return {
                ...state,
                tagState: ImgAnConstants.TagState.DELETED,
                tagId: action.tagId,
                forceMapRefresh: state.forceMapRefresh + 1
            };

        case ImgAnConstants.ActionsTypes.TAG_MODIFIED:
            return {
                ...state,
                tagState: ImgAnConstants.TagState.MODIFIED,
                tagId: action.tagId,
                forceMapRefresh: state.forceMapRefresh + 1
            };

        default: //If action not concern this reducer
            return state; //We return base state
    }
}
