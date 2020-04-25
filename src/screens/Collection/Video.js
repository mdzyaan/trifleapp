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
import { Text, View, Animated, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import theme from '../../styles';
import { Ionicons } from '@expo/vector-icons';
import asyncStorage from '../../utils/asyncStorage';
import Constants from 'expo-constants';


const videosData = [{
    "title": "How to make stress your friend How to make stress your friend How to make stress your friend",
    "thumbnail": "",
    "author": "Kelly McGonigal",
    "publisher": "Ted talks",
    "yturl": ''
}, {
        "title": "How to make stress your friend",
        "thumbnail": "",
        "author": "Kelly McGonigal",
        "publisher": "Ted talks",
        "yturl": ''
    }, {
        "title": "How to make stress your friend",
        "thumbnail": "",
        "author": "Kelly McGonigal",
        "publisher": "Ted talks",
        "yturl": ''
    }]

const PAGE_WIDTH = Dimensions.get('window').width;


export default (props) => {
    console.log("props video", props)
    return (
        <View style={{ flex: 1, backgroundColor: theme.palette.primary.orange.three }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.container}
                nestedScrollEnabled={true}
            >

                {videosData.map((video, videoId) => (
                    <TouchableOpacity key={videoId} style={styles.videoCard} onPress={() => {
                        props.navigation.navigate('youtube', {
                            url: video.url,
                            title: video.title
                        });
                    }}>
                        {/* <View style={styles.videoImage}></View> */}
                        <View style={styles.videoDetail}>
                            <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                            <Text style={styles.videoInfo}>BY {video.publisher} - {video.author}</Text>
                            {/* <Text style={styles.aritcleAuthor}>BY {video.author}</Text> */}
                        </View>
                        <TouchableOpacity style={styles.videoPlayBtnWrapper}>
                            <Ionicons style={styles.playBtn} name="ios-play" size={23} color={theme.palette.primary.green.two} />
                        </TouchableOpacity>
                    </TouchableOpacity>
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
        marginBottom: 21.5,
        flex: 1,
        backgroundColor: theme.palette.primary.orange.three,
    },
    videoCard: {
        borderRadius: 20,
        backgroundColor: theme.palette.primary.green.one + '80', 
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        marginBottom: 10,
        height: 178,
        alignItems: 'flex-end'
    },
    videoPlayBtnWrapper: {
        height: 40,
        width: 40,
        backgroundColor: theme.palette.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playBtn: {
        marginLeft: 4
    },
    articleImage: {
        height: 90,
        width: 90,
        backgroundColor: theme.palette.primary.green.three,
        borderRadius: 10,
    },
    videoDetail: {
        marginRight: 16,
        width: PAGE_WIDTH - 120,
    },
    videoTitle: {
        fontSize: theme.text.fontSize.five,
        letterSpacing: theme.text.letterSpacing.five,
        lineHeight: theme.text.lineHeight.five,
        fontFamily: theme.text.fontWeight.four,
        color: theme.palette.white,
        // height: 44,
    },
    videoInfo: {
        fontSize: theme.text.fontSize.seven,
        letterSpacing: theme.text.letterSpacing.seven,
        lineHeight: theme.text.lineHeight.seven,
        fontFamily: theme.text.fontWeight.seven,
        color: theme.palette.white,
        marginTop: 6,
        marginBottom: 6,
        textTransform: 'uppercase'
    },
    aritcleAuthor: {
        fontSize: theme.text.fontSize.seven,
        letterSpacing: theme.text.letterSpacing.seven,
        lineHeight: theme.text.lineHeight.seven,
        fontFamily: theme.text.fontWeight.seven,
        color: theme.palette.primary.orange.two,
        textTransform: 'uppercase'
    }
});