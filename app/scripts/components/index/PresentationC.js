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
                    <img id="previewImage" style={{width: '50%'}} src="./images/wagroup.png"/>
                </div>
                <div className="card-content">
                  <p style={{color:"#e57373", fontSize:"30px"}}>Web Annotation utilise OpenLayers3 et Materialize.</p>
                    <p style={{color:"#e57373"}}>Outil/librairie développé par des étudiants de l'IUT de La Rochelle dans le cadre du projet WebAnnotation proposé
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
                            <td style={{color:"#e57373"}}>Chef du projet et développeur Web Annotation</td>
                        </tr>
                        <tr>
                            <td style={{color:"#e57373"}}>Loïc Favrelière</td>
                            <td style={{color:"#e57373"}}>développeur Web Annotation</td>
                        </tr>
                        <tr>
                            <td style={{color:"#e57373"}}>Cyrille Suire</td>
                            <td style={{color:"#e57373"}}>Initiateur du projet Web Annotation</td>
                        </tr>
                        <tr>
                            <td style={{color:"#e57373"}}>Axel Jean-Caurant</td>
                            <td style={{color:"#e57373"}}>Initiateur du projet Web Annotation</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default connect()(PresentationC);
