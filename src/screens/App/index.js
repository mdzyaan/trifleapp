/**
 *
 * App
 *
 */
import React, { 
  useState,
  useEffect,
  useMemo
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAppState, makeSelectLoading, makeSelectError, makeSelectUserOnboardingStatus, makeSelectAppDataRecommended, makeSelectAppDataFeatured } from './selectors';
import { AppAction, userOnboardAction } from './actions';
import localStorageConstant from '../../common/localStorage';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import HomeScreen from '../Home';
import CollectionScreen from '../Collection';
import WebviewScreen from '../Webview';
import YoutubeScreen from '../Youtube';
import FeaturedScreen from '../Featured';

import OnboardingScreen from '../Onboarding';
import asyncStorage from '../../utils/asyncStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { PAGES } from '../../common/constant';
import NoInternet from '../../components/NoInternet/index';
import NetInfo from '@react-native-community/netinfo';
import { View } from 'react-native';

export const App = props => {
  const { userOnboardActionSuccess, userOnboardingStatus, loading, AppStart, recommendedSectionData, featuredSectionData } = props;
  const Stack = createStackNavigator();

  const [internetConnected, setInternetConnected] = useState(true);

  useEffect(() => {
    const unsubscribeNetworkStatus = NetInfo.addEventListener(state => {
      setInternetConnected(state.isConnected);
    });

    // return unsubscribeNetworkStatus();
  }, [internetConnected]);
  

  const appData = {
    recommendedSectionData,
    featuredSectionData,
  }
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
      AppStart();
      const getUserOnboardingStatus = await asyncStorage.getItem(localStorageConstant.USER_ONBOARDED);
      if (getUserOnboardingStatus)  {
        userOnboardActionSuccess({ metadata: { onboarded: getUserOnboardingStatus } });

      } else {
        userOnboardActionSuccess({ metadata: { onboarded: false } });
      }

    }

    fetchUserOnboardingStatus()
  }, []);


  const renderApp = useMemo(() => {

    return internetConnected ? (
      <>
        <Stack.Screen name={PAGES.HOME} options={{
          headerShown: false
        }}>
          {stackProps => <HomeScreen {...stackProps} appData={appData} />}
        </Stack.Screen>
        <Stack.Screen name={PAGES.COLLECTION} component={CollectionScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name={PAGES.WEBVIEW} component={WebviewScreen} />
        <Stack.Screen name={PAGES.YOUTUBE} component={YoutubeScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name={PAGES.FEATURED} component={FeaturedScreen} />
      </>
    ) : (
        <Stack.Screen name={PAGES.NO_INTERNET} options={{
          headerShown: false
        }}>
          {stackProps => (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <NoInternet />
            </View>
          )}
        </Stack.Screen>
      )
  }, [internetConnected])
  return (
    <NavigationContainer>
      {!loading ? (
        <Stack.Navigator 
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          {userOnboardingStatus ? renderApp
           : (
              <Stack.Screen name={PAGES.ONBOARDING} component={OnboardingScreen} options={{
              headerShown: false
            }}/>
            )}
        </Stack.Navigator>
      ) : <AppLoading />}
    </NavigationContainer>
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
    userOnboardingStatus: makeSelectUserOnboardingStatus(),
    recommendedSectionData: makeSelectAppDataRecommended(), 
    featuredSectionData: makeSelectAppDataFeatured(),
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    AppStart: () => dispatch(AppAction.start()),
    userOnboardActionSuccess: ({ metadata }) => dispatch(userOnboardAction.success({  metadata }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
    
    
  
  

