/**
 * @file : ImgAnViewToolC.js
 * @overview : React component who display the image annotator view tool
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import ImgAnLibMapC from '../imgAnLib/ImgAnLibMapC';
import ImgAnToolBarViewToolC from './ImgAnToolBarViewToolC';
import * as MapActionCreators from '../../actions/MapActionCreators';
import ImgAnInputAnToolC from './ImgAnInputAnToolC';

export default class ImgAnViewToolC extends React.Component {

    /** @overview : Constructor of the ImgAnViewToolC */
    constructor() {
        super();
        this.initStyles();
    }

    /** @overview : method called after the component monted (so the DOM tree is generated) */
    componentDidMount() {
        this.props.dispatch(MapActionCreators.initMap());
    }

    /** @overview : render the ImgAnViewToolC component */
    render() {
        return (
            <div>
                <div className="row" style={{marginBottom: "0px"}}>
                    <div className="col s12" style={this.colStyle}>
                        <ImgAnToolBarViewToolC />
                    </div>
                </div>
                <div className="row" style={{marginBottom: "0px"}}>
                    <div className="col s12 card-panel grey lighten-8" style={this.mapContainerStyle}>
                        <div id={"map"} className={"map"} style={this.mapStyle}></div>
                        <ImgAnLibMapC />
                    </div>
                </div>
                <div className="row" style={{marginLeft: "10px"}}>
                    <ImgAnInputAnToolC editAnnotation={false} />
                </div>
            </div>
        );
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyles() {
        this.colStyle = {
            marginTop: "10px",
            paddingTop: "0px",
            paddingLeft: "3px",
            paddingRight: "3px",
            paddingBottom: "0px",
            height: "60px",
            color: "transparent"
        };
        this.mapStyle = {
            width: "100%",
            height: "500px"
        };
        this.mapContainerStyle = {
            marginTop: "10px",
            marginLeft: "10px",
            paddingTop: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingBottom: "0px"
        };
    }

}

export default connect()(ImgAnViewToolC);
