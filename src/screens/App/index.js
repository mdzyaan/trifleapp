/**
 *
 * App
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
import { makeSelectAppState, makeSelectLoading, makeSelectError, makeSelectUserOnboardingStatus} from './selectors';
import { AppAction, userOnboardAction } from './actions';
import { useColorScheme } from 'react-native-appearance';
import localStorageConstant from '../../common/localStorage';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import HomeScreen from '../Home';
import CollectionScreen from '../Collection';
import WebviewScreen from '../Webview';
// import YoutubeScreen from '../Youtube';

import OnboardingScreen from '../Onboarding';
import asyncStorage from '../../utils/asyncStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export const App = props => {
  const { userOnboardActionSuccess, userOnboardingStatus, loading } = props;
  const Stack = createStackNavigator();

  useEffect(() => {
    
    async function fetchUserOnboardingStatus() {
      try {
        await Font.loadAsync({
          'AvertaStd-Semibold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
          'regular':  require('../../assets/fonts/Poppins-Regular.ttf'),
          'medium': {
            uri: require('../../assets/fonts/Poppins-Medium.ttf'),
          },
          'semiBold': {
            uri: require('../../assets/fonts/Poppins-SemiBold.ttf'),
          },
        })
      } catch (error) {
        console.log("font",error)
      }
      const getUserOnboardingStatus = await asyncStorage.getItem(localStorageConstant.USER_ONBOARDED);
      if (getUserOnboardingStatus)  {
        userOnboardActionSuccess({ metadata: { onboarded: getUserOnboardingStatus } });
        console.log(true)

      } else {
        userOnboardActionSuccess({ metadata: { onboarded: false } });
        console.log(false)
      }

    }

    fetchUserOnboardingStatus()
  }, []);

  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      {!loading ? (
        <Stack.Navigator >
          {userOnboardingStatus ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen}  options={{
                headerShown: false
              }}/>
              <Stack.Screen name="Collection" component={CollectionScreen} options={{
                headerShown: false
              }}/>
              <Stack.Screen name="webview" component={WebviewScreen} options={{
                // headerShown: false
              }}/>
              {/* <Stack.Screen name="youtube" component={YoutubeScreen} options={{
                // headerShown: false
              }}/> */}
            </>
          ) : (
              <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{
              headerShown: false
            }}/>
            )}
        </Stack.Navigator>
      ) : <AppLoading />}
    </NavigationContainer>
    // <SafeAreaView style={[styles.container, themeContainerStyle]}>
    //   <StatusBar barStyle={themeStatusBarStyle} />
    //   <MainNavigation />
      
    // </SafeAreaView>
  );
}
App.propTypes = {
  // AppStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  return createStructuredSelector({
    app: makeSelectAppState(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    userOnboardingStatus: makeSelectUserOnboardingStatus()
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    AppStart: ({ payload, metadata }) => dispatch(AppAction.start({ payload, metadata })),
    userOnboardActionSuccess: ({ metadata }) => dispatch(userOnboardAction.success({  metadata }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
    
    
  
  

