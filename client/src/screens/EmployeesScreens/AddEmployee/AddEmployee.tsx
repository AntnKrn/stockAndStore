import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";

import { style } from "./AddEmployeeStyles";
import OrderService from "../../../services/OrderService";
import { useTypedSelector } from "../../../hooks/useTypesSelector";

const AddEmployeeScreen = ({ navigation }: any) => {
  const { userData } = useTypedSelector((state) => state.auth);

  const [isLoaded, setIsLoaded] = useState<boolean>();

  const [clientLabels, setClientLabels] = useState<string[]>([]);
  const [clientValues, setClientValues] = useState<number[]>([]);

  const [productsLabels, setProductsLabels] = useState<string[]>([]);
  const [productsValues, setProductsValues] = useState<number[]>([]);

  const [IDclient, setIDclient] = useState<string>("");
  const [IDproduct, setIDproduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [IDemployee, setIDemployee] = useState<string>("");
  const [products, setProducts] = useState<any>();
  const [maxQuantity, setMaxQuantity] = useState<number>(1);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleDonePress = async () => {
    try {
      await OrderService.postOrder(
        IDclient,
        IDproduct,
        quantity,
        price,
        date,
        IDemployee
      );
      alert("Данные успешно добавлены!");
      navigation.navigate("Склад", { screen: "Заказы" });
    } catch (err) {
      alert(err);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDonePress}>
          <View style={{ marginRight: 10, color: "#ffffff" } as any}>
            <Text>Готово</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleDonePress]);

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const clientsResponse = await axios.get(
          "http://localhost:3000/clients"
        );
        const productsResponse = await axios.get(
          "http://localhost:3000/products"
        );
        const employeeResponse = await axios.get(
          "http://localhost:3000/employees"
        );
        setProducts(productsResponse.data);
        employeeResponse.data.map((el: any, index: number) => {
          if (el.IDuser === userData.user.id) {
            setIDemployee(el.employeeID);
          }
        });
        const clietnsArrayLabels: string[] = [];
        const clientsArrayValues: number[] = [];
        clientsResponse.data.map((el: any, index: number) => {
          clietnsArrayLabels.push(el.fullname);
          clientsArrayValues.push(el.clientID);
        });

        const productsArrayLabels: string[] = [];
        const productsArrayValues: number[] = [];
        productsResponse.data.map((el: any, index: number) => {
          productsArrayLabels.push(el.name);
          productsArrayValues.push(el.productID);
        });

        setProductsLabels(productsArrayLabels);
        setProductsValues(productsArrayValues);
        setClientLabels(clietnsArrayLabels);
        setClientValues(clientsArrayValues);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
      setDate(
        `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`
      );
    };
    sendGetRequest();
  }, []);

  useEffect(() => {
    products?.map((el: any) => {
      if (el.productID == IDproduct) {
        setMaxQuantity(el.quantity);
      }
    });
  }, [IDproduct]);

  const onChangeIDclientHandler = (e: any): void => {
    setIDclient(e);
  };

  const onChangeIDproductHandler = (e: any): void => {
    const selectedProduct = products.find(
      (product: any) => product.productID === e
    );
    if (selectedProduct) {
      setMaxQuantity(selectedProduct.quantity);
    }
    setIDproduct(e);
  };

  const onChangeQuantityHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const parsedQty = Number(e.nativeEvent.text);
    if (Number.isNaN(parsedQty) || parsedQty > maxQuantity) {
      setQuantity("");
      alert("Недостаточно товара!");
    } else {
      setQuantity(parsedQty.toString());
    }
  };

  const onChangePriceHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const number: any = e.nativeEvent.text;

    const numericValue = number.replace(/[^0-9.]/g, "");

    const parts = numericValue.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1];

    if (decimalPart && decimalPart.length > 2) {
      decimalPart = decimalPart.slice(0, 2);
    }

    if (integerPart.length > 4) {
      integerPart = integerPart.slice(0, 4);
    }

    const formattedNumericValue =
      decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;

    setPrice(formattedNumericValue);
  };

  const onChangeDate = (event: Event, date?: any) => {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    setDate(date);
    setDate(formatedDate);
  };
  console.log(date);
  return (
    <View style={style.mainView}>
      <View style={style.providers as any}>
        <RNPickerSelect
          style={{
            placeholder: {
              color: "#71a2b9",
            },
          }}
          placeholder={{ label: "Выберите клиента", value: null }}
          onValueChange={onChangeIDclientHandler}
          items={clientValues.map((el: any, index: number) => {
            return { label: clientLabels[index], value: clientValues[index] };
          })}
        ></RNPickerSelect>
      </View>

      <View style={style.providers as any}>
        <RNPickerSelect
          style={{
            placeholder: {
              color: "#71a2b9",
            },
          }}
          placeholder={{ label: "Выберите товар", value: null }}
          onValueChange={onChangeIDproductHandler}
          items={productsValues.map((el: any, index: number) => {
            return {
              label: productsLabels[index],
              value: productsValues[index],
            };
          })}
        ></RNPickerSelect>
      </View>

      <TextInput
        style={style.inputText}
        placeholder="Количество"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeQuantityHandler}
        value={quantity}
      />

      <TextInput
        style={style.inputNumber}
        placeholder="Цена"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangePriceHandler}
        value={price}
      />

      <DateTimePicker
        style={{ paddingTop: 30 }}
        value={currentDate}
        mode="date"
        display="spinner"
        onChange={(e: any, date?: Date) => onChangeDate(e, date)}
      />
    </View>
  );
};

export default AddEmployeeScreen;
