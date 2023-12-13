import React from "react";
import { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";

import { style } from "../Registration/RegistrationStyles";
import { useDispatch } from "react-redux";
import { registration } from "../../../store/actions/authAction";
import { useTypedSelector } from "../../../hooks/useTypesSelector";
import axios from "axios";

const RegistrationScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { error } = useTypedSelector((state) => state.auth);
  const [login, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setEmail(e.nativeEvent.text);
  };

  const onChangePassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setPassword(e.nativeEvent.text);
  };

  const onPressHandler = async () => {
    await axios
      .post("http://localhost:3000/registration", {
        login: login,
        password: password,
      })
      .then(() => {
        alert("Пользователь успешно зарегистрировался!");
        return navigation.navigate("AuthorizationScreen");
      })
      .catch((err: any) => {
        alert("Пользователь с данным логином уже существует!");
      });
  };
  return (
    <View style={style.container}>
      <Text style={style.authText}>Регистрация</Text>

      <TextInput
        style={style.input}
        placeholder="Логин"
        autoCapitalize="none"
        onChange={onChangeEmail}
        maxLength={20}
      />

      <TextInput
        style={style.input}
        placeholder="Пароль"
        autoCapitalize="none"
        secureTextEntry={true}
        onChange={onChangePassword}
        maxLength={20}
      />

      <Pressable style={style.enter as any} onPress={onPressHandler}>
        <Text style={style.enterText}>Зарегистрироваться</Text>
      </Pressable>

      <Pressable
        style={style.registration as any}
        onPress={() => navigation.navigate("AuthorizationScreen")}
      >
        <Text style={style.registrationText}>Авторизация</Text>
      </Pressable>

      {/* {!error ? <Text>Success</Text> : <Text>Error</Text>} */}
    </View>
  );
};

export default RegistrationScreen;
