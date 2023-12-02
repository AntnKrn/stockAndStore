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
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    icon: {
        width: 30,
        height: 30
    },
    pic: {
        fontSize: 25,
        margin: 10
    },
    codeAndName: {
        fontSize: 17,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: 30,
        width: 300
    },
});