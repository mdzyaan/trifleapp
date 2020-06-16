import React, {
    useState,
    useEffect,
    useContext,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCollectionState, makeSelectLoading, makeSelectError } from './selectors';
import { CollectionAction } from './actions';
import { View, StyleSheet, ScrollView, Dimensions, BackHandler  } from 'react-native'
import theme from '../../styles'
import VideoCard from '../../components/VideoCard'
import { PAGES } from '../../common/constant';
import LottieView from "lottie-react-native";
import Loader from '../../assets/lottie/Loader.json';
const PAGE_WIDTH = Dimensions.get('window').width;


export default (props) => {
    const {  videoData } = props;
    const { loading, data} = videoData;


    useEffect(() => {
        const backAction = () => {
            props.navigation.goBack(null);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: theme.palette.primary.orange.three }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.container}
                nestedScrollEnabled={true}
            >

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <LottieView
                            source={Loader}
                            autoPlay
                            style={{ width: 100, height: 100 }}
                            resizeMode="cover"
                        />
                    </View>
                    ) : data.map((video, videoId) => (
                        <VideoCard
                            key={videoId}
                            title={video.title}
                            publisher={video.publisher}
                            isLast={(videoId + 1) === data.length}
                            author={video.author}
                            thumbnail={video.thumbnail}
                            onPress={async () => {
                                // props.navigation.navigate(PAGES.YOUTUBE, {
                                //     url: video.yturl,
                                //     title: video.title
                                // });
                                props.navigation.navigate('webview', {
                                    url: video.yturl,
                                    title: video.title
                                });
                            }}
                        />
                    ))}




            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 21.5,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 21.5,
        flex: 1,
        backgroundColor: theme.palette.primary.orange.three,
    },
    loadingContainer: {
        width: PAGE_WIDTH - 32,
        flex: 1,
        alignItems: 'center',
    }
});