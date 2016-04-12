/**
 * @file :MainC.js
 * @overview : Main component of the App
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { Provider, connect } from 'react-redux';
import ImgAnEditToolC from './imgAnTools/ImgAnEditToolC';
import ImgAnViewToolC from './imgAnTools/ImgAnViewToolC';
import IndexC from './index/IndexC';
import HeaderC from './index/HeaderC';

/** Data coming from reducers that we want use in this component */
function mapStateToProps(state) {
    return {
        currentView: state._UI.view
    }
}

class MainC extends React.Component {

    /** @overview : Constructor of the MainC */
    constructor() {
        super();
    }

    /** @overview : render the MainC component */
    render() {
        var { currentView } = this.props;
        let curComponent;
        if (this.props.currentView === "imgAnEditTool") {
            curComponent = <ImgAnEditToolC />;
        } else if (this.props.currentView === "imgAnViewTool") {
            curComponent = <ImgAnViewToolC />;
        } else {
            curComponent = <IndexC />;
        }
        return (
            <Provider store={ this.props.store }>
                <div>
                    <HeaderC />
                    <div>
                        {curComponent}
                    </div>
                </div>
            </Provider>
        );
    }
}


export default connect(mapStateToProps)(MainC);
