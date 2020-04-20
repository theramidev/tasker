import React, {useState, FC, Fragment, useEffect} from 'react';
import AudioRecorderPlayer, {
  AudioSet,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import fs, {stat} from 'react-native-fs';
import {View, Text, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {styles} from './styles';
import {IProps} from './interfaces/IProps';

const audioRecorderPlayer = new AudioRecorderPlayer();

const audioSet: AudioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
};

export const RecorderAudio: FC<IProps> = ({show, clearNote, saveNote}) => {
  const [recordTime, setRecordTime] = useState<any>({
    recordSecs: 0,
    recordTime: '00:00:00',
  });
  const [playerTime, setPlayerTime] = useState<any>({
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const [momentToPlay, setMomentToPlay] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      onStopPlay();
    }
  }, []);

  const onStartRecord = async () => {
    if (!(await fs.exists(`${fs.ExternalDirectoryPath}/audio`))) {
      await fs.mkdir(`${fs.ExternalDirectoryPath}/audio`);
    }

    const result = await audioRecorderPlayer.startRecorder(
      `${fs.ExternalDirectoryPath}/audio/song.ogg`,
      audioSet,
    );
    audioRecorderPlayer.addRecordBackListener((e: any) => {
      setRecordTime({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(
          Math.floor(e.current_position), // 00:01:01
        ),
      });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setPlayerTime((data: any) => ({...data, duration: recordTime.recordTime}));
    setRecordTime({
      recordSecs: 0,
      recordTime: '00:00:00',
    });
    /* fs.unlink(`${fs.ExternalDirectoryPath}/audio/song.mp4`).catch((err) =>
      console.log('no se elimino'),
    ); */
    setMomentToPlay(true);
    saveNote(`${fs.ExternalDirectoryPath}/audio/song.ogg`);
    //console.log(await fs.readDir(result));
  };

  const onStartPlay = async () => {
    setStart(true);
    const msg = await audioRecorderPlayer.startPlayer(
      `${fs.ExternalDirectoryPath}/audio/song.ogg`,
    );
    audioRecorderPlayer.addPlayBackListener((e: any) => {
      if (e.current_position === e.duration) {
        setStart(false);
        onStopPlay();
      }
      setPlayerTime({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  const onPausePlay = async () => {
    setStart(false);
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer().catch((err) => console.log('stopPlayer'));
    audioRecorderPlayer.removePlayBackListener();
  };

  const clearAll = () => {
    setMomentToPlay(false);
    setStart(false);
    clearNote();
  };

  if (!show) {
    return <Fragment></Fragment>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.recorder}>
        <TouchableOpacity style={{}} onPress={clearAll}>
          <AntDesign name="close" size={20} color="#FF5D5D" />
        </TouchableOpacity>

        <View style={styles.recorderTime}>
          {!momentToPlay ? (
            <Text style={{color: '#ffff'}}>{recordTime.recordTime}</Text>
          ) : (
            <Text style={{color: '#ffff'}}>
              {playerTime.playTime} / {playerTime.duration}
            </Text>
          )}
        </View>

        {!momentToPlay ? (
          <TouchableOpacity
            style={styles.recorderAudio}
            onPressIn={onStartRecord}
            onPressOut={onStopRecord}>
            <FontAwesome name="microphone" size={20} color="#ffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.recorderAudio,
              {paddingHorizontal: 13, paddingVertical: 10},
            ]}
            onPress={!start ? onStartPlay : onPausePlay}>
            {!start ? (
              <FontAwesome name="play" size={20} color="#ffff" />
            ) : (
              <FontAwesome name="pause" size={20} color="#ffff" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
