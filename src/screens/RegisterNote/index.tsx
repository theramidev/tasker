import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Input } from '../../Components/Input'

export default class RegisterNoteScreen extends Component {
    render() {
        return (
            <View>
                <Input title="Titulo" value="" onChange={() => {}} />
            </View>
        )
    }
}

