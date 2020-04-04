import React, { FC } from 'react';
import { View, Text, Image } from 'react-native';
import style from './style';
import { theme } from '../../assets/themes';

import LinearGradient from 'react-native-linear-gradient';
import { getVersion } from 'react-native-device-info';
import { BoxShadow } from 'react-native-shadow';

export const Menu: FC<{}> = () => {

    return(
        <View style={style.container}>
            <LinearGradient 
                colors={[theme().primary, theme().tertiary]} 
                style={style.linearGradient}
                start={{x: 0.0, y: 0.0}} 
                end={{x: 0.0, y: 1.0}}
                locations={[0, 0.5]}
            >
                <BoxShadow 
                    setting={{
                        width: 45,
                        height: 45,
                        color: "#000",
                        border: 2,
                        radius: 3,
                        opacity: 0.2,
                        x: 3,
                        y: 3,
                        style:{ marginVertical: 5, marginLeft: 10 }
                    }}
                >
                    <Image 
                        source={require('../../assets/images/logo.png')}
                        style={style.image}
                    />
                </BoxShadow>
                <Text style={style.menuText}>
                    Tasker - Notas
                </Text>
                <Text style={style.versionText}>
                    Número de versión: {getVersion()}
                </Text>
            </LinearGradient>

            {/* MENÚ CONTENT */}
            
        </View>
    )
}