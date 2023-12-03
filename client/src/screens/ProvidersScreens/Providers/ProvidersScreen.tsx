import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

import { style } from "./ProvidersStyles";
import SearchField from "../../../components/Search/Search";

const ProvidersScreen = ({navigation}: any) => {

  const [searchText, setSearchText] = useState<string>();

  const onPressAddHandler = () => {
    navigation.navigate('AddProviderScreen');
  }
  
  return (
        <View style={style.mainView}>
          <SearchField onPress={onPressAddHandler}
                onChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setSearchText(e.nativeEvent.text)}
          />


        </View>
  )
}

export default ProvidersScreen;