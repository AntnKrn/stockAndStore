import React from "react";
import { useState } from "react";
import { Button, NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

import { style } from "./RegistrationStyles";


const RegistrationScreen = ({navigation}: any) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const onChangeEmail = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        setEmail(e.nativeEvent.text);
    }
    const onChangePassword = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
        setPassword(e.nativeEvent.text);
    }
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

            <Pressable 
              style={style.enter as any} 
              onPress={() => navigation.navigate('ProductsScreen')}>
                <Text style={style.enterText}>Зарегистрироваться</Text>
            </Pressable>

            <Pressable 
              style={style.registration as any} 
              onPress={() => navigation.navigate('AuthorizationScreen')}>
                <Text style={style.registrationText}>Авторизация</Text>
            </Pressable>
        </View>
    )
}

export default RegistrationScreen;