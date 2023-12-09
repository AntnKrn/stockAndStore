import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInputChangeEventData, View } from "react-native";
import axios from "axios";

import { style } from "./ProductsStyles";
import ProductItem from "../../../components/ProductItem/ProductItem";
import SearchField from "../../../components/Search/Search";
import { useIsFocused } from "@react-navigation/native";
import ProductsService from "../../../services/ProductsService";

const ProductsScreen = ({navigation}: any) => {
    const [products, setProducts] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);

    const isFocused = useIsFocused();

    const filteredProducts = isLoaded ? products.filter((el: any) => {
        return el.name.toLowerCase().includes(searchText.toLowerCase())
      })
    : [];

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
        if(isFocused || refresh) {
            getProducts();
        }
    }, [isFocused, refresh])

    const onPressDeleteHandler = async (id: number) => {
        await ProductsService.deleteProducts(id);
        setRefresh(true);
    }

    const onPressViewHandler = (product: any) => {
        navigation.navigate('ViewProductScreen', { data: product });
    }


    const onPressEditHandler = (product: any) => {
        navigation.removeListener();
        navigation.navigate('EditProductScreen', { data: product });
    }

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
                        product={el}
                        key={index}
                        id={el.IDprovider}
                        name={el.name}
                        code={el.code}
                        quantity={el.quantity}
                        pic={index}
                        onPressEditHandler={() => onPressEditHandler(el)}
                        onPressDeleteHandler={() => onPressDeleteHandler(el.productID)}
                        onPressViewHandler={() => onPressViewHandler(el)}
                    />);
                })
            : null}

        </ScrollView>
    )
}

export default ProductsScreen;