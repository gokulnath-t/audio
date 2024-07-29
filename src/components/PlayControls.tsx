import {
  ActivityIndicator,
  FlatList,
  Image,
  NativeEventEmitter,
  NativeModules,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {variousSpeed} from '../constants';
import {renderSpeedItemTypes} from './PlayControlsTypes';
import {playerStatus} from '../constants/enum';

const PlayControls = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedSpeed, setSelectedSpeed] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {AudioControl} = NativeModules;

  const [status, setStatus] = useState<string>('Not Playing');

  const renderSpeedItem = useCallback(
    ({item}: renderSpeedItemTypes) => {
      const selected: boolean = selectedSpeed === item.speed;
      return (
        <Pressable
          onPress={() => {
            setSelectedSpeed(item.speed);
          }}
          style={[styles.speedPressable, selected && styles.selectedView]}>
          <Text
            style={[styles.speedText, selected && styles.selectedText]}
            key={item.index}>
            X{item.speed}
          </Text>
        </Pressable>
      );
    },
    [selectedSpeed],
  );

  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.AudioControl);
    eventEmitter.addListener('playerState', event => {
      console.log(event); // "someValue"
      if (event === playerStatus.LOADING) {
        setIsLoading(true);
        setStatus('Loading');
      }
      if (event === playerStatus.PLAYING) {
        setIsLoading(false);
        setStatus('Audio is playing');
      }
    });

    // Removes the listener once unmounted
    return () => {
      eventEmitter.removeAllListeners('playerState');
    };
  }, []);

  const pressButton = (isPlaying: boolean) => {
    if (!isPlaying) {
      setIsLoading(true);
      AudioControl.play(
        'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
        (status: string) => console.log(status),
      );
    } else {
      setStatus('Paused');
      AudioControl.pausePlayer();
    }
  };
  return (
    <View style={styles.playContainer}>
      <View style={styles.horizontalView}>
        <Text style={styles.speedHeader}>Speed</Text>
        <Text style={styles.speedHeader}>{status}</Text>

        <Pressable
          onPress={() => {
            setIsPlaying(prev => !prev);
            pressButton(isPlaying);
          }}>
          {isLoading ? (
            <ActivityIndicator size={'small'} />
          ) : (
            <Image
              source={
                isPlaying
                  ? require('../assets/images/pause.png')
                  : require('../assets/images/play.png')
              }
              style={styles.iconStyle}
            />
          )}
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={variousSpeed}
        style={styles.speedListView}
        renderItem={renderSpeedItem}
      />
    </View>
  );
};

export default PlayControls;

const styles = StyleSheet.create({
  playContainer: {
    padding: 10,
    backgroundColor: '#13303c',
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  speedHeader: {
    fontSize: 18,
    color: '#ffffff',
  },
  speedText: {
    fontSize: 20,
    color: '#ffffff',
  },
  speedPressable: {
    padding: 10,
    borderRadius: 10,
    borderColor: '#fafafa',
    borderWidth: 1.5,
    marginHorizontal: 5,
  },
  speedListView: {
    margin: 10,
  },
  controlListView: {
    margin: 10,
  },
  iconStyle: {
    height: 25,
    width: 25,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  selectedView: {backgroundColor: 'white'},
  selectedText: {color: 'black', fontWeight: '500'},
});
