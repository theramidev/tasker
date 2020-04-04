import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import { IProps } from './interfaces/IProps';
import { IState } from './interfaces/IState';
import Drawer from 'react-native-drawer-menu';

import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { Menu } from './components/Menu';


class HomeScreen extends Component<IProps, IState> {

    render() {
        return(
            <Layout>
                <Header 
                    navigation={this.props.navigation}
                    title="Tasker"
                    mode="menu"
                />
            </Layout>
        )
    }
}

export default HomeScreen;