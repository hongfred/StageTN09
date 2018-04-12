import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/main.js';
import TestStore from './componentTest/testStore.js'

import { createStore } from 'redux';
import todoApp from './reduxStore/reducers/reducers';
import fetchRed from './reduxStore/reducers/reducerFetch';
import configureStore from './reduxStore/configureStore';
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './reduxStore/actions/actions'

let store = configureStore()

// Log the initial state
//alert(JSON.stringify(store.getState()))

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
//const unsubscribe = store.subscribe(() =>
// alert("look: " + JSON.stringify(store.getState()))
//)

// Dispatch some actions
/*
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))
*/
// Stop listening to state updates
//unsubscribe()

ReactDOM.render(
	<App store = {store}/>,
	document.getElementById('app')
);