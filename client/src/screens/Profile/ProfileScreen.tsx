import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { useDispatch } from "react-redux";
import { style } from "./ProfileStyles";
import { logout } from "../../store/actions/authAction";

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const { isAuth } = useTypedSelector(state => state.auth);

  if(!isAuth) {
    navigation.navigate('AuthorizationScreen')
  }

  const onPressHandler = async () => {
      await dispatch<any>(logout());
  }
  return (
        <View style={style.container}>
            <Text>Профиль</Text>
            <Pressable 
              style={style as any} 
              onPress={onPressHandler}>
                <Text style={style.enterText}>Выйти</Text>
            </Pressable>
        </View>
  )
}

export default ProfileScreen;