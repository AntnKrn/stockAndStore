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
import { RouteProp, useRoute } from "@react-navigation/native";
import OrderService from "../../../services/OrderService";

import axios from "axios";

import { style } from "./EditClientStyles";
import ClientsService from "../../../services/ClientsService";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>, "Screen2">;

const EditClientScreen = ({ navigation, props }: any) => {
  const route = useRoute<Screen2RouteProp>();
  const { data } = route.params;

  const [fullname, setFullname] = useState<string>(data.fullname);
  const [phoneNumber, setPhoneNumber] = useState<string>(data.phoneNumber);
  const [address, setAddress] = useState<string>(data.address);

  const handleDonePress = async () => {
    try {
      await ClientsService.patchClients(
        data.clientID,
        fullname,
        phoneNumber,
        address
      );
      alert("Данные успешно отредактированы!");
      navigation.navigate("ClientsScreen");
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

  const onChangeFullname = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setFullname(e.nativeEvent.text);
  };

  const onChangePhoneNumber = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setPhoneNumber(e.nativeEvent.text);
  };

  const onChangeAddress = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setAddress(e.nativeEvent.text);
  };

  return (
    <View style={style.mainView}>
      <TextInput
        style={style.inputText}
        placeholder="ФИО"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeFullname}
        value={fullname}
      />

      <TextInput
        style={style.inputText}
        placeholder="Номер телефона"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangePhoneNumber}
        value={phoneNumber}
      />

      <TextInput
        style={style.inputNumber}
        placeholder="Адрес"
        autoCapitalize="none"
        autoCorrect={false}
        onChange={onChangeAddress}
        value={address}
      />
    </View>
  );
};

export default EditClientScreen;
