import React, {FC} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {IProps} from './IProps';
import {theme} from '../../assets/themes';
import {styles} from './style';
import {HeaderBackButton} from 'react-navigation-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Header: FC<IProps> = ({
  title,
  mode = 'back',
  navigation,
  iconLibrary,
  iconName,
  onPress,
}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme().primary} />
      <View style={styles.container}>
        <View style={styles.left}>
          {/* BACK BUTTON */}
          {mode === 'back' && (
            <View style={styles.buttonLeftContainer}>
              <HeaderBackButton
                tintColor="white"
                onPress={() => navigation.goBack()}
              />
            </View>
          )}

          {/* TITLE */}
          <Text style={styles.title}>{title}</Text>
        </View>
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
