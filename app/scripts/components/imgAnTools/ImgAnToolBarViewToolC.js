/**
 * @file : ImgAnToolBarViewToolC.js
 * @overview : React component who display the image annotor ToolBar to select tool to use the lib
 * This component is called inside ImgAnViewTool component
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import * as MapActionCreators from '../../actions/MapActionCreators';

export default class ImgAnToolBarViewToolC extends React.Component {

    /** @overview : Constructor of the ImgAnToolBarViewToolC */
    constructor() {
        super();
        this.initStyles();
    }

    /** @overview : method which create an action to use the select tool */
    seeAnnotationClick() {
        this.unSelect();
        document.getElementById("TLSEE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToAnnotate());
    }

    /** @overview : method which create an action to use the move tool */
    moveclick() {
        this.unSelect();
        document.getElementById("TLMOVE").setAttribute("class", this.selectedButtonStyle);
        this.props.dispatch(MapActionCreators.changeToolToMove());
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
        document.getElementById("TLSEE").setAttribute("class", this.noSelectedButtonStyle);
        document.getElementById("TLMOVE").setAttribute("class", this.noSelectedButtonStyle);
    }

    /** @overview : render the ImgAnToolBarViewToolC component */
    render() {
        return (
            <div>
                <div title="Voir les annotations"
                     id={"TLSEE"} className={this.noSelectedButtonStyle}
                     onClick={this.seeAnnotationClick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_eye.svg" />
                </div>

                <div title="Déplacer l'image"
                     id={"TLMOVE"} className={this.selectedButtonStyle}
                     onClick={this.moveclick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_move.svg" className={"iconImage"}/>
                </div>

                <div title="Zommer"
                     id={"VCZOOMIN"} className={this.noSelectedButtonStyle}
                     onClick={this.VCZoomInClick.bind(this)} style={this.styleButToolBarJump}>
                    <img style={this.styleIcon} src="./images/icon_zoom_in.svg" className={"iconImage"}/>
                </div>

                <div title="Restaurer la vue"
                     id={"VCCENTER"} className={this.noSelectedButtonStyle}
                     onClick={this.VCCenterClick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_center.svg" className={"iconImage"}/>
                </div>

                <div title="Dézommer"
                     id={"VCZOOMOUT"} className={this.noSelectedButtonStyle}
                     onClick={this.VCZoomOutClick.bind(this)} style={this.styleButToolBar}>
                    <img style={this.styleIcon} src="./images/icon_zoom_out.svg" className={"iconImage"}/>
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

export default connect()(ImgAnToolBarViewToolC);
