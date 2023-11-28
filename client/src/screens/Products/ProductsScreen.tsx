import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";


const ProductsScreen = ({navigation}: any) => {
    return (
        <View>
            <Text>ProductsScreen</Text>
            <Button title="Enter" onPress={() => navigation.navigate('Auth')}/>
        </View>
    )
}

const style = StyleSheet.create({

});

export default ProductsScreen;