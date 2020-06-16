import React from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import theme from '../../styles';
import { Ionicons } from '@expo/vector-icons';

const PAGE_WIDTH = Dimensions.get('window').width;

export default ({ title, publisher, url, author, readDuration, thumbnail, isLast, onPress, ...props }) => {

    return (
        <TouchableOpacity
            style={[styles.videoCard, isLast && { marginBottom: 30 }]}
            onPress={onPress}
        >
            <Image 
                overlayColor={theme.palette.primary.green.one + '80'}
                style={styles.videoImage}
                source={{
                    uri: thumbnail,
                }}
            />
            <View style={styles.videoDetail}>
                <Text style={styles.videoTitle} numberOfLines={2}>{title}</Text>
                <Text style={styles.videoInfo}>BY {publisher} - {author}</Text>
            </View>
            <TouchableOpacity style={styles.videoPlayBtnWrapper}>
                <Ionicons style={styles.playBtn} name="ios-play" size={23} color={theme.palette.primary.green.two} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}



const styles = StyleSheet.create({

    videoCard: {
        backgroundColor: theme.palette.primary.green.one ,
        borderRadius: 20,
        marginBottom: 10,
        height: 178,
        overflow: 'hidden',
        position: 'relative',
    },
    videoImage: {
        height: 178,
        top: 0,
        opacity: 0.3,
    },
    videoPlayBtnWrapper: {
        height: 40,
        width: 40,
        backgroundColor: theme.palette.white,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 16,
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
        position: 'absolute',
        bottom: 20,
        left: 16,
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
})
