import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

import axios from "axios";

import { style } from "./AddOrderStyles";
import ProductsService from "../../../services/ProductsService";
import OrderService from "../../../services/OrderService";
import { useTypedSelector } from "../../../hooks/useTypesSelector";

const AddOrderScreen = ({navigation}: any) => {
    const {userData} = useTypedSelector(state => state.auth);

    const [isLoaded, setIsLoaded] = useState<boolean>();
    
    const [clientLabels, setClientLabels] = useState<string[]>([]);
    const [clientValues, setClientValues] = useState<number[]>([]);

    const [productsLabels, setProductsLabels] = useState<string[]>([]);
    const [productsValues, setProductsValues] = useState<number[]>([]);


    const [IDclient, setIDclient] = useState<string>('');
    const [IDproduct, setIDproduct] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [IDemployee, setIDemployee] = useState<string>('');

    const handleDonePress = async () => {
      try {
        await OrderService.postOrder(IDclient, IDproduct, quantity, price, date, IDemployee);
        alert('Данные успешно добавлены!');
        navigation.navigate('Склад', { screen: 'Заказы' });
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
    
  
    useEffect(() => {
        const sendGetRequest = async() => {
            try {
                const clientsResponse = await axios.get("http://localhost:3000/clients");
                const productsResponse = await axios.get("http://localhost:3000/products");
                const employeeResponse = await axios.get("http://localhost:3000/employees");
                employeeResponse.data.map((el: any, index: number) => {
                  if(el.IDuser == userData.user.id) {
                    setIDemployee(el.employeeID);
                    console.log('dsadsa', IDemployee)
                  }
                })
                const clietnsArrayLabels: string[] = [];
                const clientsArrayValues: number[] = [];
                clientsResponse.data.map((el: any, index: number) => {
                    clietnsArrayLabels.push(el.fullname);
                    clientsArrayValues.push(el.clientID);
                })

                const productsArrayLabels: string[] = [];
                const productsArrayValues: number[] = [];
                productsResponse.data.map((el: any, index: number) => {
                    productsArrayLabels.push(el.name);
                    productsArrayValues.push(el.productID);
                })

                setProductsLabels(productsArrayLabels);
                setProductsValues(productsArrayValues);
                setClientLabels(clietnsArrayLabels);
                setClientValues(clientsArrayValues);
                setIsLoaded(true);
            } catch(err) {
                console.log(err);
            } 
        }
        sendGetRequest();
    }, [])

    const onChangeIDclientHandler = (e: any): void => {
      setIDclient(e)
    }

    const onChangeIDproductHandler = (e: any): void => {
      setIDproduct(e)
    }

    const onChangeQuantityHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setQuantity(e.nativeEvent.text)
    }

    const onChangePriceHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setPrice(e.nativeEvent.text)
    }
    const onChangeDataHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setDate(e.nativeEvent.text)
    }
    console.log(date);
    return (
        <View style={style.mainView}>
          <View style={style.providers as any}>
              <RNPickerSelect
                  style={{placeholder: {
                    color: '#71a2b9'
                }}}
                  placeholder={{label: 'Выберите клиента', value: null }}
                  onValueChange={onChangeIDclientHandler}
                  items={clientValues.map((el: any, index: number) => {
                    return {label: clientLabels[index], value: clientValues[index]}
                  })}></RNPickerSelect>
            </View>

            <View style={style.providers as any}>
              <RNPickerSelect
                  style={{placeholder: {
                    color: '#71a2b9'
                }}}
                  placeholder={{label: 'Выберите товар', value: null }}
                  onValueChange={onChangeIDproductHandler}
                  items={productsValues.map((el: any, index: number) => {
                    return {label: productsLabels[index], value: productsValues[index]}
                  })}></RNPickerSelect>
            </View>

            <TextInput 
              style={style.inputText}
              placeholder="Количество" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeQuantityHandler}
            />

            <TextInput 
              style={style.inputText}
              placeholder="Дата" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeDataHandler}
            />

            <TextInput 
              style={style.inputNumber}
              placeholder="Цена" 
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangePriceHandler}
            />
        </View>
      )
}

export default AddOrderScreen;