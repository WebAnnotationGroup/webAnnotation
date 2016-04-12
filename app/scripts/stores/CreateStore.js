/**
* @file : CreateStore.js
* @overview : Allow to create a store + reducer(s) + (middleware(s)) single context following REDUX architecture
* @author : Mathieu GUYOT et Loïc Favrelière (IUT Informatique La Rochelle)s
*/

import { createStore, combineReducers } from 'redux';
import * as reducers from "../reducers/ReducersList";

export default function(data){
  var reducer = combineReducers(reducers); //Combine all the reducers via ReducersList into one
  var store = createStore(reducer, data); //Create the store with the single reducer and the data

  return store;
}
