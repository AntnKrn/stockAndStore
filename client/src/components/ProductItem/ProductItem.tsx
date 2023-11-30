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
                <MaterialCommunityIcons name="content-save-edit-outline" size={24} color="black" onPress={() => console.log('clicked')}/>
            </Pressable>
        </View>
  )//content-save-edit-outline

}

export default ProductItem;