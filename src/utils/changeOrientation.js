
import * as ScreenOrientation from 'expo-screen-orientation';

export default {
    ALL: async function changeScreenOrientation() {
        await ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    },
    DEFAULT : async function changeScreenOrientation() {
        await ScreenOrientation.allowAsync(ScreenOrientation.Orientation.DEFAULT );
    },
    LANDSCAPE_LEFT: async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    },
    LANDSCAPE_RIGHT: async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    },
    PORTRAIT_UP: async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    },
}