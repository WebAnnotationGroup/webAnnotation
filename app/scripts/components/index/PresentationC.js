/**
 * @file : PresentationC.js
 * @overview : React component who display infos about project group
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';

export default class PresentationC extends React.Component {

    /** @overview : Constructor of the PresentationC */
    constructor() {
        super();
    }

    /** @overview : render the PresentationC component */
    render() {
        return (
            <div className="card hoverable">
                <div className="card-image">
                    <img id="previewImage" src="./images/WA&CO.png"/>
                </div>
                <div className="card-content">
                  <p style={{color:"#e57373", fontSize:"30px"}}>Web Annotation utilise OpenLayers3.</p>
                    <p style={{color:"#e57373"}}>Outil/librairie développé dans le cadre du projet WebAnnotation proposé
                        par le L3i (Laboratoire Informatique, Image et Interaction).</p>
                </div>
                <div className="card-action">
                    <table className="bordered striped">
                        <thead>
                        <tr>
                            <th data-field="name" style={{color:"#e57373"}}>Nom</th>
                            <th style={{color:"#e57373"}}>Rôle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td style={{color:"#e57373"}}>Mathieu Guyot</td>
                            <td style={{color:"#e57373"}}>Chef de projet, dev Web Annotation</td>
                        </tr>
                        <tr>
                            <td style={{color:"#e57373"}}>Loïc Favrelière</td>
                            <td style={{color:"#e57373"}}>Responsable d'édition, dev Web Annotation</td>
                        </tr>
                        <tr>
                            <td style={{color:"#e57373"}}>Guillaume Russo</td>
                            <td style={{color:"#e57373"}}>Responsable des tests, dev Web Cofishing</td>
                        </tr>
                        <tr>
                            <td style={{color:"#e57373"}}>Baptiste Garcin</td>
                            <td style={{color:"#e57373"}}>Responsable de communication, dev Cofishing</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default connect()(PresentationC);
