import React, { FC } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import style from './style';
import { theme } from '../../assets/themes';

import LinearGradient from 'react-native-linear-gradient';
import { getVersion } from 'react-native-device-info';
import { BoxShadow } from 'react-native-shadow';
import { MenuItem } from '../MenuItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const Menu: FC<{}> = () => {
    const ICON_COLOR = theme().tertiary;
    const ICON_SIZE = 25;

    const listData = [
        {
            id: '0',
            title: 'Todas',
            icon: <AntDesign name="home" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '1',
            title: 'Favoritos',
            icon: <AntDesign name="star" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '2',
            title: 'Recordatorios',
            icon: <IonIcons name="md-alarm" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '3',
            title: 'Notas de voz',
            icon: <IonIcons name="ios-recording" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '4',
            title: 'Notas de video',
            icon: <FontAwesome name="file-video-o" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '5',
            title: 'Listas de tarea',
            icon: <Octicons name="tasklist" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '6',
            title: 'Etiquetas',
            icon: <FontAwesome name="tags" color={ICON_COLOR} size={ICON_SIZE} />
        },
        {
            id: '7',
            title: 'Papelera',
            icon: <FontAwesome5 name="trash" color={ICON_COLOR} size={ICON_SIZE} />
        }

    ]

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
                <View>
                    <Text style={style.menuText}>
                        Tasker - Notas
                    </Text>
                    <Text style={style.versionText}>
                        Versión: {getVersion()}
                    </Text>
                </View>
            </LinearGradient>

            {/* MENÚ CONTENT */}
            <FlatList 
                data={listData}
                renderItem={({item, index}) => <MenuItem {...item} index={index} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}