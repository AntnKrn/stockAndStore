import React, { useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  ScrollView,
  TextInputChangeEventData,
} from "react-native";
import axios from "axios";

import { style } from "./ClientsStyles";
import SearchField from "../../../components/Search/Search";
import { useIsFocused } from "@react-navigation/native";
import ClientItem from "../../../components/ClientItem/ClientItem";
import ClientsService from "../../../services/ClientsService";

const ClientsScreen = ({ navigation }: any) => {
  const [clients, setClients] = useState<any>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const isFocused = useIsFocused();

  const filteredClients = isLoaded
    ? clients.filter((el: any) => {
        return el?.fullname?.toLowerCase().includes(searchText.toLowerCase());
      })
    : [];

  const getClients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clients/");
      setClients(response.data);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused || refresh) {
      getClients();
    }
  }, [isFocused, refresh]);

  const onPressDeleteHandler = async (id: number) => {
    await ClientsService.deleteClient(id);
    setRefresh(true);
  };

  const onPressViewHandler = (client: any) => {
    navigation.navigate("ViewClientScreen", { data: client });
  };

  const onPressEditHandler = (order: any) => {
    navigation.navigate("EditClientScreen", { data: order });
  };

  const onPressAddHandler = () => {
    navigation.navigate("AddClientScreen");
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
        ? filteredClients.map((el: any, index: number) => {
            return (
              <ClientItem
                key={index}
                fullname={el.fullname}
                phoneNumber={el.phoneNumber}
                pic={index}
                onPressEditHandler={() => onPressEditHandler(el)}
                onPressDeleteHandler={() => onPressDeleteHandler(el.clientID)}
                onPressViewHandler={() => onPressViewHandler(el)}
              />
            );
          })
        : null}
    </ScrollView>
  );
};

export default ClientsScreen;
