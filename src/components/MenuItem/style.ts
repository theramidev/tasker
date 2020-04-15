import { StyleSheet } from "react-native";
import { theme } from '../../assets/themes';

export default StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    title: {
        marginLeft: 15,
        fontSize: 17,
        fontWeight: '700',
        color: theme().text
    },
    tagContainer: {
        paddingLeft: 20,
        height: 40,
        justifyContent: 'center'
    },
    tagText: {
        fontSize: 15
    }
});