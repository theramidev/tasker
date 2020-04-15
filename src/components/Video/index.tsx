import React,{ FC } from 'react';
import { View } from 'react-native';
import RNVideo from 'react-native-video';
import { IProps } from './IProps';

export const Video: FC<IProps> = ({uri, height = '100%', width = '100%'}) => {

    return(
        <View
            style={{
                width,
                height,
                position: 'relative',
                backgroundColor: 'black'
            }}
        >
            <RNVideo 
                source={{uri}}
                resizeMode="contain"
                controls={true}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }}
            />
        </View>
    )
}