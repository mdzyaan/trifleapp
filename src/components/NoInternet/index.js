import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import NoInternetIllustration from '../../assets/illustration/noInternetIllustration.svg';
import theme from '../../styles';
const PAGE_WIDTH = Dimensions.get('window').width;


const NoInternet = (props) => {

    return (
        <View>
            <NoInternetIllustration style={styles.illustration} width={140} height={113} />
            <Text style={styles.header}>Oh No!</Text>
            <Text style={styles.description}>No internet connection. Check your network and try again</Text>
        </View>
    )
}


export default NoInternet;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: PAGE_WIDTH,
    },
    illustration: {
        alignSelf: 'center',
        marginTop: 64,
    },
    header: {
        fontSize: theme.text.fontSize.four,
        letterSpacing: theme.text.letterSpacing.four,
        lineHeight: theme.text.lineHeight.four,
        fontFamily: theme.text.fontWeight.four,
        color: theme.palette.neutral.six,
        marginTop: 16,
        marginBottom: 6,
        alignSelf: 'center',
    },
    description: {
        fontSize: theme.text.fontSize.five,
        letterSpacing: theme.text.letterSpacing.five,
        lineHeight: theme.text.lineHeight.five,
        fontFamily: theme.text.fontWeight.five,
        color: theme.palette.neutral.four,
        maxWidth: 286,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 64,
    },
});