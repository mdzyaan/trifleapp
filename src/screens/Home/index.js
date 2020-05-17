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
import { makeSelectHomeState, makeSelectLoading, makeSelectError, makeSelectRecommendedData} from './selectors';
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
import CovidIcon from '../../assets/icons/covid.svg';
import SunIcon from '../../assets/icons/sun.svg';
import MoonIcon from '../../assets/icons/moon.svg';
import FeaturedIllustrationIcon from '../../assets/icons/featuredIllustration.svg';
import FooterIllustrationIcon from '../../assets/icons/homeFooter.svg';
import ArticleCard from '../../components/ArticleCard/index';
import { COLLECTION_NAME, PAGES, dataFromAPI } from '../../common/constant';


import LottieView from "lottie-react-native";
import Loader from '../../assets/lottie/Loader.json';


const PAGE_WIDTH = Dimensions.get('window').width;
const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const Home = props => {
  const { appData, recommendedData, loading, HomeStart } = props;
  const { recommendedSectionData, featuredSectionData } = appData;
  useEffect(() => {
    HomeStart();
  }, []);

  const clearStorage = async () => {
    console.log("clear pressed")
    await asyncStorage.clear((e) => console.log(e))
  }

  const greetingMessage = () => {
    var today = new Date()
    var curHr = today.getHours()
    if (curHr >= 6 && curHr < 12) {
      return {
        text: 'Good Morning',
        icon: <SunIcon width={48} height={48} style={{ opacity: 0.1 }} />
      };
    } else if (curHr >= 12 && curHr < 16) {
      return {
        text: 'Good Afternoon',
        icon: <SunIcon width={48} height={48} style={{ opacity: 0.1 }} />
      };
    } else if (curHr >= 16 && curHr < 19) {
      return {
        text: 'Good Evening',
        icon: <MoonIcon width={48} height={48} style={{ opacity: 0.1 }} />
      };
    } else {
      return {
        text: 'Hello',
        icon: <MoonIcon width={48} height={48} style={{ opacity: 0.1 }} />
      }
    }
  }
  

  const renderCollectionIcon = (name) => {
    if (name === COLLECTION_NAME.STRESS) {
      return <StressIcon width={24} height={24} />
    } else if (name === COLLECTION_NAME.CONFIDENCE) {
      return <ConfidenceIcon width={24} height={24} />
    } else if (name === COLLECTION_NAME.FOCUS) {
      return <FocusIcon width={24} height={24} />
    } else if (name === COLLECTION_NAME.DEPRESSION) {
      return <DepressionIcon width={24} height={24} />
    } else if (name === COLLECTION_NAME.SLEEP) {
      return <SleepIcon width={24} height={24} />
    } else if (name === COLLECTION_NAME.ANXIETY) {
      return <AnxietyIcon width={24} height={24} />
    } else if (name === COLLECTION_NAME.MOTIVATION) {
      return <MotivationIcon width={24} height={24} />
    } else {
      return <CovidIcon width={24} height={24} />
    }
  }

  return (
    <View style={styles.appContainer}>

      <ScrollView style={styles.homeContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>{greetingMessage().text},</Text>
            <TouchableOpacity onPress={clearStorage}><Text style={styles.headerSubTitle}>We wish you have a great day</Text></TouchableOpacity>
          </View>
          {greetingMessage().icon}
        </View>

        <View style={styles.featuredContainer}>
          <View style={styles.featureLeft}>
            <Text style={styles.feauturedTitle}>Featured Resource</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
              props.navigation.navigate(PAGES.FEATURED, {
                
              });
            }}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
          <FeaturedIllustrationIcon width={118} height={118} />
        </View>

        <Text style={styles.subTitle}>What's your struggle?</Text>
        <View style={styles.collectionScrollContainer}>
          <ScrollView
            horizontal={true}
            style={styles.collectionContainer}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.collectionItemsContainer}>
              {Object.keys(COLLECTION_NAME).map((collectionName, collectionId) => {
                let collection = dataFromAPI.collections[COLLECTION_NAME[collectionName]];
                return (
                  <TouchableOpacity onPress={() => {
                    props.navigation.navigate(PAGES.COLLECTION, {
                      collection
                    });
                  }} key={collectionId} style={styles.collectionItemContainer}>
                    {renderCollectionIcon(COLLECTION_NAME[collectionName])}
                    <Text style={styles.collectionItemText}>{COLLECTION_NAME[collectionName]}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>
        
        {recommendedData  && (
          <>
            <Text style={styles.subTitle}>Recommended</Text>
            
            <View style={styles.cardHeightContainer}>

              {loading ? (
                <View style={styles.loadingContainer}>
                  <LottieView
                    source={Loader}
                    autoPlay
                    style={{ width: 100, height: 100 }}
                    resizeMode="cover"
                  />
                </View>
              ) : recommendedData.map((article, articleId) => (
                <ArticleCard
                  key={articleId}
                  title={article.title}
                  publisher={article.publisher}
                  url={article.url}
                  author={article.author}
                  readDuration={article.readDuration}
                  thumbnail={article.thumbnail}
                  onPress={async () => {
                    props.navigation.navigate(PAGES.WEBVIEW, {
                      url: article.url,
                      title: article.title
                    });
                  }}
                />
              ))}
            </View> 
          </>
        )}
        

        <View style={styles.footerContainer}>
          <FooterIllustrationIcon style={styles.footerImg} width={PAGE_WIDTH} height={PAGE_WIDTH * 0.6611} />
          <Text style={styles.footerTopTitle}>keep an eye for more content & features</Text>
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
    error: makeSelectError(),
    recommendedData: makeSelectRecommendedData(),
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    HomeStart: () => dispatch(HomeAction.start())
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
    padding: 16,
    paddingBottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: theme.text.fontSize.four,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.one,
    fontFamily: theme.text.fontWeight.one,
    color: theme.palette.neutral.six,
    margin: 0,
    padding: 0,
  },
  headerSubTitle: {
    fontSize: theme.text.fontSize.five,
    letterSpacing: theme.text.letterSpacing.five,
    lineHeight: theme.text.lineHeight.five,
    fontFamily: theme.text.fontWeight.five,
    color: theme.palette.neutral.six,
    margin: 0,
    padding: 0,
  },
  featuredContainer: {
    margin: 0,
    marginLeft: 16,
    marginRight: 16,
    padding: 20,
    marginTop: 30,
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
    width: 605,
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
  loadingContainer: {
    width: PAGE_WIDTH - 32,
    flex: 1,
    alignItems: 'center',
  },
  cardHeightContainer: {
    paddingLeft: 16,
    paddingRight: 16,
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
