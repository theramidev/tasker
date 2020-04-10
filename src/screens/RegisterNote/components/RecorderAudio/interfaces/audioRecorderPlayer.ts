import {
  AVEncoderAudioQualityIOSType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
  AudioEncoderAndroidType,
} from 'react-native-audio-recorder-player';

interface AudioSet {
  AVSampleRateKeyIOS?: number;
  AVNumberOfChannelsKeyIOS?: number;
  AVEncoderAudioQualityKeyIOS?: AVEncoderAudioQualityIOSType;
  AudioSourceAndroid?: AudioSourceAndroidType;
  OutputFormatAndroid?: OutputFormatAndroidType;
  AudioEncoderAndroid?: AudioEncoderAndroidType;
}
