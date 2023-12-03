import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, TextInputChangeEventData, NativeSyntheticEvent } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import OrderService from "../../../services/OrderService";

import axios from "axios";

import { style } from "./AddOrderStyles";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>, 'Screen2'>;

const AddOrderScreen = ({navigation, props}: any) => {
    const route = useRoute<Screen2RouteProp>();
    const { data } = route.params;

    const [providers, setProviders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();

    const [clients, setClients] = useState();
    const [labelsForClient, setLabelsForClient] = useState<string[]>([]);
    const [valuesForClients, setValuesForClients] = useState<number[]>([]);
    const [isChangeClient, setIsChangeClient] = useState<boolean>(false);

    const [products, setProducts] = useState();
    const [labelsForProduct, setLabelsForProduct] = useState<string[]>([]);
    const [valuesForProduct, setValuesForProduct] = useState<number[]>([]);
    const [isChangeProduct, setIsChangeProduct] = useState<boolean>(false);

    const [employees, setEmployees] = useState();
    const [labelsForEmployee, setLabelsForEmployee] = useState<string[]>([]);
    const [valuesForEmployee, setValuesForEmployee] = useState<number[]>([]);
    const [isChangeEmployee, setIsChangeEmployee] = useState<boolean>(false);
    //(IDclient, IDproduct, quantity, price, data, IDemployee) 

    const [employee, setEmployee] = useState<string>(data.IDemployee);
    const [product, setProduct] = useState<string>(data.IDproduct);
    const [price, setPrice] = useState<string>(data.price);
    const [date, setDate] = useState<string>(data.data);
    const [quantity, setQuantity] = useState<string>(data.quantity);
    const [client, setClient] = useState<string>(data.IDclient);

    useEffect(() => {
      const sendGetRequest = async() => {
          try {
              const ProductResponse = await axios.get("http://localhost:3000/products");
              const EmployeeResponse = await axios.get("http://localhost:3000/employees");
              const ClientResponse = await axios.get("http://localhost:3000/clients");

              setIsLoaded(true);
              ProductResponse.data.map((el: any, index: number) => {
                if(el.productID === data.IDproduct) {
                  setProduct(el.name)
                }
              })
              EmployeeResponse.data.map((el: any, index: number) => {
                if(el.employeeID === data.IDemployee) {
                  setEmployee(el.fullname)
                }
              })
              ClientResponse.data.map((el: any) => {
                if(el.clientID === data.IDclient) {
                  setClient(el.fullname)
                }
              })
          } catch(err) {
              console.log(err);
          } 
      }
      sendGetRequest();
  }, [])

    const handleDonePress = async () => {
      try {
        await OrderService.patchOrders(data.orderID, data.IDclient, data.IDproduct, quantity, price, data, data.IDemployee)        
        alert('Данные успешно отредактированы!');
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
    

    const onChangePriceHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setPrice(e.nativeEvent.text)
    }

    const onChangeDateHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setDate(e.nativeEvent.text)
    }

    const onChangeQuantityHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
      setQuantity(e.nativeEvent.text)
    }

    const onChangeClientHandler = (e: any): void => {
      console.log(e);
      setIsChangeClient(true);
      setClient(e)
    }

    const onChangeProductHandler = (e: any): void => {
      setIsChangeProduct(true);
      setProduct(e)
    }

    const onChangeEmployeeHandler = (e: any): void => {
      setIsChangeEmployee(true);
      setEmployee(e)
    } 

    useEffect(() => {
        const requestClients = async() => {
            try {
                const response = await axios.get("http://localhost:3000/clients");
                setClients(response.data);
                const arrayLabels: string[] = [];
                const arrayValues: number[] = [];
                response.data.map((el: any, index: number) => {
                    arrayLabels.push(el.fullname);
                    arrayValues.push(el.clientID);
                })
                setLabelsForClient(arrayLabels);
                setValuesForClients(arrayValues);
            } catch(err) {
                console.log(err);
            } 
        }

        const requestProducts = async() => {
          try {
              const response = await axios.get("http://localhost:3000/products");
              setProducts(response.data);
              const arrayLabels: string[] = [];
              const arrayValues: number[] = [];
              response.data.map((el: any, index: number) => {
                  arrayLabels.push(el.name);
                  arrayValues.push(el.productID);
              })
              setLabelsForProduct(arrayLabels);
              setValuesForProduct(arrayValues);
          } catch(err) {
              console.log(err);
          } 
        }

        const requestEmployees = async() => {
          try {
              const response = await axios.get("http://localhost:3000/employees");
              setEmployees(response.data);
              const arrayLabels: string[] = [];
              const arrayValues: number[] = [];
              response.data.map((el: any, index: number) => {
                  arrayLabels.push(el.fullname);
                  arrayValues.push(el.employeeID);
              })
              setLabelsForEmployee(arrayLabels);
              setValuesForEmployee(arrayValues);
          } catch(err) {
              console.log(err);
          } 
        }
        requestProducts();
        requestEmployees();
        requestClients();
        setIsLoaded(true);
    }, [])
    console.log(client)
    return (
        <View style={style.mainView}>
            <View style={style.providers as any}>
              <RNPickerSelect
                value={data.IDclient}
                  style={{placeholder: {
                    color: '#71a2b9'
                }}}
                  placeholder={{label: 'Выберите клиента', value: null }}
                  onValueChange={onChangeClientHandler}
                  items={valuesForClients.map((el: any, index: number) => {
                    return {label: labelsForClient[index], value: valuesForClients[index]}
                  })}></RNPickerSelect>
            </View>

            <View style={style.providers as any}>
              <RNPickerSelect
                value={data.IDproduct}
                  style={{placeholder: {
                    color: '#71a2b9'
                }}}
                  placeholder={{label: 'Выберите товар', value: null }}
                  onValueChange={onChangeProductHandler}
                  items={valuesForProduct.map((el: any, index: number) => {
                    return {label: labelsForProduct[index], value: valuesForProduct[index]}
                  })}></RNPickerSelect>
            </View>

            <TextInput 
              style={style.inputText}
              placeholder="Количество" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangeQuantityHandler}
              value={String(data.quantity)}
            />

            <TextInput 
              style={style.inputText}
              placeholder="Цена" 
              autoCapitalize="none"
              autoCorrect= {false}
              onChange={onChangePriceHandler}
              value={price}
            />

            <TextInput 
            style={style.inputNumber}
            placeholder="Дата доставки" 
            autoCapitalize="none"
            autoCorrect= {false}
            onChange={onChangeDateHandler}
            value={date}
            />

            <View style={style.providers as any}>
              <RNPickerSelect
                value={data.IDemployee}
                  style={{placeholder: {
                    color: '#71a2b9'
                }}}
                  placeholder={{label: 'Выберите работника', value: null }}
                  onValueChange={onChangeEmployeeHandler}
                  items={valuesForEmployee.map((el: any, index: number) => {
                    return {label: labelsForEmployee[index], value: valuesForEmployee[index]}
                  })}></RNPickerSelect>
            </View> 
 
            
        </View>
      )
}

export default AddOrderScreen;