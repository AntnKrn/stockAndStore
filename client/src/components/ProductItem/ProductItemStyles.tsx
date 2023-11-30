import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: 60,
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        alignItems: 'center',
    },
    edit: {
        marginLeft: 'auto'
    },
    pic: {
        fontSize: 25,
        margin: 10
    },
    codeAndName: {
        fontSize: 17,
        //width: 500
    },
});