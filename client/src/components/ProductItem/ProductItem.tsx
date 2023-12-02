import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {style} from './ProductItemStyles'

const ProductItem = (props: any) => {
  return (
        <View style={style.container}>
            <View>
                <Text style={style.pic}>{props.pic}</Text>
            </View>
            <View>
                <Text style={style.codeAndName}>{props.code} • {props.name}</Text>
                <Text>
                <MaterialCommunityIcons name="basket-outline" size={13} color="black" /> {props.quantity}
                </Text>
            </View>
            <Pressable style={style.edit}>
                <MaterialCommunityIcons style={style.icon} name="eye" size={24} color="black" onPress={props.onPressViewHandler}/>
                <MaterialCommunityIcons style={style.icon} name="content-save-edit-outline" size={24} color="black" onPress={props.onPressEditHandler}/>
                <MaterialCommunityIcons style={style.icon} name="delete" size={24} color="black" onPress={props.onPressDeleteHandler}/>
            </Pressable>
        </View>
  )//content-save-edit-outline

}

export default ProductItem;