import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";

import { style } from "./AddProviderStyles";
import ProviderService from "../../../services/ProvidersService";

const AddProviderScreen = ({navigation}: any) => {
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [contactPerson, setContactPerson] = useState<string>('');
    const [email, setEmail] = useState<string>('');
 
    const handleDonePress = async () => {
      try {
        await ProviderService.postProvider(name, phoneNumber, category, address, contactPerson, email)
        alert('Данные успешно добавлены!');
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
              placeholder="Название" 
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
              placeholder="Категория" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeCategoryHandler}
              value={category}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Адрес" 
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeAddressHandler}
              value={address}
            />

            <TextInput 
            style={style.inputNumber}
            placeholder="Контактное лицо" 
            autoCapitalize="none"
            autoCorrect= {false}
            onChange={onChangeContactPersonHandler}
            value={contactPerson}
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

export default AddProviderScreen;