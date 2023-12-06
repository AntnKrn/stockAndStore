import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import axios from "axios";

import { style } from "./EditProviderStyles";
import ProductsService from "../../../services/ProductsService";
import OrderService from "../../../services/OrderService";
import ProviderService from "../../../services/ProvidersService";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>, 'Screen2'>;

const EditProviderScreen = ({navigation, props}: any) => {
    const route = useRoute<Screen2RouteProp>();
    const { data } = route.params;

    const [isLoaded, setIsLoaded] = useState<boolean>();
    console.log(data);
    const [name, setName] = useState<string>(data.name);
    const [phoneNumber, setPhoneNumber] = useState<string>(data.phoneNumber);
    const [category, setCategory] = useState<string>(data.category);
    const [address, setAddress] = useState<any>(data.address);
    const [contactPerson, setContactPerson] = useState<string>(data.contactPerson);
    const [email, setEmail] = useState<string>(data.email);

    const handleDonePress = async () => {
      try {
        await ProviderService.patchProvider(name, phoneNumber, category, address, contactPerson, email, data.id);
        alert('Данные успешно отредактированы!');
        navigation.navigate('Склад', { screen: 'Поставщики' });
      } catch(err) {
        alert(err);
      }
    }

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={handleDonePress}>
            <View style={{ marginRight: 10, color: '#ffffff'} as any}>
              <Text>Готово</Text>
            </View>
          </TouchableOpacity>
        ),
      });
    }, [navigation, handleDonePress]);
    
    const onChangeNameHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setName(e.nativeEvent.text)
    }

    const onChangePhoneNumberHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setPhoneNumber(e.nativeEvent.text)
    }

    const onChangeCategoryHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setCategory(e.nativeEvent.text)
    }

    const onChangeAddressHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setAddress(e.nativeEvent.text)
    }

    const onChangeEmailHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setEmail(e.nativeEvent.text)
    }

    const onChangeContactPersonHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setContactPerson(e.nativeEvent.text)
    }

    return (
        <View style={style.mainView}>
            <TextInput 
              style={style.inputText}
              placeholder='Название'
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeNameHandler}
              value={name}
            />
            <TextInput 
              style={style.inputText}
              placeholder="Номер телефона" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangePhoneNumberHandler}
              value={phoneNumber}
            />

            <TextInput 
              style={style.inputText}
              placeholder='Контактное лицо'
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeContactPersonHandler}
              value={contactPerson}
            />  

            <TextInput 
              style={style.inputText}
              placeholder="Категория" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeCategoryHandler}
              value={category}
            />

            <TextInput 
              style={style.inputText}
              placeholder="Адрес" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeAddressHandler}
              value={address}
            />
            
            <TextInput 
            style={style.inputNumber}
            placeholder="Email" 
            autoCapitalize="none"
            autoCorrect= {false}
            onChange={onChangeEmailHandler}
            value={email}
            />
        </View>
      )
}

export default EditProviderScreen;