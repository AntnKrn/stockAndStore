import React, { useContext, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {style} from './ProviderItemStyles'
import { useTypedSelector } from "../../hooks/useTypesSelector";


const ProviderItem = (props: any) => {
    const {userData} = useTypedSelector(state => state.auth);

  return (
        <View style={style.container}>
            <View>
                <Text style={style.pic}>{props.pic}</Text>
            </View>
            <View>
                <Text style={style.codeAndName}>{props.name}</Text>
                <Text>
                <MaterialCommunityIcons name="basket-outline" size={13} color="black" /> {props.category}
                </Text>
            </View>
            <Pressable style={style.edit}>
                <MaterialCommunityIcons style={style.icon} name="eye" size={24} color="black" onPress={props.onPressViewHandler}/>
                {userData?.user?.role !== 'user' ? <MaterialCommunityIcons style={style.icon} name="content-save-edit-outline" size={24} color="black" onPress={props.onPressEditHandler}/> : null}
                {userData?.user?.role !== 'user' ? <MaterialCommunityIcons style={style.icon} name="delete" size={24} color="black" onPress={props.onPressDeleteHandler}/> : null}
        </Pressable>
        </View> 
  )

}

export default ProviderItem;