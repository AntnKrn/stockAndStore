import React from "react";
import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";

import { style } from "./ViewClientStyles";

type Screen2RouteProp = RouteProp<Record<string, { data: any }>>;

const ViewClientScreen = ({ navigation, props }: any) => {
  const route = useRoute<Screen2RouteProp>();
  const { data } = route.params;

  return (
    <ScrollView style={style.mainView}>
      <View style={style.table}>
        <View style={style.row}>
          <Text style={style.cell}>ФИО</Text>
          <Text style={style.cell}>{data.fullname}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Номер телефона</Text>
          <Text style={style.cell}>{data.phoneNumber}</Text>
        </View>
        <View style={style.row}>
          <Text style={[style.cell, style.cellText]}>Адрес</Text>
          <Text style={style.cell}>{data.address}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewClientScreen;
