import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from "react-native";

import { style } from "./AddClientStyles";
import { useTypedSelector } from "../../../hooks/useTypesSelector";
import ClientsService from "../../../services/ClientsService";

const AddClientScreen = ({ navigation }: any) => {
  const [fullname, setFullname] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleDonePress = async () => {
    try {
      await ClientsService.postClient(fullname, phoneNumber, address);
      alert("Данные успешно добавлены!");
      navigation.navigate("ClientsScreen");
    } catch (err) {
      alert("dassad");
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

export default AddClientScreen;
