import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

import { style } from "./TodoStyles";

const TodosScreen = ({navigation}: any) => {
  return (
        <View style={style.container}>
            <Text>Список дел</Text>
        </View>
  )
}

export default TodosScreen;