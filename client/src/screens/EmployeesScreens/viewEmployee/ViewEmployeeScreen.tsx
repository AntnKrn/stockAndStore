import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";

import { style } from "./ViewEmployeeStyles";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>>;

const ViewEmployeeScreen = ({ navigation, props }: any) => {
  const route = useRoute<Screen2RouteProp>();
  const { data } = route.params;

  const [thisEmployee, setThisEmployee] = useState();

  useEffect(() => {
    const getRole = async () => {
      const response = await axios.get("http://localhost:3000/users");
      response.data.map((el: any) => {
        if (data.IDuser === el.userID) {
          setThisEmployee(el.role);
        }
      });
    };
    getRole();
  }, []);

  return (
    <ScrollView style={style.mainView}>
      <View style={style.table}>
        <View style={style.row}>
          <Text style={style.cell}>ФИО</Text>
          <Text style={style.cell}>{data.fullname}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Должность</Text>
          <Text style={style.cell}>{data.position}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Номер паспорта</Text>
          <Text style={style.cell}>{data.passportNumber}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Почта</Text>
          <Text style={style.cell}>{data.email}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Роль</Text>
          <Text style={style.cell}>{thisEmployee}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewEmployeeScreen;
