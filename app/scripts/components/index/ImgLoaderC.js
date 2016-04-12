/**
 * @file : ImgLoaderC.js
 * @overview : React component who display a component to load image
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import * as ViewActionCreators from '../../actions/ViewActionCreators';
import * as ImageActionCreators from '../../actions/ImageActionCreators';
import * as MapActionCreators from '../../actions/MapActionCreators';
import WAStorage from '../../storage/storage';

export default class ImgLoaderC extends React.Component {

    /** @overview : Constructor of the ImgLoaderC */
    constructor() {
        super();
        this.initStyles();
    }

    /**@overview : Fonction called when button "Charger une image" is push. Image data loaded is send to reducers*/
    handleSubmit(e) {
        e.preventDefault();
        let name = document.getElementById("IMAGE_NAME").value;
        let imageId = WAStorage.addImage(name, this.state.img_uri, this.state.width, this.state.height);
        this.props.dispatch(ImageActionCreators.sendCurrentImageData(imageId, this.state.img_uri, this.state.width, this.state.height));
        this.props.dispatch(ViewActionCreators.changeViewToImgAnEditTool());
    }

    /** @overview method which manage on load image event*/
    onClickLoadImage() {
        document.getElementById('files').click();
    }

    /** @overview : render the ImgLoaderC component */
    render() {
        return (
            <div className="card hoverable">
                <div className="card-image" style={{height:'100px', overflow: 'hidden'}}>
                    <img id="previewImage" src="./images/La-Rochelle.jpg"/>
                </div>
                <div className="card-content">
                    <h4 style={{color:"#e57373"}}>Créer une image annotée</h4>
                </div>
                <div className="card-action">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <input placeholder="Nom de l'image annotée" id="IMAGE_NAME" type="text" required/><br/>
                        <a className="waves-effect waves-light btn" onClick={this.onClickLoadImage.bind(this)}>Sélectionner
                            une image</a>
                        <input style={this.styleInputImage} className="waves-effect waves-light btn" id={"files"}
                               name={"files"} type={"file"} accept={"image/*;"} onChange={this.onLoadImage.bind(this)}
                               required/>
                        <input id={"LICHARGER"} style={{marginLeft:"10px"}}
                               className="waves-effect waves-light btn disabled" type={"submit"}
                               value={"Charger cette Image"}/>
                    </form>
                </div>
            </div>
        );
    }

    /** @overview : Fonction called when image is selected by the user. Load image*/
    onLoadImage(e) {
        e.preventDefault();
        let self = this;
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = function (upload) {
            var output = document.getElementById('previewImage'); //Get the preview image
            output.removeAttribute("style");
            output.src = URL.createObjectURL(file); //Send base64 to preview Image

            let i = new Image();
            i.onload = function () {
                if (document.getElementById("LICHARGER").parentNode.nodeName === "FORM") {
                    document.getElementById("LICHARGER").setAttribute("class", "waves-effect waves-light btn");
                } else {
                    document.getElementById("LICHARGER").parentNode.setAttribute("class", "waves-effect waves-light btn");
                }
                self.setState({
                    img_uri: i.src, //Save base64 into the component state
                    width: i.width,
                    height: i.height
                });
            };
            i.src = upload.target.result;

        };
        if (file != null) {
            reader.readAsDataURL(file);
        } else {
            let output = document.getElementById('previewImage'); //Get the preview image
            output.setAttribute("src", "./images/La-Rochelle.jpg");
            if (document.getElementById("LICHARGER").parentNode.nodeName === "form") {
                document.getElementById("LICHARGER").setAttribute("class", "waves-effect waves-light btn disabled");
            } else {
                document.getElementById("LICHARGER").parentNode.setAttribute("class", "waves-effect waves-light btn disabled");
            }
        }
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyles() {
        this.state = {
            img_uri: "",
            width: 0,
            height: 0
        };
        this.styleInputImage = {
            display: 'none'
        };
    }
}

export default connect()(ImgLoaderC);
