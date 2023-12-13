import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";

import { style } from "./ViewOrdersStyles";
import { formateDate } from "../../../helpers/formateDate";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>>;

const ViewOrderScreen = ({ navigation, props }: any) => {
  const route = useRoute<Screen2RouteProp>();
  const { data } = route.params;

  const [isLoaded, setIsLoaded] = useState<boolean>();
  const [product, setProduct] = useState();
  const [employee, setEmployee] = useState();

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const ProductResponse = await axios.get(
          "http://localhost:3000/products"
        );
        const EmployeeResponse = await axios.get(
          "http://localhost:3000/employees"
        );
        setIsLoaded(true);
        ProductResponse.data.map((el: any, index: number) => {
          if (el.productID === data.IDproduct) {
            setProduct(el.name);
          }
        });
        EmployeeResponse.data.map((el: any, index: number) => {
          if (el.employeeID === data.IDemployee) {
            setEmployee(el.fullname);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    sendGetRequest();
  }, []);

  return (
    <ScrollView style={style.mainView}>
      <View style={style.table}>
        <View style={style.row}>
          <Text style={style.cell}>Клиент</Text>
          <Text style={style.cell}>{data.clientName}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Товар</Text>
          <Text style={style.cell}>{product}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Количество</Text>
          <Text style={style.cell}>{data.quantity}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Цена</Text>
          <Text style={style.cell}>{data.price}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Дата доставки</Text>
          <Text style={style.cell}>{formateDate(data.data)}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Оформил</Text>
          <Text style={style.cell}>{employee}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewOrderScreen;
