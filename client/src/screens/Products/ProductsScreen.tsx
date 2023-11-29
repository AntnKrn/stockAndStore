import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";

import { style } from "./ProductsStyles";
import { useTypedSelector } from "../../hooks/useTypesSelector";

const ProductsScreen = ({navigation}: any) => {
    const dispatch = useDispatch();

    const {userData, isAuth, error} = useTypedSelector(state => state.login)

    const onPressHandler = async () => {
        await dispatch<any>(logout);
        navigation.navigate('AuthorizationScreen');
        console.log(userData, isAuth, error);
    }
    return (
        <View style={style.container}>
            <Text>ProductsScreen</Text>
            <Pressable 
              style={style.enter as any} 
              onPress={onPressHandler}>
                <Text style={style.enterText}>Войти</Text>
            </Pressable>
        </View>
    )
}

export default ProductsScreen;