import { StyleSheet } from 'react-native';
import { theme } from '../../assets/themes';

export const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        flexDirection: 'row',
        height: 85,
        backgroundColor: theme().primary,
        paddingTop: 25
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textIcon: {
        color: theme().light,
        marginRight: 4,
        fontWeight: 'bold',
        fontSize: 15,
    },

    buttonLeftContainer: {
        position: 'relative',
        marginVertical: -5
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: 'white',
        marginLeft: 10
    },
    buttonMenuContainer: {
        marginLeft: 5,
        padding: 5
    }
});