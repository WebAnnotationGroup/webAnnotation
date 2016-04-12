/**
 * @file : ImgAnToolBarEditToolC.js
 * @overview : React component who display the image annotor ToolBar to select tool to use the lib
 * This component is called inside ImgAnEditTool component
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import * as MapActionCreators from '../../actions/MapActionCreators';

export default class ImgAnToolBarEditToolC extends React.Component {

    /** @overview : Constructor of the ImgAnToolBarEditToolC */
    constructor() {
        super();
        this.initStyles();
    }

    /** @overview : method which create an action to use the select tool */
    seeAnnotationClick() {
        this.unSelect();
        document.getElementById("TLANNOTATE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToAnnotate());
    }

    /** @overview : method which create an action to use the delete tool */
    deleteclick() {
        this.unSelect();
        document.getElementById("TLDELETE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToDelete());
    }

    /** @overview : method which create an action to use the move tool */
    moveclick() {
        this.unSelect();
        document.getElementById("TLMOVE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToMove());
    }

    /** @overview : method which create an action to use the modify tool */
    modifyclick() {
        this.unSelect();
        document.getElementById("TLMODIFY").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToModify());
    }

    /** @overview : method which create an action to use the draw circle tool */
    drawCclick() {
        this.unSelect();
        document.getElementById("TLCIRCLE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToDrawCircle());
    }

    /** @overview : method which create an action to use the draw square tool */
    drawSclick() {
        this.unSelect();
        document.getElementById("TLSQUARE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToDrawSquare());
    }

    /** @overview : method which create an action to use the draw box tool */
    drawBclick() {
        this.unSelect();
        document.getElementById("TLBOX").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToDrawBox());
    }

    /** @overview : method which create an action to use the draw point tool */
    drawPclick() {
        this.unSelect();
        document.getElementById("TLPOINT").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToDrawPoint());
    }

    /** @overview : method which create an action to use the draw polygon tool */
    drawPLclick() {
        this.unSelect();
        document.getElementById("TLPOLYGON").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToDrawPolygon());
    }

    /** @overview : method which create an action to perform a centering sight */
    VCCenterClick() {
        this.props.dispatch(MapActionCreators.setViewCenter());
    }

    /** @overview : method which create an action to perform a zoom out*/
    VCZoomOutClick() {
        this.props.dispatch(MapActionCreators.performViewZoomOut());
    }

    /** @overview : method which create an action to perform a zoom in*/
    VCZoomInClick() {
        this.props.dispatch(MapActionCreators.performViewZoomIn());
    }

    /** @overview : method which set default styles of all buttons of the bar*/
    unSelect() {
        document.getElementById("TLANNOTATE").setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLMOVE"    ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLSQUARE"  ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLPOINT"   ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLPOLYGON" ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLBOX"     ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLCIRCLE"  ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLMODIFY"  ).setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLDELETE"  ).setAttribute("class", this.noSelectedButtonStyle);
    }

    /** @overview : render the ImgAnToolBarEditToolC component */
    render() {
        return (
            <div>
                <div title="Annoter un marquage"
                     id={"TLANNOTATE"} className={this.noSelectedButtonStyle}
                     onClick={this.seeAnnotationClick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_select.svg" />
                </div>

                <div title="Déplacer l'image"
                     id={"TLMOVE"} className={this.selectedButtonStyle}
                     onClick={this.moveclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_move.svg" />
                </div>

                <div title="Dessiner un carré"
                     id={"TLSQUARE"} className={this.noSelectedButtonStyle}
                     onClick={this.drawSclick.bind(this)} style={this.styleButToolBarJump}>
                    <img style={this.styleIcon} src="./images/icon_square.svg" />
                </div>

                <div title="Dessiner un rectangle"
                     id={"TLBOX"} className={this.noSelectedButtonStyle}
                     onClick={this.drawBclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_box.svg" />
                </div>

                <div title="Dessiner un cercle"
                     id={"TLCIRCLE"} className={this.noSelectedButtonStyle}
                     onClick={this.drawCclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_circle.svg" />
                </div>

                <div title="Dessiner un point"
                     id={"TLPOINT"} className={this.noSelectedButtonStyle}
                     onClick={this.drawPclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_point.svg" />
                </div>

                <div title="Dessiner un polygone"
                     id={"TLPOLYGON"} className={this.noSelectedButtonStyle}
                     onClick={this.drawPLclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_polygon.svg"/>
                </div>

                <div title="Supprimer une forme"
                     id={"TLDELETE"} className={this.noSelectedButtonStyle}
                     onClick={this.deleteclick.bind(this)} style={this.styleButToolBarJump}>
                     <img style={this.styleIcon} src="./images/icon_delete.svg" />
                </div>

                <div title="Modifier une forme"
                     id={"TLMODIFY"} className={this.noSelectedButtonStyle}
                     onClick={this.modifyclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_modify.svg" />
                </div>

                <div title="Zommer"
                     id={"VCZOOMIN"} className={this.noSelectedButtonStyle}
                     onClick={this.VCZoomInClick.bind(this)} style={this.styleButToolBarJump}>
                    <img style={this.styleIcon} src="./images/icon_zoom_in.svg" />
                </div>

                <div title="Restaurer la vue"
                     id={"VCCENTER"} className={this.noSelectedButtonStyle}
                     onClick={this.VCCenterClick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_center.svg" />
                </div>

                <div title="Dézommer"
                     id={"VCZOOMOUT"} className={this.noSelectedButtonStyle}
                     onClick={this.VCZoomOutClick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_zoom_out.svg" />
                </div>

            </div>
        );
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyles() {
        this.noSelectedButtonStyle = "col s12 card-panel teal lighten-8 waves-effect waves-light";
        this.selectedButtonStyle = "col s12 card-panel red lighten-2 waves-effect waves-light";
        this.styleIcon = {
            marginTop:"4px",
            verticalAlign:"middle"
        };
        this.styleButToolBar = {
            marginLeft: "2px",
            height: "40px",
            width: "60px",
            cursor: "pointer",
            paddingTop: "5px",
            paddingLeft: "19px"
        };
        this.styleButToolBarJump = {
            marginLeft: "30px",
            height: "40px",
            width: "60px",
            cursor: "pointer",
            paddingTop: "5px",
            paddingLeft: "19px"
        };
    }
}

export default connect()(ImgAnToolBarEditToolC);
