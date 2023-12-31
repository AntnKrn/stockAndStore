import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { style } from "./OrderItemStyles";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { formateDate } from "../../helpers/formateDate";

const OrderItem = (props: any) => {
  const { userData } = useTypedSelector((state) => state.auth);

  return (
    <View style={style.container}>
      <View>
        <Text style={style.pic}>{props.pic}</Text>
      </View>
      <View>
        <Text style={style.codeAndName}>
          {props.clientName === null ? "Клиент удален" : props.clientName}
        </Text>
        <Text>
          {formateDate(props.data)} • {props.price}
        </Text>
      </View>
      <Pressable style={style.edit}>
        <MaterialCommunityIcons
          style={style.icon}
          name="eye"
          size={24}
          color="black"
          onPress={props.onPressViewHandler}
        />
        {userData?.user?.role !== "user" ? (
          <MaterialCommunityIcons
            style={style.icon}
            name="content-save-edit-outline"
            size={24}
            color="black"
            onPress={props.onPressEditHandler}
          />
        ) : null}
        {userData?.user?.role !== "user" ? (
          <MaterialCommunityIcons
            style={style.icon}
            name="delete"
            size={24}
            color="black"
            onPress={props.onPressDeleteHandler}
          />
        ) : null}
      </Pressable>
    </View>
  ); //content-save-edit-outline
};

export default OrderItem;
