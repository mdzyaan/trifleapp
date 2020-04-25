// import * as React from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { SplashScreen } from 'expo';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import RootApp from './src';
// import useLinking from './navigation/useLinking';

// const Stack = createStackNavigator();

// export default function App(props) {
//   const [isLoadingComplete, setLoadingComplete] = React.useState(false);
//   const [initialNavigationState, setInitialNavigationState] = React.useState();
//   const containerRef = React.useRef();
//   const { getInitialState } = useLinking(containerRef);

//   // Load any resources or data that we need prior to rendering the app
//   React.useEffect(() => {
//     async function loadResourcesAndDataAsync() {
//       try {
//         SplashScreen.preventAutoHide();

//         // Load our initial navigation state
//         setInitialNavigationState(await getInitialState());

//         // Load fonts
//         await Font.loadAsync({
//           ...Ionicons.font,
//           'AvertaStd-Semibold': require('./src/assets/fonts/Poppins-SemiBold.ttf'),
//           'regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
//           'medium':  require('./src/assets/fonts/Poppins-Medium.ttf'),
//           'semiBold':  require('./src/assets/fonts/Poppins-SemiBold.ttf'),
//         });
//       } catch (e) {
//         // We might want to provide this error information to an error reporting service
//         console.warn(e);
//       } finally {
//         setLoadingComplete(true);
//         SplashScreen.hide();
//       }
//     }

//     loadResourcesAndDataAsync();
//   }, []);

//   if (!isLoadingComplete && !props.skipLoadingScreen) {
//     return null;
//   } else {
//     return (
//       // <View style={styles.container}>
//       //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//       //   <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
//       //     <Stack.Navigator>
//       //       <Stack.Screen name="Root" component={RootApp} />
//       //     </Stack.Navigator>
//       //   </NavigationContainer>
//       // </View>
//       <RootApp />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });


import React, { Component } from 'react';
import Root from './src';


export default class App extends Component {
  render() {
    return (
      <Root />
    );
  }
}