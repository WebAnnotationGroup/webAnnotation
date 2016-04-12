/**
 * @file : ImgAnLoaderC.js
 * @overview : React component who display a component to load Annoted image from WAStorage or exteral file
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import WAStorage from '../../storage/storage';
import * as ViewActionCreators from '../../actions/ViewActionCreators';
import * as ImageActionCreators from '../../actions/ImageActionCreators';

var self;

export default class ImgAnLoaderC extends React.Component {

    /** @overview : Constructor of the ImgAnLoaderC */
    constructor() {
        super();
        this.initStyle();
        this.state = {search: "", images: WAStorage.getImages()};
        self = this;
    }

    /** @overview : render submethods to perform list render  */
    renderList() {
        if (this.state.images.length === 0) {
            return (
                <p>Pas d'image enregistrée</p>
            );
        } else {
            let index = -1;
            return (
                <div>
                    <input id="search" type="text" className="validate" placeholder="Rechercher une image" onChange={self.peformSearch}/>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th data-field="name" style={{color:"#e57373"}}>Nom</th>
                            <th style={{color:"#e57373"}}>Voir</th>
                            <th style={{color:"#e57373"}}>Editer</th>
                            <th style={{color:"#e57373"}}>Supprimer</th>
                            <th style={{color:"#e57373"}}>Télécharger</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.images.map(function (result) {
                            index += 1;
                            let imageName = self.state.images[index].getName();
                            imageName = self.imageNameProcessing(imageName);
                            let imageId = self.state.images[index].getId();
                            let searchMatch = imageName.toUpperCase().match(self.state.search.toUpperCase());
                            if (searchMatch != null) {
                                return <tr key={index}>
                                    <td>{imageName}</td>
                                    <td>
                                        <button title="Visionner l'image annotée"
                                                className="waves-effect waves-light btn" value={index}
                                                onClick={self.clickView}>
                                            <img src="./images/icon_eye.svg" style={self.styleIcon} />
                                        </button>
                                    </td>
                                    <td>
                                        <button title="Éditer l'image annotée"
                                                className="waves-effect waves-light btn" value={index}
                                                onClick={self.clickEdit}>
                                            <img src="./images/icon_modify.svg" style={self.styleIcon} />
                                        </button>
                                    </td>
                                    <td>
                                        <button title="Supprimer l'image annotée"
                                                className="waves-effect waves-light btn" value={index}
                                                onClick={self.clickDelete}>
                                            <img src="./images/icon_delete.svg" style={self.styleIcon} />
                                        </button>
                                    </td>
                                    <td><a id={"Download"+imageId}/>
                                        <button title="Télécharger l'image annotée"
                                                className="waves-effect waves-light btn" value={index}
                                                onClick={self.clickDownload}>
                                            <img src="./images/icon_download.svg" style={self.styleIcon} />
                                        </button>
                                    </td>
                                </tr>;
                            } else {
                                return null;
                            }
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    /**
     * @overview : method to format huge image name
     * @param anText The image name
     * @returns {string} the processing image name
     */
    imageNameProcessing(imageName) {
        if (imageName.length > 20) {
            imageName = imageName.substring(0, 19) + "[...]";
        }
        return imageName;
    }

    /** @overview method which manage on change search bar event */
    peformSearch(event) {
        let search = event.currentTarget.value;
        self.setState({search: search});
    }

    /** @overview method which manage on click view event */
    clickView(e) {
        let image = self.state.images[e.currentTarget.value];
        self.props.dispatch(ImageActionCreators.sendCurrentImageData(image.id, image.base64, image.width, image.height));
        self.props.dispatch(ViewActionCreators.changeViewToImgAnViewTool());
    }

    /** @overview method which manage on click download event */
    //TODO : adapter cette méthode pour les gros fichiers (actuellement big data marche que sur firefox)
    clickDownload(e) {
        let image = self.state.images[e.currentTarget.value];
        let imageName = image.getName();
        let imageId = image.getId();
        let json = "data:text/json;charset=utf-8," + encodeURIComponent(WAStorage.getJSONImAnData(image.id));
        let dlAnchorElem = document.getElementById("Download" + imageId);
        dlAnchorElem.setAttribute("href", json);
        dlAnchorElem.setAttribute("download", imageName + ".json");
        dlAnchorElem.click();
    }

    /** @overview method which manage on click edit event */
    clickEdit(e) {
        let image = self.state.images[e.currentTarget.value];
        self.props.dispatch(ImageActionCreators.sendCurrentImageData(image.id, image.base64, image.width, image.height));
        self.props.dispatch(ViewActionCreators.changeViewToImgAnEditTool());
    }

    /** @overview method which manage on click delete event */
    clickDelete(e) {
        let imageId = self.state.images[e.currentTarget.value].getId();
        WAStorage.rmImage(imageId);
        self.setState({images: WAStorage.getImages()});
    }

    /** @overview method which manage on click load image event */
    onClickLoadImage() {
        document.getElementById('files2').click();
    }

    /** @overview : render the ImgAnLoaderC component */
    render() {
        return (
            <div className="card hoverable">
                <div className="card-image" style={{height:'100px', overflow: 'hidden'}}>
                    <img id="previewImageLoad" src="./images/La-Rochelle-2.jpg"/>
                </div>
                <div className="card-content">
                    <h4 style={{color:"#e57373"}}>Charger une image annotée</h4>
                </div>
                <div className="card-action">
                    {this.renderList()}
                    <a style={this.styleLoadButton} className="waves-effect waves-light btn"
                       onClick={this.onClickLoadImage.bind(this)}>Charger une
                        image Annotée</a>
                    <input style={this.styleInputImage} id={"files2"} name={"files"} type={"file"}
                           onChange={this.onLoadImage.bind(this)}/>
                </div>
            </div>
        );
    }

    /**
     * @overview method which load json file and send it to WAStorage
     * @param e file input event event
     */
    //TODO : secure the file type
    onLoadImage(e) {
        e.preventDefault();
        let self = this;
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = function (upload) {
            let json = upload.target.result;
            WAStorage.loadJSONAnImage(json);
            self.setState({search: ""});
        };
        if (file != null) {
            reader.readAsText(file);
        }
    }

    /** @overview : initialize css styles for html tags of this component */
    initStyle() {
        this.styleInputImage = {
            display: 'none'
        };
        this.styleLoadButton = {
            marginTop: '10px'
        };
        this.styleIcon = {
            paddingTop: "6px"
        };
    }
}

export default connect()(ImgAnLoaderC);
