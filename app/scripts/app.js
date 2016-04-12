/**
 * @file : app.js
 * @overview : Contains the first render point of the app
 * @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)
 */

import React from 'react';
import { render } from 'react-dom';
import MainC from './components/MainC';
import store from './stores/Store';

/**
 * Allow the render of the app
 */
let renderApplication = () => {
    render(
      <MainC store={store}/>,
      document.getElementById("ImageAnotorWrapper")
    );
};

document.addEventListener("DOMContentLoaded", renderApplication(), false);
