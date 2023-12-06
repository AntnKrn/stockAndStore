import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import axios from "axios";

import { style } from "./EditProductStyles";
import ProductsService from "../../../services/ProductsService";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>, 'Screen2'>;

const EditProductScreen = ({navigation, props}: any) => {
    const route = useRoute<Screen2RouteProp>();
    const { data } = route.params;

    const [providers, setProviders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);

    const [name, setName] = useState<string>(data.name);
    const [brand, setBrand] = useState<string>(data.brand);
    const [code, setCode] = useState<string>(data.code);
    const [quantity, setQuantity] = useState<any>(data.quantity);
    const [provider, setProvider] = useState<string>(data.provider);
    const [pricePurchase, setPricePurchase] = useState<string>(data.pricePurchase);
    const [priceSale, setPriceSale] = useState<string>(data.priceSale);
    const [volume, setVolume] = useState<string>(data.volume);
    const [weight, setWeigth] = useState<string>(data.weight);
    const [dateReceipt, setDateReceipt] = useState<string>(data.dateReceipt);
    const [description, setDescription] = useState<string>(data.description);

    const handleDonePress = async () => {
      try {
        await ProductsService.patchProducts(data.productID, name, brand, code, quantity, provider, pricePurchase, priceSale, volume, weight, dateReceipt, description)
        alert('Данные успешно отредактированы!');
        navigation.navigate('Склад', { screen: 'Товары' });
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
              placeholder='Название'
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
              value={brand}
            />
            <TextInput 
              style={style.inputText}
              placeholder="Код" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeCodeHandler}
              value={code}
            />

            <TextInput 
              style={style.inputText}
              placeholder="Количество" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeQuantityHandler}
              value={String(quantity)}
            />
            
            <View style={style.providers as any}>
              <RNPickerSelect
                value={data.IDprovider}
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
            value={pricePurchase}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Цена продажи" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangePriceSaleHandler}
              value={priceSale}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Объем" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeVolumeHandler}
              value={volume}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Вес" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeWeightHandler}
              value={weight}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Дата поставки" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeDateReceiptHandler}
              value={dateReceipt}
            />

            <TextInput 
              style={style.inputText}
              placeholder="Описание" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeDescriptionHandler}
              value={description}
            />
            
        </View>
      )
}

export default EditProductScreen;