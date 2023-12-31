import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import axios from "axios";

import { style } from "./ViewProductStyles";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>>;

const ViewProductScreen = ({ navigation, props }: any) => {
  const route = useRoute<Screen2RouteProp>();
  const { data } = route.params;

  const [providers, setProviders] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>();
  const [provider, setProvider] = useState<any>();
  const [formatedDate, setFormatedDate] = useState<string>();

  const formateDate = (date: Date) => {
    const date_ = new Date(date);
    return `${date_.getFullYear()}-${date_.getMonth() + 1}-${date_.getDate()}`;
  };

  useEffect(() => {
    const sendGetRequest = async () => {
      try {
        const response = await axios.get("http://localhost:3000/providers");
        setProviders(response.data);
        setIsLoaded(true);
        response.data.map((el: any, index: number) => {
          if (el.id === data.IDprovider) {
            setProvider(el.name);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    setFormatedDate(formateDate(data.dateReceipt));
    sendGetRequest();
  }, []);

  return (
    <ScrollView style={style.mainView}>
      <View style={style.table}>
        <View style={style.row}>
          <Text style={style.cell}>Название</Text>
          <Text style={style.cell}>{data.name}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Бренд</Text>
          <Text style={style.cell}>{data.brand}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Код</Text>
          <Text style={style.cell}>{data.code}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Количество</Text>
          <Text style={style.cell}>{data.quantity}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Поставщик</Text>
          {!provider ? (
            <Text style={style.cell}>Поставщик удален</Text>
          ) : (
            <Text style={style.cell}>{provider}</Text>
          )}
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Цена закупки</Text>
          <Text style={style.cell}>{data.pricePurchase}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Цена продажи</Text>
          <Text style={style.cell}>{data.priceSale}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Объем</Text>
          <Text style={style.cell}>{data.volume}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Вес</Text>
          <Text style={style.cell}>{data.weight}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Дата поставки</Text>
          <Text style={style.cell}>{formatedDate}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Описание</Text>
          <Text style={style.cell}>{data.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewProductScreen;
