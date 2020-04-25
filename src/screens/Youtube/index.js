// /**
//  *
//  * Youtube
//  *
//  */
// import React, { 
//   useState, 
//   useEffect, 
//   useContext,
//   useRef
// } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { makeSelectYoutubeState, makeSelectLoading, makeSelectError} from './selectors';
// import { YoutubeAction } from './actions';
// import { View, Text } from 'react-native';
// import YouTube from 'react-native-youtube';
// import YoutubePlayer from 'react-native-youtube-iframe';
// import * as ScreenOrientation from 'expo-screen-orientation';

// async function changeScreenOrientation() {
//   await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
// }



// export const Youtube = props => {
//   const playerRef = useRef();
//   const [ytReady, setytReady] = useState(false);

//   useEffect(() => {
//     changeScreenOrientation();
//   })
//   return (
//     // <YoutubePlayer
//     //   height={300}
//     //   width={400}
//     //   ref={playerRef}
//     //   videoId={"AVAc1gYLZK0"}
//     //   play={true}
//     //   onChangeState={event => console.log(event)}
//     //   onReady={() => console.log("ready")}
//     //   onError={e => console.log(e)}
//     //   onPlaybackQualityChange={q => console.log(q)}
//     //   volume={50}
//     //   playbackRate={1}
//     //   playerParams={{
//     //     preventFullScreen: false,
//     //     cc_lang_pref: "us",
//     //     showClosedCaptions: true
//     //   }}
//     // />
//     <YouTube
//       apiKey="AIzaSyAqrYAoKcUESIryUQFh08Ecyb3nBqdKgNk"
//       videoId="KVZ-P-ZI6W4" // The YouTube video ID
//       autoplay={true} // control playback of video with true/false
//       fullscreen={true} // control whether the video should play in fullscreen or inline
//       loop={false} // control whether the video should loop when ended
//       onReady={e => setytReady({ isReady: true })}
//     // onChangeState={e => this.setState({ status: e.state })}
//     // onChangeQuality={e => this.setState({ quality: e.quality })}
//     onError={e => console.log(e)}
//     // style={{ alignSelf: 'stretch', height: 300 }}
//     />
//     );
// }
// Youtube.propTypes = {
//   // YoutubeStart: PropTypes.func.isRequired,
// };
// export const mapStateToProps = (state,props) => {
//   // @dev you can pass props to makeSelectFuncs(props) like so.
//   return createStructuredSelector({
//     youtube: makeSelectYoutubeState(),
//     loading: makeSelectLoading(),
//     error: makeSelectError()
// });
// } 
// export const mapDispatchToProps = (dispatch) => {
//   return {
//     YoutubeStart: ({ payload, metadata }) => dispatch(YoutubeAction.start({ payload, metadata }))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Youtube);
    
    
  
  

import React, { Component } from 'react';
import  { StyleSheet,  View,  Text,  ScrollView,  TouchableOpacity,  PixelRatio,         Platform,  Button,  Dimensions, } from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';



export default class YouTubeExample extends Component {
state = {
  isReady: false,
  status: null,
  quality: null,
  error: null,
  isPlaying: true,
  isLooping: true,
  duration: 0,
  currentTime: 0,
  fullscreen: false,
  playerWidth: Dimensions.get('window').width,
 };
 constructor(props){
    super(props);
 }

 _youTubeRef = React.createRef();

render(){
  const YOUR_API_KEY = "paste yout api key here";

 return (<View>
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>{'<YouTube /> component for React Native.'}    </Text>
    <YouTube
      ref={this._youTubeRef}
      // You must have an API Key for the player to load in Android
      apiKey = {YOUR_API_KEY}
      // Un-comment one of videoId / videoIds / playlist.
      // You can also edit these props while Hot-Loading in development mode to see how
      // it affects the loaded native module
      //videoId="ncw4ISEU5ik"
      // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
      playlistId="PL3c6c2pNE7cLc5a0zpz7xZOW38H7lzzKM"
      play={this.state.isPlaying}
      loop={this.state.isLooping}
      fullscreen={this.state.fullscreen}
      controls={1}
      style={[
        { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) },
        styles.player,
      ]}
      onError={e => {
        this.setState({ error: e.error });
      }}
      onReady={e => {
        this.setState({ isReady: true });
      }}
      onChangeState={e => {
        this.setState({ status: e.state });
      }}
      onChangeQuality={e => {
        this.setState({ quality: e.quality });
      }}
      onChangeFullscreen={e => {
        this.setState({ fullscreen: e.isFullscreen });
      }}
      onProgress={e => {
        this.setState({ currentTime: e.currentTime });
      }}
    />

 {/* Playing / Looping */}
    <View style={styles.buttonGroup}>
      <Button
        title={this.state.status == 'playing' ? 'Pause' : 'Play'}
        color={this.state.status == 'playing' ? 'red' : undefined}
        onPress={() => {
          this.setState(state => ({ isPlaying: !state.isPlaying }));
        }}
      />
      <Text> </Text>
      <Button
        title={this.state.isLooping ? 'Looping' : 'Not Looping'}
        color={this.state.isLooping ? 'green' : undefined}
        onPress={() => {
          this.setState(state => ({ isLooping: !state.isLooping }));
        }}
      />
    </View>

    {/* Previous / Next video */}
    <View style={styles.buttonGroup}>
      <Button
        title="Previous Video"
        onPress={() => {
          if (this._youTubeRef.current) {
            this._youTubeRef.current.previousVideo();
          }
        }}
      />
      <Text> </Text>
      <Button
        title="Next Video"
        onPress={() => {
          if (this._youTubeRef.current) {
            this._youTubeRef.current.nextVideo();
          }
        }}
      />
    </View>

    {/* Go To Specific time in played video with seekTo() */}
    <View style={styles.buttonGroup}>
      <Button
        title="15 Seconds"
        onPress={() => {
          if (this._youTubeRef.current) {
            this._youTubeRef.current.seekTo(15);
          }
        }}
      />
      <Text> </Text>
      <Button
        title="2 Minutes"
        onPress={() => {
          if (this._youTubeRef.current) {
            this._youTubeRef.current.seekTo(2 * 60);
          }
        }}
      />
      <Text> </Text>
      <Button
        title="15 Minutes"
        onPress={() => {
          if (this._youTubeRef.current) {
            this._youTubeRef.current.seekTo(15 * 60);
          }
        }}
      />
    </View>

    {/* Play specific video in a videoIds array by index */}
    {this._youTubeRef.current &&
      this._youTubeRef.current.props.videoIds &&
      Array.isArray(this._youTubeRef.current.props.videoIds) && (
        <View style={styles.buttonGroup}>
          {this._youTubeRef.current.props.videoIds.map((videoId, i) => (
            <React.Fragment key={i}>
              <Button
                title={`Video ${i}`}
                onPress={() => {
                  if (this._youTubeRef.current) {
                    this._youTubeRef.current.playVideoAt(i);
                  }
                }}
              />
              <Text> </Text>
            </React.Fragment>
          ))}
        </View>
      )}

    {/* Get current played video's position index when playing videoIds (and playlist in iOS) */}
    <View style={styles.buttonGroup}>
      <Button
        title={'Get Videos Index: ' + this.state.videosIndex}
        onPress={() => {
          if (this._youTubeRef.current) {
            this._youTubeRef.current
              .getVideosIndex()
              .then(index => this.setState({ videosIndex: index }))
              .catch(errorMessage => this.setState({ error: errorMessage }));
          }
        }}
      />
    </View>

    {/* Fullscreen */}
    {!this.state.fullscreen && (
      <View style={styles.buttonGroup}>
        <Button
          title="Set Fullscreen"
          onPress={() => {
            this.setState({ fullscreen: true });
          }}
        />
      </View>
    )}

    {/* Get Duration (iOS) */}
    {Platform.OS === 'ios' && (
      <View style={styles.buttonGroup}>
        <Button
          title="Get Duration (iOS)"
          onPress={() => {
            if (this._youTubeRef.current) {
              this._youTubeRef.current
                .getDuration()
                .then(duration => this.setState({ duration }))
                .catch(errorMessage => this.setState({ error: errorMessage }));
            }
          }}
        />
      </View>
    )}

    {/* Get Progress & Duration (Android) */}
    {Platform.OS === 'android' && (
      <View style={styles.buttonGroup}>
        <Button
          title="Get Progress & Duration (Android)"
          onPress={() => {
            if (this._youTubeRef.current) {
              this._youTubeRef.current
                .getCurrentTime()
                .then(currentTime => this.setState({ currentTime }))
                .catch(errorMessage => this.setState({ error: errorMessage }));

              this._youTubeRef.current
                .getDuration()
                .then(duration => this.setState({ duration }))
                .catch(errorMessage => this.setState({ error: errorMessage }));
            }
          }}
        />
      </View>
    )}

    {/* Standalone Player (iOS) */}
    {Platform.OS === 'ios' && YouTubeStandaloneIOS && (
      <View style={styles.buttonGroup}>
        <Button
          title="Launch Standalone Player"
          onPress={() => {
            YouTubeStandaloneIOS.playVideo('KVZ-P-ZI6W4')
              .then(() => console.log('iOS Standalone Player Finished'))
              .catch(errorMessage => this.setState({ error: errorMessage }));
          }}
        />
      </View>
    )}

    {/* Standalone Player (Android) */}
    {Platform.OS === 'android' && YouTubeStandaloneAndroid && (
      <View style={styles.buttonGroup}>
        <Button
          style={styles.button}
          title="Standalone: One Video"
          onPress={() => {
            YouTubeStandaloneAndroid.playVideo({
              apiKey: 'YOUR_API_KEY',
              videoId: 'KVZ-P-ZI6W4',
              autoplay: true,
              lightboxMode: false,
              startTime: 124.5,
            })
              .then(() => {
                console.log('Android Standalone Player Finished');
              })
              .catch(errorMessage => {
                this.setState({ error: errorMessage });
              });
          }}
        />
        <Text> </Text>
        <Button
          title="Videos"
          onPress={() => {
            YouTubeStandaloneAndroid.playVideos({
              apiKey: 'YOUR_API_KEY',
              videoIds: ['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0'],
              autoplay: false,
              lightboxMode: true,
              startIndex: 1,
              startTime: 99.5,
            })
              .then(() => {
                console.log('Android Standalone Player Finished');
              })
              .catch(errorMessage => {
                this.setState({ error: errorMessage });
              });
          }}
        />
        <Text> </Text>
        <Button
          title="Playlist"
          onPress={() => {
            YouTubeStandaloneAndroid.playPlaylist({
              apiKey: 'YOUR_API_KEY',
              playlistId: 'PLF797E961509B4EB5',
              autoplay: false,
              lightboxMode: false,
              startIndex: 2,
              startTime: 100.5,
            })
              .then(() => {
                console.log('Android Standalone Player Finished');
              })
              .catch(errorMessage => {
                this.setState({ error: errorMessage });
              });
          }}
        />
      </View>
    )}

    {/* Reload iFrame for updated props (Only needed for iOS) */}
    {Platform.OS === 'ios' && (
      <View style={styles.buttonGroup}>
        <Button
          title="Reload iFrame (iOS)"
          onPress={() => {
            if (this._youTubeRef.current) {
              this._youTubeRef.current.reloadIframe();
            }
          }}
        />
      </View>
    )}

    <Text style={styles.instructions}>
      {this.state.isReady ? 'Player is ready' : 'Player setting up...'}
    </Text>
    <Text style={styles.instructions}>Status: {this.state.status}</Text>
    <Text style={styles.instructions}>Quality: {this.state.quality}</Text>

    {/* Show Progress */}
    <Text style={styles.instructions}>
      Progress: {Math.trunc(this.state.currentTime)}s ({Math.trunc(this.state.duration / 60)}:
      {Math.trunc(this.state.duration % 60)}s)
      {Platform.OS !== 'ios' && <Text> (Click Update Progress & Duration)</Text>}
    </Text>

    <Text style={styles.instructions}>
      {this.state.error ? 'Error: ' + this.state.error : ''}
    </Text>

      </ScrollView>
    </View>
   );
 }
}

const styles = StyleSheet.create({
  container: {
   backgroundColor: 'grey',
 },
welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
},
buttonGroup: {
flexDirection: 'row',
alignSelf: 'center',
paddingBottom: 5,
},
instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
 },
player: {
  alignSelf: 'stretch',
  marginVertical: 10,
 },
});