import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Dimensions, BackHandler } from 'react-native'
import theme from '../../styles';
import ArticleCard from '../../components/ArticleCard/index';
import LottieView from "lottie-react-native";
import Loader from '../../assets/lottie/Loader.json';
const PAGE_WIDTH = Dimensions.get('window').width;

export default (props) => {
    const {  articleData } = props;
    const { loading, data} = articleData;

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
                ) : data.map((article, articleId) => {
                    return (
                        <ArticleCard
                            key={articleId}
                            title={article.title}
                            publisher={article.publisher}
                            url={article.url}
                            author={article.author}
                            readDuration={article.readDuration}
                            thumbnail={article.thumbnail}
                            isLast={(articleId + 1) === data.length}
                            onPress={async () => {
                                props.navigation.navigate('webview', {
                                    url: article.url,
                                    title: article.title
                                });
                            }}
                        />
                    )
                })}
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
        width: PAGE_WIDTH -32,
        flex: 1,
        alignItems: 'center',
    }
});