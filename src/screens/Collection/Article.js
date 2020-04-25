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
import { AntDesign } from '@expo/vector-icons';
import asyncStorage from '../../utils/asyncStorage';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';

const PAGE_WIDTH = Dimensions.get('window').width;

let articleData = [{
    title: "How to be better at stress",
    readDuration: 30,
    thumbnail: "",
    author: "Tara Parker-Pope",
    publisher: "The New York Times",
    url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
}, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "How to be better at stress",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    }, {
        title: "6 simple yoga stretches for daily workouts",
        readDuration: 30,
        thumbnail: "",
        author: "Tara Parker-Pope",
        publisher: "The New York Times",
        url : "https://medium.com/the-mission/how-to-reduce-stress-91f74e22c878"
    },]

export default (props) => {
    console.log("props article", props.route.params)

    return (
        <View style={{ flex: 1, backgroundColor: theme.palette.primary.orange.three }}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.container}
            nestedScrollEnabled={true}
        >

                {articleData.map((article, articleId) => (
                    <TouchableOpacity key={articleId} style={styles.aritcleCard} onPress={async () => {
                        props.navigation.navigate('webview', {
                            url: article.url,
                            title: article.title 
                        });
                        // await WebBrowser.openBrowserAsync(article.url, { toolbarColor: theme.palette.primary.green.one, enableBarCollapsing: false, showTitle : true});
                    }}>
                        <View style={styles.articleImage}></View>
                        <View style={styles.articleDetail}>
                            <Text style={styles.articleTitle} numberOfLines={2}>{article.title}</Text>
                            <Text style={styles.articleInfo}>{article.publisher} - {article.readDuration} MIN READ</Text>
                            <Text style={styles.aritcleAuthor}>BY {article.author}</Text>
                        </View>
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
    aritcleCard: {
        borderRadius: 20,
        backgroundColor: theme.palette.white,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        marginBottom: 10
    },
    articleImage: {
        height: 90,
        width: 90,
        backgroundColor: theme.palette.primary.green.three,
        borderRadius: 10,
    },
    articleDetail: {
        marginLeft: 10,
        width: PAGE_WIDTH - 140,
    },
    articleTitle: {
        fontSize: theme.text.fontSize.four,
        letterSpacing: theme.text.letterSpacing.four,
        lineHeight: theme.text.lineHeight.four,
        fontFamily: theme.text.fontWeight.four,
        color: theme.palette.primary.green.one,
        height: 44,
    },
    articleInfo: {
        fontSize: theme.text.fontSize.seven,
        letterSpacing: theme.text.letterSpacing.seven,
        lineHeight: theme.text.lineHeight.seven,
        fontFamily: theme.text.fontWeight.seven,
        color: theme.palette.neutral.two,
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