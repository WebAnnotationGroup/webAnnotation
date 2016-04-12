/**
 * @file : HeaderC.js
 * @overview : React component who display a basic app header
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { connect } from 'react-redux';
import * as ViewActionCreators from '../../actions/ViewActionCreators';

export default class HeaderC extends React.Component {

    /** @overview : Constructor of the HeaderC */
    constructor() {
        super();
    }

    /** @overview : Method called when button "Annoter une image" is push */
    onClickIndex() {
        this.props.dispatch(ViewActionCreators.changeViewToIndex());
    }

    /** @overview : render the HeaderC component */
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo" onClick={this.onClickIndex.bind(this)}>Web Annotation</a>
                </div>
            </nav>
        );
    }
}

export default connect()(HeaderC);
