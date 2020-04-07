import React, { Component } from 'react';
import { Button } from 'react-native';
import { IProps } from './interfaces/IProps';
import { IState } from './interfaces/IState';

import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import Notification from '../../utils/notifications';


class HomeScreen extends Component<IProps, IState> {

    notification = () => {
        Notification(
            1,
            'Sub Text',
            '#tag',
            'Title',
            'Message',
            new Date(Date.now() + 10 * 1000)
        );
    }

    render() {
        return(
            <Layout>
                <Header 
                    navigation={this.props.navigation}
                    title="Tasker"
                    mode="menu"
                />

                <Button title="Presiona aquí" onPress={this.notification} />
            </Layout>
        )
    }
}

export default HomeScreen;