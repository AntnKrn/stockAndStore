import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";
import axios from "axios";

import { style } from "./ProductsStyles";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { fetchProducts } from "../../store/actions/productsAction";
import ProductItem from "../../components/ProductItem/ProductItem";

const ProductsScreen = () => {
    const [products, setProducts] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();

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
    

    return (
        <View style={style.mainView}>
            {/* <Text>ProductsScreen</Text>
            {isLoaded ? products.map((el: any, index: number) => {
                console.log(el)
                return <Text key={index}>{el.name}</Text>
            }) : null} */}
            <View style={style.paramsAria}>

            </View>

            <ProductItem />
        </View>
    )
}

export default ProductsScreen;