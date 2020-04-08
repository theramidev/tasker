import React, { Component } from 'react';
import { IProps } from './interfaces/IProps';
import { IState } from './interfaces/IState';

import { Layout } from '../../components/Layout';
import { Header } from '../../components/Header';
import NoteController from '../../Database/controllers/Note';



class HomeScreen extends Component<IProps, IState> {

    async componentDidMount() {
        const noteId = await NoteController.createNote(
            {
                title: 'Mi segunda nota',
                message: 'Mensaje de mi segunda nota',
                complements: [{path: 'path', type: 'Audio'}, {path: 'path', type: 'Image'}]
            }
        );

        console.log(noteId);
        
    }

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