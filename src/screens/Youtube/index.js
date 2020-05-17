/**
 *
 * Youtube
 *
 */
import React, { 
  useState, 
  useEffect, 
  useContext,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectYoutubeState, makeSelectLoading, makeSelectError} from './selectors';
import { YoutubeAction } from './actions';
import * as ScreenOrientation from 'expo-screen-orientation';
import { View, BackHandler, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import changeOrientation from '../../utils/changeOrientation';



export const Youtube = props => {
  useEffect(() => {
    changeOrientation.LANDSCAPE_LEFT();
  })
  const { url } = props.route.params;


  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => {
          changeOrientation.PORTRAIT_UP()
          props.navigation.goBack(null);
        }}
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ uri: url }} />
    </View>
  );
}
Youtube.propTypes = {
  // YoutubeStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  // @dev you can pass props to makeSelectFuncs(props) like so.
  return createStructuredSelector({
    youtube: makeSelectYoutubeState(),
    loading: makeSelectLoading(),
    error: makeSelectError()
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    YoutubeStart: ({ payload, metadata }) => dispatch(YoutubeAction.start({ payload, metadata }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Youtube);

