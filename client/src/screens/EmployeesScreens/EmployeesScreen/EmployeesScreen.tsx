import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
} from "react-native";
import axios from "axios";

import { style } from "./EmployeesStyles";
import SearchField from "../../../components/Search/Search";
import { useIsFocused } from "@react-navigation/native";
import OrderService from "../../../services/OrderService";
import EmployeeItem from "../../../components/EmployeeItem/EmployeeItem";

const EmployeesScreen = ({ navigation }: any) => {
  const [employees, setEmployees] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  console.log("dsadsda");
  const isFocused = useIsFocused();

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees/");
      setEmployees(response.data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused || refresh) {
      getEmployees();
    }
  }, [isFocused, refresh]);

  const onPressDeleteHandler = async (id: number) => {
    await OrderService.deleteOrder(id);
    setRefresh(true);
  };

  const onPressViewHandler = (employee: any) => {
    navigation.navigate("ViewEmployeeScreen", { data: employee });
  };

  const onPressEditHandler = (order: any) => {
    navigation.navigate("EditOrderScreen", { data: order });
  };

  const onPressAddHandler = () => {
    navigation.navigate("AddOrderScreen");
  };
  return (
    <ScrollView style={style.mainView}>
      <SearchField
        onPress={onPressAddHandler}
        onChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setSearchText(e.nativeEvent.text)
        }
      />

      {isLoaded
        ? employees.map((el: any, index: number) => {
            return (
              <EmployeeItem
                key={index}
                fullname={el.fullname}
                position={el.position}
                pic={index}
                onPressEditHandler={() => onPressEditHandler(el)}
                onPressDeleteHandler={() => onPressDeleteHandler(el.employeeID)}
                onPressViewHandler={() => onPressViewHandler(el)}
              />
            );
          })
        : null}
    </ScrollView>
  );
};

export default EmployeesScreen;
