import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInputChangeEventData, View } from "react-native";
import axios from "axios";

import { style } from "./OrdersStyles";
import OrderItem from "../../../components/OrderItem/OrderItem";
import SearchField from "../../../components/Search/Search";
import { useIsFocused } from "@react-navigation/native";
import OrderService from "../../../services/OrderService";

const ProductsScreen = ({navigation}: any) => {
    const [orders, setOrders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);

    const isFocused = useIsFocused();

    const filteredProducts = isLoaded ? orders.filter((el: any) => {
        return el.clientName.toLowerCase().includes(searchText.toLowerCase())
      })
    : [];

    const getProducts = async() => {
        try {
            const response: any= await axios.get("http://localhost:3000/orders");
            const clientsResponse = await axios.get("http://localhost:3000/clients");
            response.data.forEach((el: any) => {
              clientsResponse.data.forEach((cl: any) => {
                if(el.IDclient === cl.clientID) {
                  el.clientName = cl.fullname;
                }
              })
            });
            setOrders(response.data);
            setIsLoaded(true);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(isFocused || refresh) {
            getProducts();
        }
    }, [isFocused, refresh])

    const onPressDeleteHandler = async (id: number) => {
        await OrderService.deleteOrder(id);
        setRefresh(true);
    }

    const onPressViewHandler = (order: any) => {
        navigation.replace('ViewOrderScreen', { data: order });
    }


    const onPressEditHandler = (order: any) => {
        navigation.replace('EditOrderScreen', { data: order });
    }

    const onPressAddHandler = () => {
        navigation.replace('AddOrderScreen');
    }
    return (
        <ScrollView style={style.mainView}>
            <SearchField onPress={onPressAddHandler}
                onChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setSearchText(e.nativeEvent.text)}/>
            
            {isLoaded ? filteredProducts.map((el: any, index: number) => {
                return (
                    <OrderItem
                        order={el}
                        key={index}
                        clientName={el.clientName}
                        IDproduct={el.IDproduct}
                        quantity={el.quantity}
                        price={el.price}
                        pic={index}
                        data={el.data}
                        IDemployee={el.IDemployee}
                        onPressEditHandler={() => onPressEditHandler(el)}
                        onPressDeleteHandler={() => onPressDeleteHandler(el.orderID)}
                        onPressViewHandler={() => onPressViewHandler(el)}
                    />);
                })
            : null}

        </ScrollView>
    )
}

export default ProductsScreen;