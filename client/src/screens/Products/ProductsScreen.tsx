import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInputChangeEventData, View } from "react-native";
import axios from "axios";

import { style } from "./ProductsStyles";
import ProductItem from "../../components/ProductItem/ProductItem";
import SearchField from "../../components/Search/Search";
import { useIsFocused } from "@react-navigation/native";

const ProductsScreen = ({navigation}: any) => {
    const [products, setProducts] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");

    const isFocused = useIsFocused();

    const filteredProducts = isLoaded ? products.filter((el: any) => {
        return el.name.toLowerCase().includes(searchText.toLowerCase())
      })
    : [];

    useEffect(() => {

    }, [searchText])

    const getProducts = async() => {
        try {
            const response = await axios.get("http://localhost:3000/products");
            setProducts(response.data);
            setIsLoaded(true);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(isFocused) {
            getProducts();
        }
    }, [isFocused])
    

    const onPressAddHandler = () => {
        navigation.navigate('AddProductScreen');
    }
    return (
        <ScrollView style={style.mainView}>
            <SearchField onPress={onPressAddHandler}
                onChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setSearchText(e.nativeEvent.text)}/>
            
            {isLoaded ? filteredProducts.map((el: any, index: number) => {
                return (
                    <ProductItem
                        key={index}
                        name={el.name}
                        code={el.code}
                        quantity={el.quantity}
                        pic={index}
                    />);
                })
            : null}

        </ScrollView>
    )
}

export default ProductsScreen;