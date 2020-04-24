import { StyleSheet } from "react-native";
import { theme } from '../../../../assets/themes';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    input: {
        width: '80%', 
        height: 50, 
        backgroundColor: 'transparent', 
        borderBottomWidth: 1, 
        borderBottomColor: '#cdcdcd'
    }
});