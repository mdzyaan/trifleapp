/**
 *
 * Onboarding
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
import { makeSelectOnboardingState, makeSelectLoading, makeSelectError} from './selectors';
import { OnboardingAction } from './actions';
import { View, Text, Animated, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import localStorageConstant from '../../common/localStorage';
import asyncStorage from '../../utils/asyncStorage';
import { useColorScheme } from 'react-native-appearance';
// import styles from './styles';
import {  userOnboardAction } from '../App/actions';
import O1 from '../../assets/img/01.svg';
import O2 from '../../assets/img/02.svg';
import O3 from '../../assets/img/03.svg';
import theme from '../../styles';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';

const PaginationContainer = styled.View`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-top: 20px;
  height: 10px;
  width: 10px;
  top: ${p => p.top}px;
  flex-direction: row;
`;

const PAGE_WIDTH = Dimensions.get('window').width;

export const Onboarding = props => {
  const { userOnboardActionSuccess } = props;



  const colorScheme = useColorScheme();

  const PAGES = [
    {
      title: 'Constant Support',
      description: "We are here to help you get rid of the stress you might have.",
      backgroundColor: theme.palette.primary.orange.three,
      width: 16,
      image: <O1 width={PAGE_WIDTH - 110} height={PAGE_WIDTH - 110}/>,
    },
    {
      title: 'Reduce Stress',
      description: "We are here to help you get rid of the stress you might have. ",
      backgroundColor: theme.palette.primary.green.three,
      width: 16,
      image: <O2 width={PAGE_WIDTH - 110} height={PAGE_WIDTH - 110}/>,
    },
    {
      title: 'Stay Energized',
      description: "We are here to help you get rid of the stress you might have.",
      backgroundColor: theme.palette.primary.orange.three,
      width: 16,
      image: <O3 width={PAGE_WIDTH - 110} height={PAGE_WIDTH - 110}/>
    }
  ]
  const [scroll, setScroll] = useState(new Animated.Value(0));
  const [onboardingView, setOnboardingView] = useState(1);

  const position = Animated.divide(scroll, PAGE_WIDTH);
  const backgroundColor = position.interpolate({
    inputRange: PAGES.map((_, i) => i),
    outputRange: PAGES.map(p => p.backgroundColor),
  });

  scroll.addListener(({ value }) => {
    if (value === 0) {
      setOnboardingView(1)
    } else if ((Math.round(PAGE_WIDTH) * 0.5) < Math.round(value) && Math.round(value)  < (Math.round(PAGE_WIDTH) * 1.4)) {
      setOnboardingView(2)
    } else if (Math.round(value) > (Math.round(PAGE_WIDTH) * 1.5)) {
      setOnboardingView(3)
    }
  })
  const changeUserOnboardingStatus = async () => {
    await asyncStorage.setItem(localStorageConstant.USER_ONBOARDED, true);
    userOnboardActionSuccess({ metadata: { onboarded: true } });
  }
  const triggerNext = () => {
    if (onboardingView !== 3) {
      scrollRef.getNode().scrollTo({ x: PAGE_WIDTH * onboardingView })
    } else {
      changeUserOnboardingStatus()
    }
  }
  let scrollRef;

  const paginationItem = StyleSheet.create({
    default: {
      backgroundColor: '#E1E1E2',
      height: 4,
      width: 4,
      margin: 2,
      borderRadius: 8,
    },
    active: {
      backgroundColor: theme.palette.primary.green.one ,
      width: 16,
    }
  })
  console.log("onboardingView", onboardingView)
  return (

    <View style={styles.container}>
      <Animated.View style={[styles.imgContainer, StyleSheet.absoluteFill, { backgroundColor, opacity: 1 }, {
        transform: [{ scale: 2 }, { translateY: -PAGE_WIDTH / 4 }]
      }]} />
       <TouchableOpacity 
          onPress={changeUserOnboardingStatus}
          style={styles.skipBtnWrapper}
        >
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>
      <Animated.ScrollView
        ref={ref => (scrollRef = ref)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scroll } } }],
        )}>

        {PAGES.map((page, i) => {
          return (
            <View key={i} style={styles.page}>
              <View style={[styles.frame]}>
                {page.image}
                {/* <Animated.Image
                  resizeMode="contain"
                  source={page.image}
                  style={styles.photo}
                /> */}
              </View>
              <View style={[styles.card]}>
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.desc}>{page.description}</Text>
              </View>
            </View>
          )
        })}
      </Animated.ScrollView>
      <PaginationContainer top={PAGE_WIDTH + 20}>
        <View active={onboardingView === 1} style={[paginationItem.default, onboardingView === 1 ? paginationItem.active : '',]}/>
        <View active={onboardingView === 2} style={[paginationItem.default, onboardingView === 2 ? paginationItem.active : '', ]}/>
        <View active={onboardingView === 3} style={[paginationItem.default, onboardingView === 3 ? paginationItem.active : '']}/>
      </PaginationContainer>  
      <View style={styles.button}>
        <TouchableOpacity 
          
          style={styles.buttonText}
          onPress={triggerNext}
        >
          <AntDesign name="arrowright" size={32} color="white" />
        </TouchableOpacity>          
      </View>
    </View>
  );
}
Onboarding.propTypes = {
  // OnboardingStart: PropTypes.func.isRequired,
};
export const mapStateToProps = (state,props) => {
  // @dev you can pass props to makeSelectFuncs(props) like so.
  return createStructuredSelector({
    onboarding: makeSelectOnboardingState(),
    loading: makeSelectLoading(),
    error: makeSelectError()
});
} 
export const mapDispatchToProps = (dispatch) => {
  return {
    OnboardingStart: ({ payload, metadata }) => dispatch(OnboardingAction.start({ payload, metadata })),
    userOnboardActionSuccess: ({ metadata }) => dispatch(userOnboardAction.success({  metadata }))

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
    
    
  
  






const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imgContainer: {
    width: PAGE_WIDTH,
    height: PAGE_WIDTH,
    borderRadius: PAGE_WIDTH,   
  },
  skipBtnWrapper: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 111111,
  },
  skipBtn: {
    fontSize: theme.text.fontSize.five,
    letterSpacing: theme.text.letterSpacing.five,
    lineHeight: theme.text.lineHeight.five,
    fontFamily: theme.text.fontWeight.four,
    color: theme.palette.neutral.six,
    
  },
  title: {
    fontSize: theme.text.fontSize.two,
    letterSpacing: theme.text.letterSpacing.two,
    lineHeight: theme.text.lineHeight.two,
    fontFamily: theme.text.fontWeight.two,
    color: theme.palette.neutral.six,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },

  desc: {
    color: theme.palette.neutral.six,
    backgroundColor: 'transparent',
    marginTop: 10,
    lineHeight: 25,
    textAlign: 'center',
    fontSize: theme.text.fontSize.five,
    letterSpacing: theme.text.letterSpacing.five,
    lineHeight: theme.text.lineHeight.five,
    fontFamily: theme.text.fontWeight.five,
  },
  page: {
    width: PAGE_WIDTH,
    paddingTop: 48,
  },
  card: {
    position: 'absolute',
    margin: 12,
    marginTop: 40,
    // left: 12,
    // bottom: 160,
    // right: 0,
    top: PAGE_WIDTH + 44,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 140,
  },
  frame: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    borderRadius: (PAGE_WIDTH - 100) / 2,
    minHeight:  200,
    maxHeight: 250,
    width: PAGE_WIDTH - 100,
    margin: 50,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: theme.palette.primary.green.one,
    position: 'absolute',
    margin: 0,
    marginTop: 60,
    // left: (PAGE_WIDTH / 2) - 100,
    borderRadius: 50,
    height: 56,
    width: 56,
    alignItems: 'center',
    top: PAGE_WIDTH + 148 + 44,
  },
  buttonText: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
    color: '#fff',
    fontSize: 14,
  },
  photo: {
    flex: 1,    
  }
});
