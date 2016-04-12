/**
 * @file : ImgAnViewerEditToolC.js
 * @overview : React component who display the image annotor annotation controle panel to inspect annotations of an image
 * This component is called inside ImgAnViewTool component
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import WAStorage from '../../storage/storage';
import ImgAnConstants from '../../constants/ImgAnConstants';
import $ from 'jquery';

var self;

/** Data coming from reducers that we want use in this component */
function mapStateToProps(state) {
    return {
        tagId: state._MAP.tagId,
        tagState: state._MAP.tagState,
        mapTool: state._MAP.mapTool,
        anState: state._AN.anState,
        forceMapRefresh: state._MAP.forceMapRefresh
    }
}

export default class ImgAnViewerEditToolC extends React.Component {

    /** @overview : Constructor of the ImgAnViewerEditToolC */
    constructor(props) {
        super(props);
        this.initStyles();
        this.editAnnotation = props.editAnnotation;
        this.imageId = props.imageId;
        this.state = {annotations: WAStorage.getImage(this.imageId).getAnnotations()};
        self = this;
    }

    /** @overview : render submethods to perform list render  */
    renderList() {
        if (this.state.annotations.length === 0) {
            return (
                <p>Auncune annotation</p>
            );
        } else {
            let index = -1;
            return (
                <table style={this.tableauStyle} className="striped">
                    <thead style={this.theadStyle}>
                    <tr style={this.trStyle}>
                        <th style={this.th1Style}>Tag</th>
                        <th style={this.th2Style}>Annotations</th>
                    </tr>
                    </thead>
                    <tbody style={this.tbodyStyle}>
                    {this.state.annotations.map(function (result) {
                        index += 1;
                        let annotation = self.state.annotations[index].getText();
                        annotation = self.anTextProcessing(annotation);
                        let tag = self.state.annotations[index].getTagShape();
                        let tagIconPath = self.getImageTagShapePath(tag);
                        return <tr key={index} style={self.trStyle}>
                            <td style={self.td1Style}>
                                <div>
                                    <img src={tagIconPath} style={self.imageStyle} className={"iconImage"}/>
                                </div>
                            </td>
                            <td style={self.td2Style}>{annotation}</td>
                        </tr>;
                    })}
                    </tbody>
                </table>
            );
        }
    }

    /**
     * @overview : method to format huge annotation texts
     * @param anText The Annotation text to process
     * @returns {string} the processing anText
     */
    anTextProcessing(anText) {
        if (anText.length > 30) {
            anText = anText.substring(0, 29) + "[...]";
        }
        return anText;
    }

    /**
     * @overview : method to get correct icon path for all the tag shapes
     * @param tagShape the tagShape
     * @returns {string} the path of the icon
     */
    getImageTagShapePath(tagShape) {
        let tagIconPath = "./images/";
        switch (tagShape) {
            case ImgAnConstants.tagShapes.SQUARE:
                tagIconPath += "icon_square.svg";
                break;
            case ImgAnConstants.tagShapes.BOX:
                tagIconPath += "icon_box.svg";
                break;
            case ImgAnConstants.tagShapes.CIRCLE:
                tagIconPath += "icon_circle.svg";
                break;
            case ImgAnConstants.tagShapes.POINT:
                tagIconPath += "icon_point.svg";
                break;
            case ImgAnConstants.tagShapes.POLYGON:
                tagIconPath += "icon_polygon.svg";
                break;
        }
        return tagIconPath;
    }

    /** @overview : render the ImgAnViewerEditToolC component */
    render() {
        let {tagId, mapTool, tagState, anState, forceMapRefresh} = this.props;
        return (
            <div className="card">
                <div className="card-action">
                    {this.renderList()}
                </div>
            </div>
        );
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyles() {
        this.tableauStyle = {
            display: "table",
            width: "100%"
        };
        this.tbodyStyle = {
            overflow: "auto",
            height: "405px",
            float: "left",
            width: "100%"
        };
        this.theadStyle = {
            width: "100%",
            float: "left"
        };
        this.trStyle = {
            width: "100%",
            display: "table",
            textAlign: "left"
        };
        this.th1Style = {
            width: "10%",
            color: "#e57373"
        };
        this.th2Style = {
            width: "90%",
            color: "#e57373"
        };
        this.td1Style = {
            width: "10%"
        };
        this.td2Style = {
            width: "90%"
        };
        this.imageStyle = {
            backgroundColor: "#e57373",
            borderRadius: "10px",
            padding: '5px 5px 5px 5px'
        }
    }
}

export default connect(mapStateToProps)(ImgAnViewerEditToolC);
