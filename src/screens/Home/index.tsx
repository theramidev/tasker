import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HomeScreen extends Component<{}, {}> {

    render() {
        return(
            <>
                <Text>
                    HomeScreen
                </Text>
                <Icon name="person" size={30} color="black" />
            </>
        )
    }
}

export default HomeScreen;