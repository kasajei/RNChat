import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import AppNavigation from './AppNavigation'

// here is our redux-aware smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props
  const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
  );
  const addListener = createReduxBoundAddListener("root");
  const navigation = ReactNavigation.addNavigationHelpers({
    dispatch,
    state: nav,
    addListener,
  })
  return <AppNavigation navigation={navigation}/>
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)