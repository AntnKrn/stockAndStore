import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";
import axios from "axios";

import { style } from "./ProductsStyles";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { fetchProducts } from "../../store/actions/productsAction";

const ProductsScreen = ({navigation}: any) => {
    
    const dispatch = useDispatch();
    const [products, setProducts] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();

    const { isAuth } = useTypedSelector(state => state.auth)

    useEffect(() => {
        const sendGetRequest = async() => {
            try {
                const response = await axios.get("http://localhost:3000/products");
                setProducts(response.data);
                setIsLoaded(true);
            } catch(err) {
                console.log(err);
            }
        }

        sendGetRequest();
    }, [])

    console.log(products);
    //const { products, isLoaded, error } = useTypedSelector(state => state.products)

    //console.log(isAuth);

    if(!isAuth) {
        navigation.navigate('AuthorizationScreen')
    }

    const onPressHandler = async () => {
        await dispatch<any>(logout());
    }

    return (
        <View style={style.container}>
            <Text>ProductsScreen</Text>
            <Pressable 
              style={style.enter as any} 
              onPress={onPressHandler}>
                <Text style={style.enterText}>Выйти</Text>
            </Pressable>
            {isLoaded ? products.map((el: any, index: number) => {
                console.log(el)
                return <Text>{el.name}</Text>
            }) : null}
        </View>
    )
}

export default ProductsScreen;