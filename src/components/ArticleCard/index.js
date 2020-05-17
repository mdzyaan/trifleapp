import React from 'react';
import { Text, Image,  View,  StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import theme from '../../styles';
import * as WebBrowser from 'expo-web-browser';

const PAGE_WIDTH = Dimensions.get('window').width;

export default ({ title, publisher, url, author, readDuration, thumbnail, onPress, isLast, ...props}) => {


    return (
        <TouchableOpacity style={[styles.aritcleCard, isLast && {marginBottom: 30}]} onPress={onPress}>
            <View style={styles.aritcleImageContainer}>
                <Image
                    overlayColor={theme.palette.primary.green.one + '80'}
                    style={styles.articleImage}
                    source={{
                        uri: thumbnail,
                    }}
                />
            </View>
           
            <View style={styles.articleDetail}>
                <Text style={styles.articleTitle} numberOfLines={2}>{title}</Text>
                <Text style={styles.articleInfo}>{publisher} - {readDuration} MIN READ</Text>
                <Text style={styles.aritcleAuthor}>BY {author}</Text>
            </View>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({
    aritcleCard: {
        borderRadius: 20,
        backgroundColor: theme.palette.white,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    aritcleImageContainer: {
        height: 90,
        width: 90,
        borderRadius: 10,
        overflow: 'hidden',

    },
    articleImage: {
        height: 90,
        width: 90,
    },
    articleDetail: {
        marginLeft: 10,
        width: PAGE_WIDTH - 160,
    },
    articleTitle: {
        fontSize: theme.text.fontSize.four,
        letterSpacing: theme.text.letterSpacing.four,
        lineHeight: theme.text.lineHeight.four,
        fontFamily: theme.text.fontWeight.four,
        color: theme.palette.primary.green.one,
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