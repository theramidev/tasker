import React, { Component } from 'react';
import { Button } from 'react-native';
import { IProps } from './interfaces/IProps';
import { IState } from './interfaces/IState';

import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';

class HomeScreen extends Component<IProps, IState> {

    render() {
        return(
            <Layout>
                <Header 
                    navigation={this.props.navigation}
                    title="Tasker"
                    mode="menu"
                />
                <Button 
                    title="Obtener foto"
                    onPress={() => this.setState({isVisible: true})}
                />
            </Layout>
        )
    }
}

export default HomeScreen;