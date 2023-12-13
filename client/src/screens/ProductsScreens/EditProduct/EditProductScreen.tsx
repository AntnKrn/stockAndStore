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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";

import { style } from "./EditProductStyles";
import ProductsService from "../../../services/ProductsService";
import { Animated } from "react-native";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>, "Screen2">;

const EditProductScreen = ({ navigation, props }: any) => {
  const route = useRoute<Screen2RouteProp>();
  const { data } = route.params;

  const formateDate = (date: Date) => {
    const date_ = new Date(date);
    return `${date_.getFullYear()}-${date_.getMonth() + 1}-${date_.getDate()}`;
  };
  const [date, setDate] = useState<Date>(new Date());
  const [providers, setProviders] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>();
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const [name, setName] = useState<string>(data.name);
  const [brand, setBrand] = useState<string>(data.brand);
  const [code, setCode] = useState<string>(data.code);
  const [quantity, setQuantity] = useState<any>(data.quantity);
  const [provider, setProvider] = useState<string>(data.provider);
  const [pricePurchase, setPricePurchase] = useState<string>(
    data.pricePurchase
  );
  const [priceSale, setPriceSale] = useState<string>(data.priceSale);
  const [volume, setVolume] = useState<string>(data.volume);
  const [weight, setWeigth] = useState<string>(data.weight);
  const [dateReceipt, setDateReceipt] = useState<string>(
    formateDate(data.dateReceipt)
  );
  const [description, setDescription] = useState<string>(data.description);
  const [meters, setMetrs] = useState<number>(0);

  const getMeters = async () => {
    const responseProducts = await axios.get("http://localhost:3000/products");
    let metrs_ = 0;
    responseProducts.data.map((el: any) => {
      metrs_ += el.volume * el.quantity;
    });
    setMetrs(metrs_);
  };

  const handleDonePress = async () => {
    try {
      console.log(meters);
      if (Number(quantity) * Number(volume) > 850 - meters) {
        alert("Невозможно изменить товар. Склад будет перегружен");
        return;
      }
      await ProductsService.patchProducts(
        data.productID,
        name,
        brand,
        code,
        quantity,
        provider,
        pricePurchase,
        priceSale,
        volume,
        weight,
        dateReceipt,
        description
      );
      alert("Данные успешно отредактированы!");

      navigation.navigate("Склад", { screen: "Товары" });
    } catch (err: any) {
      alert("Данные с таким кодом уже существуют!");
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

  const onChangeNameHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setName(e.nativeEvent.text);
  };

  const onChangeBrandHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setBrand(e.nativeEvent.text);
  };

  const onChangeCodeHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setCode(e.nativeEvent.text);
  };

  const onChangeQuantityHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    const number: any = e.nativeEvent.text;
    const numericValue = number.replace(/[^0-9]/g, "");
    setQuantity(numericValue);
  };

  const onChangePricePurchaseHandler = (
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

    setPricePurchase(formattedNumericValue);
  };

  const onChangePriceSaleHandler = (
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

    setPriceSale(formattedNumericValue);
  };

  const onChangeVolumeHandler = (
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

    if (integerPart.length > 3) {
      integerPart = integerPart.slice(0, 3);
    }

    const formattedNumericValue =
      decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;

    setVolume(formattedNumericValue);
  };

  const onChangeWeightHandler = (
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

    setWeigth(formattedNumericValue);
  };

  const onChangeDescriptionHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setDescription(e.nativeEvent.text);
  };

  const onChangeProviderHandler = (e: any): void => {
    setProvider(e);
  };

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await axios.get("http://localhost:3000/providers");
        setProviders(response.data);
        setIsLoaded(true);
        const arrayLabels: string[] = [];
        const arrayValues: number[] = [];
        response.data.map((el: any, index: number) => {
          arrayLabels.push(el.name);
          arrayValues.push(el.id);
        });
        setLabels(arrayLabels);
        setValues(arrayValues);
        setDateReceipt(
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        );
      } catch (err) {
        console.log(err);
      }
    };
    sendGetRequest();
    getMeters();
  }, []);

  const onChangeDate = (event: Event, date?: any) => {
    const formatedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    setDate(date);
    setDateReceipt(formatedDate);
  };

  return (
    <View style={style.mainView}>
      <TextInput
        style={style.inputText}
        placeholder="Название"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeNameHandler}
        value={name}
        maxLength={100}
      />
      <TextInput
        style={style.inputText}
        placeholder="Бренд"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeBrandHandler}
        value={brand}
        maxLength={20}
      />
      <TextInput
        style={style.inputText}
        placeholder="Код"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeCodeHandler}
        value={code}
        maxLength={10}
      />

      <TextInput
        style={style.inputText}
        placeholder="Количество"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeQuantityHandler}
        value={String(quantity)}
      />

      <View style={style.providers as any}>
        <RNPickerSelect
          value={data.IDprovider}
          style={{
            placeholder: {
              color: "#71a2b9",
            },
          }}
          placeholder={{ label: "Выберите поставщика", value: null }}
          onValueChange={onChangeProviderHandler}
          items={values.map((el: any, index: number) => {
            return { label: labels[index], value: values[index] };
          })}
        ></RNPickerSelect>
      </View>

      <TextInput
        style={style.inputNumber}
        placeholder="Цена покупки"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangePricePurchaseHandler}
        value={pricePurchase}
      />

      <TextInput
        style={style.inputNumber}
        placeholder="Цена продажи"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangePriceSaleHandler}
        value={priceSale}
      />

      <TextInput
        style={style.inputNumber}
        placeholder="Объем"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeVolumeHandler}
        value={volume}
      />

      <TextInput
        style={style.inputNumber}
        placeholder="Вес"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeWeightHandler}
        value={weight}
      />

      <TextInput
        style={style.inputText}
        placeholder="Описание"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeDescriptionHandler}
        value={description}
        maxLength={299}
      />

      <DateTimePicker
        style={{ paddingTop: 30 }}
        value={date}
        mode="date"
        display="spinner"
        onChange={(e: any, date?: Date) => onChangeDate(e, date)}
      />
    </View>
  );
};

export default EditProductScreen;
