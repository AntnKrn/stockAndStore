import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    mainView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#65dcff',
        borderBottomColor: 'grey',
        borderBottomWidth: 2
    },
    input: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        padding: 5,
        width: '70%'
    },
    search: {
        marginLeft: 10
    },
    plusAndFilter: {
        marginLeft: 'auto'
    }
});