import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { useDispatch } from "react-redux";
import { style } from "./ProfileStyles";
import { logout } from "../../store/actions/authAction";
import EmployeesService from "../../services/EmployeesService";
import axios from "axios";

const ProfileScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  const { isAuth, userData } = useTypedSelector(state => state.auth);
  const [fullname, setFullname] = useState();

  const getUsers = async() => {
    try {
      const response = await EmployeesService.fetchUsers();
      response.data.map((el: any) => {
        if(el.IDuser === userData.user.id) {
          setFullname(el.fullname);
        }
      })
    } catch(err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUsers();
  }, [])
  
  if(!isAuth) {
    return navigation.replace('AuthorizationScreen')
  }

  console.log(userData);
  const onPressHandler = async () => {
      await dispatch<any>(logout());
  } 
  return (
        <View style={style.container}>
          <View style={style.info}>
            <Text style={{fontSize: 35, fontWeight: 'bold'}}>{userData.user.login}</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Пышко Илья Викторович</Text>
            <Text style={{ fontSize: 17 }}>Администратор</Text>
            {userData.user.role === "user" ? <Text style={{margin: 50}}>Удалить пользователя</Text> : null}
            {userData.user.role === "user" ? <Text style={{margin: 50}}>Изменить роль работнику</Text> : null}
          </View>
          <Pressable 
            style={style as any} 
            onPress={onPressHandler}>
            <Text style={style.enterText}>Выйти</Text>
          </Pressable>
        </View>
  )
}

export default ProfileScreen;