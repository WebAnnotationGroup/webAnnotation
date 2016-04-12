/**
 * @file : ImgAnEditToolC.js
 * @overview : React component who display the image annotator edit tool
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import ImgAnLibMapC from '../imgAnLib/ImgAnLibMapC';
import ImgAnToolBarEditToolC from './ImgAnToolBarEditToolC';
import ImgAnInputAnToolC from './ImgAnInputAnToolC';
import ImgAnViewerEditToolC from './ImgAnViewerEditToolC';
import * as MapActionCreators from '../../actions/MapActionCreators';

/** Data coming from reducers that we want use in this component */
function mapStateToProps(state) {
    return {
        imgUri: state._DATA.imgUri, //Image base64
        imgId: state._DATA.imgId
    }
}

export default class ImgAnEditToolC extends React.Component {

    /** @overview : Constructor of the ImgAnEditTool */
    constructor() {
        super();
        this.initStyles();
    }

    /** @overview : method called after the component monted (so the DOM tree is generated) */
    componentDidMount() {
        this.props.dispatch(MapActionCreators.initMap());
    }

    /** @overview : render the image edit tool component */
    render() {
        var { imgUri, imgId } = this.props;
        return (
            <div>
                <div>
                    <div className="col s12" style={this.colToolBarStyle}>
                        <ImgAnToolBarEditToolC />
                    </div>
                </div>
                <div className="row" style={{marginBottom: "0px",marginLeft: "10px"}}>
                    <div className="col s8 card grey lighten-8" style={this.mapContainerStyle}>
                        <div id={"map"} className={"map"} style={this.mapStyle}></div>
                        <ImgAnLibMapC />
                    </div>
                    <div className="col s4">
                        <ImgAnViewerEditToolC imageId={this.props.imgId} />
                    </div>
                </div>
                <div className="row" style={{marginLeft: "10px"}}>
                    <ImgAnInputAnToolC editAnnotation={true} />
                </div>
            </div>
        );
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyles() {
        this.colToolBarStyle = {
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
            paddingTop: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingBottom: "0px"
        };
    }
}

export default connect(mapStateToProps)(ImgAnEditToolC);
