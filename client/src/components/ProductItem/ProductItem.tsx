import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

import {style} from './ProductItemStyles'

const ProductItem = () => {
  return (
        <View style={style.container}>
            <Text style={style.pic}>АР</Text>
            <Text style={style.code}>001</Text>
            <Text style={style.name}>Арахис</Text>
            <Text style={style.quantity}>1</Text>
        </View>
  )
}

export default ProductItem;