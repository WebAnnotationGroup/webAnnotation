import React from 'react';
import { connect } from 'react-redux';
import ol from 'openlayers';
import ImgAnConstants from '../../constants/ImgAnConstants';
import MapActionCreators from '../../actions/MapActionCreators';
import $ from 'jquery';
import WAStorage from '../../storage/storage';

/** Data coming from reducers that we want use in this component */
function mapStateToProps(state) {
    return {
        imgId: state._DATA.imgId,
        imgUri: state._DATA.imgUri,
        imgWidth: state._DATA.imgWidth,
        imgHeight: state._DATA.imgHeight,
        mapTool: state._MAP.mapTool,
        viewControl: state._MAP.viewControl,
        currentView: state._UI.view,
        forceMapRefresh: state._MAP.forceMapRefresh,
        renderType: state._MAP.renderType
    }
}

var curLayer = 0;
var currentMapTool = "";
var tagId = 0;
var selectedtagId = -1;
var self;

export default class ImgAnLibMapC extends React.Component {

    /** @overview : Constructor of the ImgAnLibMapC
     * Here we define all object in link with the map*/
    constructor() {
        super();
        this.extent = null; //Dimention of the image
        this.projection = null;
        this.map = null; //The map object
        this.view = null;

        //All sources
        this.imageSource = null;
        this.annotationSources = [];

        //All layers
        this.imageLayer = null;
        this.tagLayers = [];

        //All interactions of the map (for us it's like tools)
        this.drawInteraction = null;
        this.modifyInteraction = null;
        this.translateInteraction = null;
        this.selectInteraction = null;
        this.deleteInteraction = null;
    }

    /** @overview : initialize the map object */
    initMapComponent() {
        this.tagId = 0;

        this.initMapProjection();
        this.initMapSources();
        this.initMapLayers();
        this.initMapView();

        this.map = new ol.Map({
            target: 'map', //ID of the parent object to attach this object
            layers: [this.imageLayer, this.tagLayers[0]],
            view: this.view
        });
        let target = this.map.getTarget();

        this.removeDefaultMapHtml();

        this.loadImgAn();

        currentMapTool = ImgAnConstants.Tools.MOVE;

        self = this;
    }

    /** @overview : initialize the map extent and projection */
    initMapProjection() {
        this.extent = [0, 0, this.props.imgWidth, this.props.imgHeight]; //Dimension of working image

        this.projection = new ol.proj.Projection({ //Projection type of the map
            code: 'xkcd-image',
            units: 'pixels',
            extent: this.extent
        });
    }

    /** @overview : initialize all sources */
    initMapSources() {
        this.imageSource = new ol.source.ImageStatic({ //Image source
            url: this.props.imgUri, //Image layer
            projection: this.projection, //Projection layer
            imageExtent: this.extent //Extent layer
        });
        this.annotationSources.push(this.createSource());
    }

    /** @overview : initialize all layers */
    initMapLayers() {
        this.imageLayer = new ol.layer.Image({ //Image layer (first layer)
            source: this.imageSource
        });
        let tagLayer0 = this.createLayer(this.annotationSources[0], 0);
        this.tagLayers.push(tagLayer0);
    }

    /** @overview : initialize the final map view (final part of init)*/
    initMapView() {
        this.view = new ol.View({ //Define the view infos
            projection: this.projection, //projection
            center: ol.extent.getCenter(this.extent), //Center of the view
            zoom: 1, //Current zoom
            maxZoom: 4 //Max zoom
        });
    }

    createSource() {
        return new ol.source.Vector({wrapX: false});
    }

    createLayer(source, zIndex) {
        let layer = new ol.layer.Vector({ //Annotation layer (second layer)
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })
            })
        });
        return layer;
    }

    /** @overview : method to remove default open layers map style*/
    removeDefaultMapHtml() {
        document.getElementsByClassName("ol-viewport")[0].setAttribute("style", "line-height:0px;");
        document.getElementsByClassName("ol-overlaycontainer-stopevent")[0].setAttribute("style", "visibility:hidden;height:0px;");
        document.getElementsByClassName("ol-zoom ol-unselectable ol-control")[0].setAttribute("style", "visibility:hidden;height:0px;");
        document.getElementsByClassName("ol-zoom-in")[0].setAttribute("style", "visibility:hidden;height:0px;"); // Attach class to the zoom in button
        document.getElementsByClassName("ol-zoom-in")[0].setAttribute("id", "ZOOM_IN_BUTTON");
        document.getElementsByClassName("ol-zoom-out")[0].setAttribute("style", "visibility:hidden;height:0px;"); // Attach class to the zoom out button
        document.getElementsByClassName("ol-zoom-out")[0].setAttribute("id", "ZOOM_OUT_BUTTON");
        document.getElementsByClassName("ol-control")[1].setAttribute("style", "visibility:hidden;height:0px;"); // Hide openLayers credits
        document.getElementsByClassName("ol-control")[2].setAttribute("style", "visibility:hidden;height:0px;"); // Hide openLayers credits
    }

    /** @overview : method to detach all map interaction (no tool is active)*/
    detachAllMapInteractions() {
        selectedtagId = -1;
        this.map.removeInteraction(this.selectInteraction);
        this.map.removeInteraction(this.modifyInteraction);
        this.map.removeInteraction(this.translateInteraction);
        this.map.removeInteraction(this.drawInteraction);
        this.map.removeInteraction(this.deleteInteraction);
    }

    /** @overview : method to remove a tag with a given id*/
    removeTagById(id) {
        if (id >= 0) {
            let features = this.annotationSources[curLayer].getFeatures();
            if (features != null && features.length > 0) {
                let x;
                for (x in features) {
                    let properties = features[x].getProperties();
                    let tmpTagId = properties.id;
                    if (id == tmpTagId) {
                        this.annotationSources[curLayer].removeFeature(features[x]);
                        this.deleteInteraction.getFeatures().clear();
                        break;
                    }
                }
            }
        }
    }

    /** @overview : method to change lib tool (create the tool we want in live)*/
    changeTool(tool) {
        this.detachAllMapInteractions();
        if (tool === ImgAnConstants.Tools.MOVE) {
            this.changeToolToMove();
        } else if (tool === ImgAnConstants.Tools.DRAW_CIRCLE) {
            this.changeToolToDrawCircle();
        } else if (tool === ImgAnConstants.Tools.DRAW_POINT) {
            this.changeToolToDrawPoint();
        } else if (tool === ImgAnConstants.Tools.DRAW_POLYGON) {
            this.changeToolToDrawPolygon();
        } else if (tool === ImgAnConstants.Tools.DRAW_SQUARE) {
            this.changeToolToDrawSquare();
        } else if (tool === ImgAnConstants.Tools.DRAW_BOX) {
            this.changeToolToDrawBox();
        } else if (tool === ImgAnConstants.Tools.DELETE) {
            this.changeToolToDelete();
        } else if (tool === ImgAnConstants.Tools.ANNOTATE) {
            this.changeToolToSelect();
        } else if (tool === ImgAnConstants.Tools.MODIFY) {
            this.changeToolToModify();
        }
    }

    /** @overview : method to create the select tool*/
    changeToolToSelect() {
        this.selectInteraction = new ol.interaction.Select();
        this.selectInteraction.getFeatures().on('add', function (event) {
            let properties = event.element.getProperties();
            selectedtagId = properties.id;
            self.props.dispatch({type: ImgAnConstants.ActionsTypes.TAG_SELECTED, tagId: selectedtagId});//selected tag action
        });
        this.selectInteraction.getFeatures().on('remove', function (event) {
            let properties = event.element.getProperties();
            selectedtagId = -1;
            self.props.dispatch({type: ImgAnConstants.ActionsTypes.TAG_UNSELECTED});//unselected tag action
        });
        this.map.addInteraction(this.selectInteraction);
    }

    /** @overview : method to create the delete tool*/
    changeToolToDelete() {
        this.deleteInteraction = new ol.interaction.Select();
        this.deleteInteraction.getFeatures().on('add', function (event) {
            let properties = event.element.getProperties();
            selectedtagId = properties.id;
            self.removeTagById(selectedtagId);
            let curImage = WAStorage.getImage(self.props.imgId);
            curImage.rmAnnotation(selectedtagId);
            self.props.dispatch({type: ImgAnConstants.ActionsTypes.TAG_DELETED, tagId: selectedtagId});//deleted tag action
            selectedtagId = -1;
        });
        this.map.addInteraction(this.deleteInteraction);
    }

    /** @overview : method to create the move tool*/
    changeToolToMove() {
        //Empty because by default the move tool is when we have no interaction.
        //So thats it, but in case we want to do something when move tool is selected, the method is here !
    }

    /** @overview : method to create the modify tool*/
    changeToolToModify() {
        this.changeToolToSelect(); //We need to have select tool enable to use modify tool
        this.modifyInteraction = new ol.interaction.Modify({
            features: this.selectInteraction.getFeatures()
        });
        this.modifyInteraction.on('modifyend', function (event) {
            let curImage = WAStorage.getImage(self.props.imgId);
            let curAn = curImage.getAnnotation(selectedtagId);
            if (curAn.getTagShape() != ImgAnConstants.tagShapes.POINT && curAn.getTagShape() != ImgAnConstants.tagShapes.POLYGON) {
                curAn.setTagShape(ImgAnConstants.tagShapes.POLYGON);
            }
            self.props.dispatch({type: ImgAnConstants.ActionsTypes.TAG_MODIFIED, tagId: selectedtagId});//deleted tag action
        });
        this.translateInteraction = new ol.interaction.Translate({
            features: this.selectInteraction.getFeatures()
        });
        this.map.addInteraction(this.modifyInteraction);
        this.map.addInteraction(this.translateInteraction);
    }

    /** @overview : method to create the draw circle tool*/
    changeToolToDrawCircle() {
        let geometryFunction = ol.interaction.Draw.createRegularPolygon(100);
        this.drawInteraction = new ol.interaction.Draw({
            source: this.annotationSources[curLayer],
            type: /** @type {ol.geom.GeometryType} */ ('Circle'),
            geometryFunction: geometryFunction
        });
        this.createDrawEvents(ImgAnConstants.tagShapes.CIRCLE);
        this.map.addInteraction(this.drawInteraction);
    }

    /** @overview : method to create the draw point tool*/
    changeToolToDrawPoint() {
        this.drawInteraction = new ol.interaction.Draw({
            source: this.annotationSources[curLayer],
            type: /** @type {ol.geom.GeometryType} */ ('Point')
        });
        this.createDrawEvents(ImgAnConstants.tagShapes.POINT);
        this.map.addInteraction(this.drawInteraction);
    }

    /** @overview : method to create the draw polygon tool*/
    changeToolToDrawPolygon() {
        this.drawInteraction = new ol.interaction.Draw({
            source: this.annotationSources[curLayer],
            type: /** @type {ol.geom.GeometryType} */ ('Polygon')
        });
        this.createDrawEvents(ImgAnConstants.tagShapes.POLYGON);
        this.map.addInteraction(this.drawInteraction);
    }

    /** @overview : method to create the draw box tool*/
    changeToolToDrawBox() {
        let geometryFunction = function (coordinates, geometry) {
            if (!geometry) {
                geometry = new ol.geom.Polygon(null);
            }
            let start = coordinates[0];
            let end = coordinates[1];
            geometry.setCoordinates([
                [start, [start[0], end[1]], end, [end[0], start[1]], start]
            ]);
            return geometry;
        };
        this.drawInteraction = new ol.interaction.Draw({
            source: this.annotationSources[curLayer],
            type: /** @type {ol.geom.GeometryType} */ ('LineString'),
            maxPoints: 2,
            geometryFunction: geometryFunction
        });
        this.createDrawEvents(ImgAnConstants.tagShapes.BOX);
        this.map.addInteraction(this.drawInteraction);
    }

    /** @overview : method to create the draw square tool*/
    changeToolToDrawSquare() {
        let geometryFunction = ol.interaction.Draw.createRegularPolygon(4);
        this.drawInteraction = new ol.interaction.Draw({
            source: this.annotationSources[curLayer],
            type: /** @type {ol.geom.GeometryType} */ ('Circle'),
            geometryFunction: geometryFunction
        });
        this.createDrawEvents(ImgAnConstants.tagShapes.SQUARE);
        this.map.addInteraction(this.drawInteraction);
    }

    /**
     * @overview : method to create draw events
     * @param Shape the tag shape (circle, square, ect)
     */
    createDrawEvents(Shape) {
        this.drawInteraction.on('drawend', function (event) {
            tagId = tagId + 1;
            event.feature.setProperties({
                'id': tagId
            });
            let curImage = WAStorage.getImage(self.props.imgId);
            curImage.addAnnotation("vide", tagId, Shape);
            self.props.dispatch({type: ImgAnConstants.ActionsTypes.TAG_ADDED, tagId: tagId});//added tag action
        });
    }

    /**
     * @overview method to control map view
     * @param viewControl ZoomControle (center, zoom in or zoom out)
     */
    performViewControl(viewControl) {
        if (viewControl == ImgAnConstants.viewControls.VIEW_CENTER) {
            this.initMapView();
            this.map.setView(this.view);
        } else if (viewControl == ImgAnConstants.viewControls.ZOOM_IN) {
            $("#ZOOM_IN_BUTTON").click();
        } else if (viewControl == ImgAnConstants.viewControls.ZOOM_OUT) {
            $("#ZOOM_OUT_BUTTON").click();
        }
    }

    /** @overview : Method who save the Anotated image*/
    saveImgAn() {
        let format = new ol.format.GeoJSON();
        let data = format.writeFeatures(this.tagLayers[curLayer].getSource().getFeatures());
        let curImage = WAStorage.getImage(this.props.imgId);
        curImage.setFeatures(data);
    }

    /** @overview : Method who load the Anotated image*/
    loadImgAn() {
        let format = new ol.format.GeoJSON();
        let curImage = WAStorage.getImage(this.props.imgId);
        let features = curImage.getFeatures();
        if (features != undefined) {
            tagId = features.length; //Set current tagId counter
            this.annotationSources[curLayer].addFeatures(format.readFeatures(features));
        }
    }

    /** @overview : Method called just before the component unmount*/
    componentWillUnmount() {
        this.saveImgAn();
    }

    /** @overview : render the map */
    render() {
        let { imgId, imgUri, imgWidth, imgHeight, mapTool, currentView, viewControl, renderType } = this.props;
        if (this.map == null && renderType == ImgAnConstants.MapState.INIT_MAP && document.getElementById("map")) {
            this.initMapComponent();
        } else if (currentMapTool != this.props.mapTool && renderType == ImgAnConstants.MapState.CHANGE_TOOL && this.map != null) {
            currentMapTool = this.props.mapTool;
            this.changeTool(this.props.mapTool);
        } else if (this.props.viewControl != null && renderType == ImgAnConstants.MapState.VIEW_CONTROL && this.map != null) {
            this.performViewControl(this.props.viewControl);
        }
        return (null);
    }
}

export default connect(mapStateToProps)(ImgAnLibMapC);
