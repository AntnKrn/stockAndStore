import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const AuthorizationScreen = ({navigation}: any) => {
    return (
        <View>
            <Text>Authorization</Text>
            <Button title="Enter" onPress={() => navigation.navigate('Products')}/>
        </View>
    )
}

const style = StyleSheet.create({

});

export default AuthorizationScreen;