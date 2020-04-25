/**
 *
 * Webview
 *
 */
import React, { 
  useState, 
  useEffect, 
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectWebviewState, makeSelectLoading, makeSelectError} from './selectors';
import { WebviewAction } from './actions';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import theme from '../../styles';
import { AntDesign } from '@expo/vector-icons';

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;

export const Webview = props => {
  console.log("web view props", props)
  const { url , title } = props.route.params;
  useEffect(() => {
    props.navigation.setOptions({
      title, 
      headerTintColor: theme.palette.white, 
      headerStyle: {
        backgroundColor: theme.palette.primary.green.two,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerLeftIcon:  <AntDesign name="arrowleft" size={23} color="white" />,
      headerTitleStyle: {  width: Dimensions.get('window').width * 0.8, ...styles.headerTitle} })
  },[]);

  return (
    <View style={{ flex: 1, width: PAGE_WIDTH, height: PAGE_HEIGHT  }}>
      <WebView source={{ uri: url }} />
    </View>
  );
}
Webview.propTypes = {
  // WebviewStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  // @dev you can pass props to makeSelectFuncs(props) like so.
  return createStructuredSelector({
    webview: makeSelectWebviewState(),
    loading: makeSelectLoading(),
    error: makeSelectError()
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    WebviewStart: ({ payload, metadata }) => dispatch(WebviewAction.start({ payload, metadata }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Webview);
    
    
  
  
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: theme.text.fontSize.two,
    letterSpacing: theme.text.letterSpacing.two,
    lineHeight: theme.text.lineHeight.two,
    fontFamily: theme.text.fontWeight.two,
    color: theme.palette.white,
    marginLeft: -16,
  },
})

