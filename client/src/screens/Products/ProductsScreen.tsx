import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";

import { style } from "./ProductsStyles";
import { useTypedSelector } from "../../hooks/useTypesSelector";

const ProductsScreen = ({navigation}: any) => {
    
    const dispatch = useDispatch();

    const {userData, isAuth, error} = useTypedSelector(state => state.auth)

    if(!isAuth) {
        navigation.navigate('AuthorizationScreen')
    }

    const onPressHandler = async () => {
        await dispatch<any>(logout());
        console.log(isAuth);
    }

    return (
        <View style={style.container}>
            <Text>ProductsScreen</Text>
            <Pressable 
              style={style.enter as any} 
              onPress={onPressHandler}>
                <Text style={style.enterText}>Выйти</Text>
            </Pressable>
        </View>
    )
}

export default ProductsScreen;