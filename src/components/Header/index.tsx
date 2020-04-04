import React, { FC, useContext } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { HeaderBackButton } from 'react-navigation-stack';
import { styles } from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../../assets/themes';
import { IProps } from './IProps';
import { MenuContext } from '../../MenuContext';

export const Header: FC<IProps> = ({title, mode = 'back', navigation, iconLibrary, iconName, onPress}) => {
    const { menuRef } = useContext(MenuContext);

    console.log(menuRef);

    return(
        <>
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
            <View style={styles.container}>
                <View style={styles.left}>
                    {/* BACK BUTTON */}
                    {
                        mode === 'back' &&
                        <View style={styles.buttonLeftContainer}>
                            <HeaderBackButton tintColor="white" onPress={() => navigation.goBack()} />
                        </View>
                    }
                    {
                        mode === 'menu' && 
                        <View style={styles.buttonMenuContainer}>
                            <TouchableOpacity 
                                onPress={() => menuRef.openDrawer()}
                                hitSlop={{
                                    top: 10,
                                    right: 10,
                                    bottom: 10,
                                    left: 10
                                }}
                            >
                                <MaterialIcons name="menu" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    }
                    
                    {/* TITLE */}
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.right}>
                    {
                        iconLibrary &&
                        <TouchableOpacity onPress={onPress} 
                            hitSlop={{
                                top: 10,
                                right: 10,
                                bottom: 10,
                                left: 10
                            }}
                        >
                            {
                                iconLibrary === 'Material' && iconName &&
                                <MaterialIcons name={iconName} size={30} color="white" />
                            }
                            {
                                iconLibrary === 'FontAwesome' && iconName &&
                                <FontAwesome name={iconName} size={30} color="white" />
                            }
                            {
                                iconLibrary === 'Ionic' && iconName &&
                                <Ionicons name={iconName} size={30} color="white" />
                            }
                        </TouchableOpacity>
                    }
                </View>
            </View>
          )}

          {/* TITLE */}
          <Text style={styles.title}>{title}</Text>
        <View>
        <View style={styles.right}>
          {iconLibrary && (
            <TouchableOpacity
              onPress={onPress}
              hitSlop={{
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              }}>
              {iconLibrary === 'Material' && iconName && (
                  <MaterialIcons name={iconName} size={30} color="white" />
                )}
                {iconLibrary === 'FontAwesome' && iconName && (
                  <FontAwesome name={iconName} size={30} color="white" />
                )}
                {iconLibrary === 'Ionic' && iconName && (
                  <Ionicons name={iconName} size={30} color="white" />
                )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};
