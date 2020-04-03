import React, { Component } from 'react';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import { IProps } from './interfaces/IProps';

class HomeScreen extends Component<IProps, {}> {

    render() {
        return(
            <Layout>
                <Header 
                    navigation={this.props.navigation}
                    title="Tasker"
                    mode="none"
                />
            </Layout>
        )
    }
}

export default HomeScreen;