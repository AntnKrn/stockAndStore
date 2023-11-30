import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";
import axios from "axios";

import { style } from "./ProductsStyles";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { fetchProducts } from "../../store/actions/productsAction";
import ProductItem from "../../components/ProductItem/ProductItem";
import SearchField from "../../components/Search/Search";

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
        <ScrollView style={style.mainView}>
            <SearchField />
            {isLoaded ? products.map((el: any, index: number) => {
                return <ProductItem key={index} name={el.name} code={el.code} quantity={el.quantity} pic={index}/>
            }): null}   
            {isLoaded ? products.map((el: any, index: number) => {
                return <ProductItem key={index} name={el.name} code={el.code} quantity={el.quantity} pic={index}/>
            }): null}           
            {isLoaded ? products.map((el: any, index: number) => {
                return <ProductItem key={index} name={el.name} code={el.code} quantity={el.quantity} pic={index}/>
            }): null}  
            {isLoaded ? products.map((el: any, index: number) => {
                return <ProductItem key={index} name={el.name} code={el.code} quantity={el.quantity} pic={index}/>
            }): null}  
        </ScrollView>
    )
}

export default ProductsScreen;