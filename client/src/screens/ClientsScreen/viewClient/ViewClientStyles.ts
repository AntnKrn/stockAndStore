import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    mainView: {
        backgroundColor: 'skyblue',
        height: '100%',
    },
    table: {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
      },
      row: {
        flex: 1,
        flexDirection: 'row',
      },
      cell: {
        flex: 1,
        padding: 8,
      },
      cellText: {
        flexWrap: 'wrap',
      },
})
