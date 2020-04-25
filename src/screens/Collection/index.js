/**
 *
 * Collection
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
import { makeSelectCollectionState, makeSelectLoading, makeSelectError} from './selectors';
import { CollectionAction } from './actions';
import { Text, View, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import theme from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import asyncStorage from '../../utils/asyncStorage';
import Constants from 'expo-constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ArtIcleTab from './Article';
import VideoTab from './Video';
import CollectionIllustration from '../../assets/icons/collectionIllustration.svg';
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const HEADER_MIN_HEIGHT = 56 + STATUS_BAR_HEIGHT;
const HEADER_MAX_HEIGHT = 240 ;

export const Collection = props => {
  console.log("collec", props)
  const Tab = createMaterialTopTabNavigator();

  const [scrollYAnimatedValue, setScrollYAnimatedValue] = useState(new Animated.Value(0));
  let array = [];
  const collectionName = props.route.params.collection.name;
  const collectionDescription = props.route.params.collection.description;


  // useEffect(() => {

  //   props.navigation.navigate('Videos', { collectionName, collectionDescription });

  //   props.navigation.navigate('Articles', { collectionName, collectionDescription });
  // },[]);


  const headerHeight = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

  const headerOpacity = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)/2, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });

  const headerTitlePositionX = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [0 , 35],
      extrapolate: 'clamp'
    });

  const headerTitlePositionY = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
      outputRange: [0, -HEADER_MIN_HEIGHT + STATUS_BAR_HEIGHT + 6],
      extrapolate: 'clamp'
    });


  
  return (
    <View style={styles.appContainer}>
      <ScrollView 
        style={styles.collectionContainer} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }]
        )}
      >
        <View style={[{
          height: PAGE_HEIGHT - HEADER_MIN_HEIGHT,
          flex: 1
        }]}>
          <Tab.Navigator tabBarOptions={{
            style: {
              backgroundColor: theme.palette.primary.orange.three,
              overflow: "hidden",

            },
            labelStyle: {
              fontSize: theme.text.fontSize.five,
              letterSpacing: theme.text.letterSpacing.five,
              lineHeight: theme.text.lineHeight.five,
              fontFamily: theme.text.fontWeight.five,
              textTransform: 'lowercase'
            },
            activeTintColor: theme.palette.primary.orange.one,
            inactiveTintColor: theme.palette.neutral.six,
            tabStyle: { width: 100, paddingLeft: 16, margin: 0, alignItems: 'flex-start' },
            indicatorStyle: { backgroundColor: theme.palette.primary.orange.one, width: 38, marginLeft: 20 }
          }}>
            <Tab.Screen name="Articles" >
              {tabprops => <ArtIcleTab {...tabprops} data={{ asdf: collectionName, collectionDescription }} />}
            </Tab.Screen>
            <Tab.Screen name="Videos" >
              {tabprops => <VideoTab {...tabprops} data={{ asdf: collectionName, collectionDescription }} />}
            </Tab.Screen>
          </Tab.Navigator>
         </View>
      </ScrollView>
     
      <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight}]}>
        <TouchableOpacity
          style={styles.backBtnWrapper}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <AntDesign name="arrowleft" size={23} color="white" />
        </TouchableOpacity>
        <Animated.Text style={[styles.headerTitle, {transform: [
          { translateY: headerTitlePositionY,},
          { translateX: headerTitlePositionX,}

        ]}]}>{collectionName}</Animated.Text>
        <CollectionIllustration style={styles.headerIllustration} width={222} height={169} />
        <Animated.Text style={[styles.headerSubtitle, { opacity: headerOpacity}]}>{collectionDescription}</Animated.Text>
      </Animated.View>
    </View>
  );
}
Collection.propTypes = {
  // CollectionStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  // @dev you can pass props to makeSelectFuncs(props) like so.
  return createStructuredSelector({
    collection: makeSelectCollectionState(),
    loading: makeSelectLoading(),
    error: makeSelectError()
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    CollectionStart: ({ payload, metadata }) => dispatch(CollectionAction.start({ payload, metadata }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Collection);
    
    
  
  

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: theme.palette.primary.orange.three,
    flex: 1,
  },
  collectionContainer: {
    // marginTop: STATUS_BAR_HEIGHT * 3,
    flex: 1,
  },
  backBtnWrapper: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerIllustration: {
    position: 'absolute', 
    left: 190,
    top: 111,
  },
  headerTitle: {
    fontSize: theme.text.fontSize.two,
    letterSpacing: theme.text.letterSpacing.two,
    lineHeight: theme.text.lineHeight.two,
    fontFamily: theme.text.fontWeight.two,
    color: theme.palette.white,
    marginTop: 8,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: theme.text.fontSize.six,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.six,
    fontFamily: theme.text.fontWeight.six,
    color: theme.palette.white,
    maxWidth: 170
  },  

  animatedHeaderContainer: {
    position: 'absolute',
    top: (Platform.OS == 'ios') ? 20 : 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingTop: STATUS_BAR_HEIGHT,
    backgroundColor: theme.palette.primary.green.two,
    overflow: 'hidden',
  },
 
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: 'black',
    fontSize: 16
  }
});