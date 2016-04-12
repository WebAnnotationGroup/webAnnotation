/**
 * @file : ImgAnInputAnEditToolC.js
 * @overview : React component who display a text area to edit annotations text.
 * This component is called inside ImgAnEditTool component to modify annotation
 * This component is also called inside ImgAnViewTool component to see annotation
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import ImgAnConstants from '../../constants/ImgAnConstants';
import $ from 'jquery';
import WAStorage from '../../storage/storage';
import * as AnActionCreators from '../../actions/AnActionCreators';

/** Data coming from reducers that we want use in this component */
function mapStateToProps(state) {
    return {
        imgId: state._DATA.imgId,
        mapTool: state._MAP.mapTool,
        tagId: state._MAP.tagId
    }
}

export default class ImgAnInputAnEditToolC extends React.Component {

    /** @overview : Constructor of the ImgAnInputAnEditTool */
    constructor(props) {
        super();
        this.initStyles();
        this.editAnnotation = props.editAnnotation;
    }

    /** @overview : method which save new annotation text in WAStorage */
    saveAnnotation() {
        if(this.editAnnotation) {
            let AnText = $("#TXTAREA").val(); //Get the new text value (inside the textarea)
            let curImage = WAStorage.getImage(this.props.imgId);
            curImage.getAnnotation(this.props.tagId).setText(AnText); //Set the new text to the annotation
            this.props.dispatch(AnActionCreators.annotationSaved()); //Notify that annotation were saved with an action
        }
    }

    /** @overview : method which load annotation text from WAStorage*/
    loadAnnotation() {
        let curImage = WAStorage.getImage(this.props.imgId);
        let AnText = curImage.getAnnotation(this.props.tagId).getText(); //Get text of loaded annotation
        $("#TXTAREA").val(AnText); //Get the new textarea text
        this.props.dispatch(AnActionCreators.annotationLoaded()); //Notify that annotation were loaded with an action
    }

    /** @overview : method called just before the component update*/
    componentWillUpdate() { //Save after unselect the annotation
        if (this.props.mapTool == ImgAnConstants.Tools.ANNOTATE && this.props.tagId != -1 && this.editAnnotation) {
            this.saveAnnotation();
        }
    }

    /** @overview : method called just after the component update*/
    componentDidUpdate() { //Load annotation after selecting it
        if (this.props.mapTool == ImgAnConstants.Tools.ANNOTATE && this.props.tagId != -1) {
            this.loadAnnotation();
        }
    }

    /** @overview : render the ImgAnInputAnEditTool component */
    render() {
        let {imgId, mapTool, tagId} = this.props;
        if (this.props.mapTool == ImgAnConstants.Tools.ANNOTATE && tagId != -1 && this.editAnnotation) {
            return (
                <div className={this.inputClass}>
                    <textarea id="TXTAREA" className={this.textAreaClass} style={this.styleTextArea} rows={4}/>
                </div>
            );
        }
        if (this.props.mapTool == ImgAnConstants.Tools.ANNOTATE && tagId != -1 && !this.editAnnotation) {
            return (
                <div className={this.inputClass}>
                    <textarea id="TXTAREA" className={this.textAreaClass} style={this.styleTextArea} rows={4} disabled/>
                </div>
            );
        }
        else {
            return (null);
        }
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyles() {
        this.textAreaClass="materialize-textarea";
        this.inputClass="col s10 card-panel teal lighten-2 input-field";
        this.styleTextArea = {
            color: "white",
            borderBottom: "2px solid white"
        };
        this.styleTextAreaLabel = {
            color: "white"
        };
    }
}

export default connect(mapStateToProps)(ImgAnInputAnEditToolC);
