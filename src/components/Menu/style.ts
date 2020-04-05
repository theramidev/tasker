import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: 250
    },
    linearGradient: {
        height: 150,
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
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