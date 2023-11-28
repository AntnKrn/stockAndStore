import React from "react";
import { useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

import { style } from "./AuthorizationStyles";

const AuthorizationScreen = ({navigation}: any) => {
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
            <Text style={style.authText}>Авторизация</Text>

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