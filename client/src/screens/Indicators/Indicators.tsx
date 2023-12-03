import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

import { style } from "./IndicatorsStyles";
import {Grafic} from '../../components/Grafic/Grafic';

const IndicatorsScreen = ({navigation}: any) => {
  return (
        <View style={style.container}>
            <Text style={{ alignSelf: 'center' }}>Продажи</Text>
            <Grafic />
            <View style={style.quantitySumContainer}>
              <View>
                <Text>Количество</Text>
                <Text style={{ alignSelf: 'center' }}>39</Text>
              </View>
              <View>
                <Text>Сумма</Text>
                <Text style={{ alignSelf: 'center' }}>8934</Text>
              </View>
              <View>
                <Text>Затрачено</Text>
                <Text style={{ alignSelf: 'center' }}>7843</Text>
              </View>
              <View>
                <Text>Прибыль</Text>
                <Text style={{ alignSelf: 'center' }}>321</Text>
              </View>
            </View>
            <View style={{alignSelf: 'center', paddingVertical: 80}}>
              <Text>Заполненность склада</Text>
              <Text style={{ alignSelf: 'center' }}>89m^3 из 150m^3</Text>
            </View>
            <Text style={{ alignSelf: 'center' }}>Проданные товары  &gt;</Text>
        </View>
  )
}

export default IndicatorsScreen;