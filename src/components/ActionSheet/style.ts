import { StyleSheet } from "react-native";
import { theme } from "../../assets/themes";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 20,
        maxHeight: 500
    },
    actionTitle: {
        color: 'gray',
        marginBottom: 10,
        fontSize: 16,
        marginHorizontal: 15
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15
    },
    optionTitle: {
        color: theme().text,
        marginLeft: 15,
        fontSize: 17
    },
    iconContainer: {
        width: 50,
        alignItems: 'center'
    }
});