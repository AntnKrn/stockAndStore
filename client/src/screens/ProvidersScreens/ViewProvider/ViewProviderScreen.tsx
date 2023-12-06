import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent, ScrollView } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import axios from "axios";

import { style } from "./ViewProductStyles";
import ProductsService from "../../../services/ProductsService";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>>;

const ViewProviderScreen = ({navigation, props}: any) => {
    const route = useRoute<Screen2RouteProp>();
    const { data } = route.params;

    const [providers, setProviders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [provider, setProvider] = useState();
  

    useEffect(() => {
        const sendGetRequest = async() => {
            try {
                const response = await axios.get("http://localhost:3000/providers");
                setProviders(response.data);
                setIsLoaded(true);
                response.data.map((el: any, index: number) => {
                  if(el.id === data.IDprovider) {
                    setProvider(el.name)
                  }
                })
            } catch(err) {
                console.log(err);
            } 
        }
        sendGetRequest();
    }, [])

    return (
      <ScrollView style={style.mainView}>
        <View style={style.table}>
          <View style={style.row}>
            <Text style={style.cell}>Название</Text>
            <Text style={style.cell}>{data.name}</Text>
          </View>
          <View style={style.row}>
            <Text style={[style.cell, style.cellText]}>Номер телефона</Text>
            <Text style={style.cell}>{data.phoneNumber}</Text>
          </View>
          <View style={style.row}>
            <Text style={[style.cell, style.cellText]}>Категория</Text>
            <Text style={style.cell}>{data.category}</Text>
          </View>
          <View style={style.row}>
            <Text style={[style.cell, style.cellText]}>Адрес</Text>
            <Text style={style.cell}>{data.address}</Text>
          </View>
          <View style={style.row}>
            <Text style={[style.cell, style.cellText]}>Контактное лицо</Text>
            <Text style={style.cell}>{data.contactPerson}</Text>
          </View>
          <View style={style.row}>
            <Text style={[style.cell, style.cellText]}>Почта</Text>
            <Text style={style.cell}>{data.email}</Text>
          </View>
        </View>
      </ScrollView>
      )
}

export default ViewProviderScreen;