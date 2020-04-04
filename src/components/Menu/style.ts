import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: 250
    },
    linearGradient: {
        height: 180,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15
    },
    image: {
        width: 45,
        height: 45,
        resizeMode: 'contain',
    },
    menuText: {
        color: 'white',
        fontSize: 17,
        marginTop: 10,
        fontWeight: 'bold'
    },
    versionText: {
        color: 'white'
    }
});