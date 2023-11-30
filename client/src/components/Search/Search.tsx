import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {style} from './SearchStyles'

const SearchField = (props: any) => {
  return (
        <View style={style.mainView}>
            <MaterialCommunityIcons style={style.search} name="magnify" size={25} color="black" />
            <TextInput 
              style={style.input}
              placeholder="Введите название"
              autoCapitalize="none"
            />
            <MaterialCommunityIcons style={style.plusAndFilter} name="plus" size={25} color="black" />
            <MaterialCommunityIcons style={style.plusAndFilter} name="filter" size={25} color="black" />
        
        </View>
  )

}

export default SearchField;