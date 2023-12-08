import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { connect, useDispatch, useSelector } from 'react-redux';

import { style } from "../Authorization/AuthorizationStyles";
import { fetchUserData } from "../../../store/actions/authAction";
import { useTypedSelector } from "../../../hooks/useTypesSelector";


const AuthorizationScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const {userData, isAuth, error} = useTypedSelector(state => state.auth);

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeLogin = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        setLogin(e.nativeEvent.text);
  }
  const onChangePassword = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        setPassword(e.nativeEvent.text);
  }

  const onPressHandler = async() => {
    return await dispatch<any>(fetchUserData(login, password));
  }

  useEffect(() => {
    if (isAuth) {
      return navigation.replace('Склад', { screen: 'Товары' });
    }
  }, [isAuth]);

  return (
        <View style={style.container}>
            <Text style={style.authText}>Авторизация</Text>

            <TextInput 
              style={style.input} 
              placeholder="Логин" 
              autoCapitalize="none"
              onChange={onChangeLogin} 
              maxLength={20}
              value={login}
            />

            <TextInput 
              style={style.input} 
              placeholder="Пароль" 
              autoCapitalize="none"
              secureTextEntry={true}
              onChange={onChangePassword} 
              maxLength={20}
              value={password}
            />

            <Pressable 
              style={style.enter as any} 
              onPress={onPressHandler}>
                <Text style={style.enterText}>Войти</Text>
            </Pressable>

            <Pressable 
              style={style.registration as any} 
              onPress={() => navigation.navigate('RegistrationScreen')}>
                <Text style={style.registrationText}>Регистрация</Text>
            </Pressable>
        </View>
  )
}

export default AuthorizationScreen;