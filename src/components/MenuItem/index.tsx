import React, { FC, useState } from 'react';
import { View, Text, Easing, FlatList } from 'react-native';
import { IProps } from './IProps';
import style from './style';

import Ripple from 'react-native-material-ripple';
import Collapsible from 'react-native-collapsible';
import { Layout } from '../Layout';


export const MenuItem: FC<IProps> = ({title, icon, index, isSelected, onSelect, id}) => {
    const [isCollapse, setCollapse] = useState<boolean>(true);

    const tags = [
        {
            name: 'Administrar etiquetas',
            color: 'rgb(60, 60, 60)'
        },
        {
            name: '#casa',
            color: 'rgb(74, 80, 255)'
        },
        {
            name: '#mistareas',
            color: 'rgb(125, 80, 95)'
        }
    ]

    return(
        <Layout>
            {
                index !== 6 ?
                <Ripple
                    rippleColor="rgb(60, 60, 60)"
                    rippleDuration={500}
                    onPress={() => onSelect(id)}
                >
                    <View style={[style.container, {backgroundColor: isSelected ? 'rgba(100, 100, 100, .2)' : 'white'}]}>
                        {icon}
                        <Text style={style.title}>
                            {title}
                        </Text>
                    </View>
                </Ripple> :
                <>
                    <Ripple
                        rippleColor="rgb(60, 60, 60)"
                        rippleDuration={500}
                        onPress={() => {
                            setCollapse(!isCollapse);
                            onSelect(id);
                        }}
                    >
                        <View style={[style.container, {backgroundColor: isSelected ? 'rgba(60, 60, 60, .3)' : 'white'}]}>
                            {icon}
                            <Text style={style.title}>
                                {title}
                            </Text>
                        </View>
                    </Ripple>
                    <Collapsible 
                        collapsed={isCollapse}
                        easing={Easing.ease}
                    >
                        <FlatList 
                            data={tags}
                            keyExtractor={(item) => item.name}
                            renderItem={({item: {name, color}, index}) => {
                                return(
                                    <Ripple
                                        rippleColor="rgb(60, 60, 60)"
                                        rippleDuration={500}
                                    >
                                        <View style={style.tagContainer}>
                                            <Text style={[style.tagText, {color: color, fontWeight: !index ? 'bold' : 'normal'}]}>
                                                {name}
                                            </Text>
                                        </View>
                                    </Ripple>
                                )
                            }}
                        />
                    </Collapsible>
                </>
            }
        </Layout>
    )
}