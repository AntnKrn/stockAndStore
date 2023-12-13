import React, { useContext, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { useDispatch } from "react-redux";
import { style } from "./ProfileStyles";
import { logout } from "../../store/actions/authAction";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const { isAuth, userData } = useTypedSelector((state) => state.auth);
  const [fullname, setFullname] = useState();
  const getUsers = async () => {
    try {
      const responseUsers = await axios.get("http://localhost:3000/users/", {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      });
      const responseEmployees = await axios.get(
        "http://localhost:3000/employees"
      );

      responseUsers.data.map((el: any) => {
        responseEmployees.data.map((elE: any) => {
          if (elE.IDuser === userData.user.id) {
            setFullname(elE.fullname);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onPressEmployee = () => {
    navigation.navigate("EmployeesScreen");
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!isAuth) {
    return navigation.replace("AuthorizationScreen");
  }

  const onPressHandler = async () => {
    await dispatch<any>(logout());
  };

  const onPressClients = async () => {
    navigation.navigate("ClientsScreen");
  };

  return (
    <View style={style.container}>
      <View style={style.info}>
        <Text style={{ fontSize: 35, fontWeight: "bold" }}>
          {userData.user.login}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{fullname}</Text>
        <Text style={{ fontSize: 17 }}>{userData.user.role}</Text>
        {userData.user.role !== "user" ? (
          <Pressable onPress={onPressEmployee}>
            <Text style={{ margin: 50 }}>Сотрудники</Text>
          </Pressable>
        ) : null}
        {userData.user.role !== "user" ? (
          <Pressable onPress={onPressClients}>
            <Text style={{ margin: 50 }}>Клиенты</Text>
          </Pressable>
        ) : null}
      </View>
      <Pressable style={style as any} onPress={onPressHandler}>
        <Text style={style.enterText}>Выйти</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;
