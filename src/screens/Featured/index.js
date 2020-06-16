/**
 *
 * Featured
 *
 */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectFeaturedState, makeSelectLoading, makeSelectError, makeSelectArticleData} from './selectors';
import { FeaturedAction } from './actions';
import { View, Text, Animated, Dimensions, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import theme from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import FeaturedBg from '../../assets/icons/featuredBg.svg';
import { COLLECTION_NAME, PAGES , dataFromAPI  } from '../../common/constant';
import Carousel from 'react-native-snap-carousel';
import StressIcon from '../../assets/icons/stress.svg';
import SleepIcon from '../../assets/icons/sleep.svg';
import AnxietyIcon from '../../assets/icons/anxiety.svg';
import FocusIcon from '../../assets/icons/focus.svg';
import ConfidenceIcon from '../../assets/icons/confidence.svg';
import DepressionIcon from '../../assets/icons/depression.svg';
import MotivationIcon from '../../assets/icons/motivation.svg';

import LottieView from "lottie-react-native";
import Loader from '../../assets/lottie/Loader.json';


const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;


export const Featured = props => {
  const { loading, FeaturedStart, articleList } = props;

  const [currentCard, setCurrentCard] = useState(0);
  useEffect(() => {
    FeaturedStart();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      title: 'Featured Resource',
      headerTintColor: theme.palette.white,
      headerStyle: {
        backgroundColor: theme.palette.primary.green.one,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerLeftIcon: <AntDesign name="arrowleft" size={23} color="white" />,
      headerTitleStyle: {  ...styles.headerTitle }
    })
  }, []);

  

  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  const goBack = () => {
    carouselRef.current.snapToPrev();
  };

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
    }
  }
  const renderItem = ({ item, index }) => {

    return (
      <View style={styles.featuredCard}>
        <Text style={styles.cardTitle}>
          {item.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={Math.floor((PAGE_WIDTH - 203) / 18) - 3}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
            <Text style={[styles.dividerText, {
              transform: [{
                translateX: -35
              }]
            }]}>FROM</Text>
          </View>
          <View style={styles.cardActionWrapper}>
            <View style={styles.cardIconWrapper}>
              {renderCollectionIcon(item.category)}
              <Text style={styles.collectionItemText}>{dataFromAPI.collections[item.category].name}</Text>
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => {
              props.navigation.navigate('webview', {
                url: item.url,
                title: item.title
              });
            }}>
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
     
        <>
          
          <FeaturedBg width={(502 * (PAGE_WIDTH * 0.00226))} height={(785 * (PAGE_WIDTH * 0.00226))} style={{ position: 'absolute', top: 16, }} />
        {!loading ? (
          <>
            <Text style={styles.cardPagination}>{currentCard + 1} of {articleList.length}</Text>
            <Carousel
              ref={carouselRef}
              sliderWidth={PAGE_WIDTH}
              sliderHeight={PAGE_HEIGHT}
              itemWidth={PAGE_WIDTH - 60}
              data={articleList}
              renderItem={renderItem}
              onSnapToItem={index => setCurrentCard(index)}
            />
          </>
        ) : (
            <View style={styles.loadingContainer}>
              <LottieView
                source={Loader}
                autoPlay
                style={{ width: 100, height: 100 }}
                resizeMode="cover"
              />
              </View>
        )}

        </>
    </View>    
  );
}
Featured.propTypes = {
  // FeaturedStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  // @dev you can pass props to makeSelectFuncs(props) like so.
  return createStructuredSelector({
    featured: makeSelectFeaturedState(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    articleList: makeSelectArticleData(),

});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    FeaturedStart: () => dispatch(FeaturedAction.start())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Featured);
    
    
const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: PAGE_WIDTH - 60,
    height: PAGE_WIDTH - 30,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: theme.palette.white,
  },
  headerTitle: {
    fontSize: theme.text.fontSize.two,
    letterSpacing: theme.text.letterSpacing.two,
    lineHeight: theme.text.lineHeight.two,
    fontFamily: theme.text.fontWeight.two,
    color: theme.palette.white,
    marginLeft: -16,
  },
  container: {
    flex: 1,
    backgroundColor: theme.palette.primary.green.one,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  featuredCard: {
    width: PAGE_WIDTH - 60,
    height: PAGE_WIDTH - 30,
    padding: 20,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: theme.palette.white,
    alignSelf: 'center',
    position: 'relative',
    marginTop: PAGE_WIDTH /2.25,
  },
  cardTitle: {
    fontSize: theme.text.fontSize.two,
    letterSpacing: theme.text.letterSpacing.two,
    lineHeight: theme.text.lineHeight.two,
    fontFamily: theme.text.fontWeight.two,
    color: theme.palette.neutral.six,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: theme.text.fontSize.five,
    letterSpacing: theme.text.letterSpacing.five,
    lineHeight: theme.text.lineHeight.five,
    fontFamily: theme.text.fontWeight.five,
    color: theme.palette.neutral.six,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: PAGE_WIDTH - 100,
  },
  dividerContainer: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',
    position: 'relative',
    bottom: 0,
    marginBottom: 14,
  },
  dividerLine: {
    height: 1,
    backgroundColor: theme.palette.neutral.one,
    width: PAGE_WIDTH - 100,
  },
  dividerText: {
    backgroundColor: theme.palette.neutral.one,
    fontSize: theme.text.fontSize.seven,
    letterSpacing: theme.text.letterSpacing.seven,
    lineHeight: theme.text.lineHeight.seven,
    fontFamily: theme.text.fontWeight.seven,
    color: theme.palette.white,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 12,
    position: 'absolute',
    top: 0,
    left: '50%',
  },
  cardActionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: PAGE_WIDTH - 100,
    bottom: 0,
  },
  cardIconWrapper: {
    flexDirection: 'row',
  },
  buttonContainer: {
    padding: 32,
    paddingTop: 9,
    paddingBottom: 9,
    borderRadius: 12,
    backgroundColor: 'rgba(0,150,145, 0.1)',
  },
  buttonText: {
    fontSize: theme.text.fontSize.six,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.six,
    fontFamily: theme.text.fontWeight.six,
    color: theme.palette.primary.green.one,
  },
  collectionItemText: {
    fontSize: theme.text.fontSize.five,
    letterSpacing: theme.text.letterSpacing.five,
    lineHeight: theme.text.lineHeight.five,
    fontFamily: theme.text.fontWeight.five,
    color: theme.palette.neutral.six,
    marginLeft: 8,
  },
  cardPagination: {
    position: 'absolute',
    fontSize: theme.text.fontSize.six,
    letterSpacing: theme.text.letterSpacing.six,
    lineHeight: theme.text.lineHeight.six,
    fontFamily: theme.text.fontWeight.six,
    color: theme.palette.white,
    bottom: 16,
  }
});