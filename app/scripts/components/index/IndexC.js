/**
 * @file : IndexC.js
 * @overview : React component which display the index of the App
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import PresentationC from './PresentationC';
import ImgAnLoaderC from './ImgAnLoaderC';
import ImgLoaderC from './ImgLoaderC';

class IndexC extends React.Component {

    /** @overview : Constructor of the IndexC */
    constructor() {
        super();
    }

    /** @overview : render the IndexC component */
    render() {
        return (
            <div className="row">
                <div className="col s6">
                    <ImgLoaderC />
                    <PresentationC />
                </div>
                <div className="col s6">
                    <ImgAnLoaderC />
                </div>
            </div>
        );
    }
}

export default connect()(IndexC);
