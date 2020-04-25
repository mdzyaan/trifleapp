import { AsyncStorage } from 'react-native';



export default {
    getItem: async (key, callback) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            callback(error);
        }
    },
    setItem: async (key, value, callback) => {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            callback(error);
        }
    },
    clear: async (callback) => {
        try {
            return await AsyncStorage.clear()
        } catch(error) {
            callback(error);
        }
    },
    // mergeItem: async (key, value, callback) => {
    //     try {
    //         return await AsyncStorage.mergeItem(key, JSON.stringify(value));
    //     } catch (error) {
    //         callback();
    //     }
    // },
    // removeItem: async (key, callback) => {
    //     try {
    //         return await AsyncStorage.removeItem(key);
    //     } catch (error) {
    //         callback();
    //     }
    // },
 }