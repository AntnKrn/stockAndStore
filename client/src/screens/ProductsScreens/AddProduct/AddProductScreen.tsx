import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import axios from "axios";

import { style } from "./AddProductStyles";
import ProductsService from "../../../services/ProductsService";

const AddProductScreen = ({navigation}: any) => {

    const [providers, setProviders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);

    const [name, setName] = useState<string>('');
    const [brand, setBrand] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [provider, setProvider] = useState<string>('');
    const [pricePurchase, setPricePurchase] = useState<string>('');
    const [priceSale, setPriceSale] = useState<string>('');
    const [volume, setVolume] = useState<string>('');
    const [weight, setWeigth] = useState<string>('');
    const [dateReceipt, setDateReceipt] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    type RootParamList = {
      AddProductScreen: undefined;
      OtherScreen: 'dsadsa';
      // ... другие экраны
    };

    const handleDonePress = async () => {
      try {
        await ProductsService.postProducts(name, brand, code, quantity, provider, pricePurchase, priceSale, volume, weight, dateReceipt, description)
        alert('Данные успешно добавлены!');
        navigation.navigate('MainTabNavigator', { screen: 'Товары' });
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

    const onChangeBrandHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setBrand(e.nativeEvent.text)
    }

    const onChangeCodeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setCode(e.nativeEvent.text)
    }

    const onChangeQuantityHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setQuantity(e.nativeEvent.text)
    }

    const onChangePricePurchaseHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setPricePurchase(e.nativeEvent.text)
    }

    const onChangePriceSaleHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setPriceSale(e.nativeEvent.text)
    }

    const onChangeVolumeHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setVolume(e.nativeEvent.text)
    }

    const onChangeWeightHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setWeigth(e.nativeEvent.text)
    }

    const onChangeDateReceiptHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setDateReceipt(e.nativeEvent.text);
    }

    const onChangeDescriptionHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setDescription(e.nativeEvent.text)
    }

    const onChangeProviderHandler = (e: any): void => {
      setProvider(e)
    }

    useEffect(() => {
        const sendGetRequest = async() => {
            try {
                const response = await axios.get("http://localhost:3000/providers");
                setProviders(response.data);
                setIsLoaded(true);
                const arrayLabels: string[] = [];
                const arrayValues: number[] = [];
                response.data.map((el: any, index: number) => {
                    arrayLabels.push(el.name);
                    arrayValues.push(el.id);
                })
                setLabels(arrayLabels);
                setValues(arrayValues);
            } catch(err) {
                console.log(err);
            } 
        }
        sendGetRequest();
    }, [])

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
              placeholder="Бренд" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeBrandHandler}
            />
            <TextInput 
              style={style.inputText}
              placeholder="Код" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeCodeHandler}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Количество" 
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeQuantityHandler}
            />
            
            <View style={style.providers as any}>
              <RNPickerSelect
                  style={{placeholder: {
                    color: '#71a2b9'
                }}}
                  placeholder={{label: 'Выберите поставщика', value: null }}
                  onValueChange={onChangeProviderHandler}
                  items={values.map((el: any, index: number) => {
                    return {label: labels[index], value: values[index]}
                  })}></RNPickerSelect>
            </View>

            <TextInput 
            style={style.inputNumber}
            placeholder="Цена покупки" 
            autoCapitalize="none"
            autoCorrect= {false}
            onChange={onChangePricePurchaseHandler}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Цена продажи" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangePriceSaleHandler}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Объем" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeVolumeHandler}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Вес" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeWeightHandler}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Дата поставки" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeDateReceiptHandler}
            />

            <TextInput 
              style={style.inputText}
              placeholder="Описание" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeDescriptionHandler}
            />
            
        </View>
      )
}

export default AddProductScreen;