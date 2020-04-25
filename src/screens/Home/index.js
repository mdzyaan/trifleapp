/**
 *
 * Home
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
import { makeSelectHomeState, makeSelectLoading, makeSelectError} from './selectors';
import { HomeAction } from './actions';
import { Text, View, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import theme from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import asyncStorage from '../../utils/asyncStorage';
import Constants from 'expo-constants';
import StressIcon from '../../assets/icons/stress.svg';
import SleepIcon from '../../assets/icons/sleep.svg';
import AnxietyIcon from '../../assets/icons/anxiety.svg';
import FocusIcon from '../../assets/icons/focus.svg';
import ConfidenceIcon from '../../assets/icons/confidence.svg';
import DepressionIcon from '../../assets/icons/depression.svg';
import MotivationIcon from '../../assets/icons/motivation.svg';
import FeaturedIllustrationIcon from '../../assets/icons/featuredIllustration.svg';
import FooterIllustrationIcon from '../../assets/icons/homeFooter.svg';

const collectionsData = [{ name: 'Stress', description: 'Improve yourself & get better', icon: <StressIcon width={24} height={24} /> }, { name: 'Confidence', description: 'Improve yourself & get better', icon: <ConfidenceIcon width={24} height={24} /> }, { name: 'Sleep', description: 'Improve yourself & get better', icon: <SleepIcon width={24} height={24} /> }, { name: 'Anxiety', description: 'Improve yourself & get better', icon: <AnxietyIcon width={24} height={24} /> }, { name: 'Focus', description: 'Improve yourself & get better', icon: <FocusIcon width={24} height={24} /> }, { name: 'Depression', description: 'Improve yourself & get better', icon: <DepressionIcon width={24} height={24} /> }, { name: 'Motivation', description: 'Improve yourself & get better', icon: <MotivationIcon width={24} height={24}/>}]


const PAGE_WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const Home = props => {


  const clearStorage = async () => {
    console.log("clear pressed")
    await asyncStorage.clear((e) => console.log(e))
  }




  return (
    <View style={styles.appContainer}>
      <ScrollView style={styles.homeContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Discover</Text>
          <TouchableOpacity onPress={clearStorage}><Text>Clear</Text></TouchableOpacity>
        </View>
        <View style={styles.featuredContainer}>
          <View style={styles.featureLeft}>
            <Text style={styles.feauturedTitle}>Featured Resource</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>
          <FeaturedIllustrationIcon width={118} height={118} />
        </View>
        <Text style={styles.subTitle}>Collections</Text>
        <View style={styles.collectionScrollContainer}>
          <ScrollView
            horizontal={true}
            style={styles.collectionContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.collectionItemsContainer}>
              {collectionsData.map((collection, collectionId) => (
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate('Collection', {
                    collection
                  });
                }} key={collectionId} style={styles.collectionItemContainer}>
                  {collection.icon}
                  <Text style={styles.collectionItemText}>{collection.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <Text style={styles.subTitle}>Recommended</Text>
        <View style={styles.cardHeightContainer}>
          <ScrollView
            horizontal={true}
            style={styles.cardScrollContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardsContainer}>
              <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Anxiety Problems</Text>
                <Text style={styles.cardDuration}>20 min</Text>
                <TouchableOpacity
                  style={styles.cardButton}
                >
                  <AntDesign name="arrowright" size={23} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Anxiety Problems</Text>
                <Text style={styles.cardDuration}>20 min</Text>
                <TouchableOpacity
                  style={styles.cardButton}
                >
                  <AntDesign name="arrowright" size={23} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>Anxiety Problems</Text>
                <Text style={styles.cardDuration}>20 min</Text>
                <TouchableOpacity
                  style={styles.cardButton}
                >
                  <AntDesign name="arrowright" size={23} color="white" />
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
        <View style={styles.footerContainer}>
          <FooterIllustrationIcon style={styles.footerImg} width={PAGE_WIDTH} height={PAGE_WIDTH * 0.6611} />
          <Text style={styles.footerTopTitle}>More Content & Feature</Text>
          <View style={styles.footerBottomTitleContainer}>
            <Text style={[styles.footerBoldTitle, styles.footerTitleGreen]}>Coming</Text>
            <Text style={[styles.footerBoldTitle, styles.footerTitleOrange]}>Soon</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
Home.propTypes = {
  // HomeStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  return createStructuredSelector({
    home: makeSelectHomeState(),
    loading: makeSelectLoading(),
    error: makeSelectError()
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    HomeStart: ({ payload, metadata }) => dispatch(HomeAction.start({ payload, metadata }))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  appContainer: {
    
    backgroundColor: theme.palette.primary.orange.three,
    flex: 1,
  },
  homeContainer: {
    marginTop: STATUS_BAR_HEIGHT,
    flex: 1,
  },
  headerContainer: {
    padding: 16
  },
  headerTitle: {
    fontSize: theme.text.fontSize.one,
    letterSpacing: theme.text.letterSpacing.one,
    lineHeight: theme.text.lineHeight.one,
    fontFamily: theme.text.fontWeight.one,
    color: theme.palette.neutral.six,
    margin: 0,
    padding: 0,
  },
  featuredContainer: {
    margin: 0,
    marginLeft: 16,
    marginRight: 16,
    padding: 20,
    marginTop: 20,
    backgroundColor: theme.palette.primary.green.one,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feauturedTitle: {
    fontSize: theme.text.fontSize.three,
    letterSpacing: theme.text.letterSpacing.three,
    lineHeight: theme.text.lineHeight.three,
    fontFamily: theme.text.fontWeight.three,
    color: theme.palette.white,
    maxWidth: 120,
    marginBottom: 16
  },
  buttonContainer: {
    padding: 32,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 12,
    backgroundColor: 'rgba(252,252,252, 0.2)',
    alignSelf: 'flex-start'
  },
  buttonText: {
    fontSize: theme.text.fontSize.six,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.six,
    fontFamily: theme.text.fontWeight.six,
    color: theme.palette.white,
  },
  subTitle: {
    fontSize: theme.text.fontSize.four,
    letterSpacing: theme.text.letterSpacing.four,
    lineHeight: theme.text.lineHeight.four,
    fontFamily: theme.text.fontWeight.four,
    color: theme.palette.neutral.six,
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  collectionScrollContainer: {
    height: 116
  },
  collectionContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  collectionItemsContainer: {
    width: 580,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  collectionItemContainer: {
    paddingTop: 14, 
    paddingBottom: 14, 
    paddingLeft: 20, 
    paddingRight: 20, 
    marginRight: 12,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: theme.palette.white,
    height: 52,
    flexDirection: 'row',
  },
  collectionItemText: {
    fontSize: theme.text.fontSize.five,
    letterSpacing: theme.text.letterSpacing.five,
    lineHeight: theme.text.lineHeight.five,
    fontFamily: theme.text.fontWeight.five,
    color: theme.palette.neutral.six,
    marginLeft: 8,
  },
  cardHeightContainer: {
    height: 160,
  },
  cardScrollContainer: {
    paddingLeft: 16,
  },
  cardsContainer: {
    width: 829,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    borderRadius: 20,
    paddingTop: 30,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16, 
    marginRight: 16, 
    backgroundColor: theme.palette.white,
    width: 255
  },
  cardTitle: {
    fontSize: theme.text.fontSize.four,
    letterSpacing: theme.text.letterSpacing.four,
    lineHeight: theme.text.lineHeight.four,
    fontFamily: theme.text.fontWeight.four,
    color: theme.palette.neutral.six,
    marginTop: 0,
    marginBottom: 6,
    marginLeft: 0,
    marginRight: 0,
  },
  cardDuration: {
    fontSize: theme.text.fontSize.six,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.six,
    fontFamily: theme.text.fontWeight.six,
    color: theme.palette.neutral.six,
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  cardButton: {
    backgroundColor: theme.palette.primary.green.one,
    margin: 0,
    borderRadius: 50,
    height: 32,
    width: 32,
    alignItems: 'center',
    paddingTop: 4.5
  },
  footerContainer: {
    backgroundColor: theme.palette.white,
    marginTop: 30,
    paddingTop: 20,
    alignItems: 'center',
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 0.6611,
  },
  footerImg: {
    bottom:0,
    position: 'absolute',
  },
  footerTopTitle: {
    fontSize: theme.text.fontSize.six,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.six,
    fontFamily: theme.text.fontWeight.six,
    color: theme.palette.neutral.six,
    marginBottom: 10,
  },
  footerBottomTitleContainer: {
    flexDirection: 'row',
  },
  footerBoldTitle: {
    fontSize: theme.text.fontSize.one,
    letterSpacing: theme.text.letterSpacing.one,
    lineHeight: theme.text.lineHeight.one,
    fontFamily: theme.text.fontWeight.one,
  },
  footerTitleGreen: {
    color: theme.palette.primary.green.one,
    marginRight: 10
  },
  footerTitleOrange: {
    color: theme.palette.primary.orange.one
  },
})
