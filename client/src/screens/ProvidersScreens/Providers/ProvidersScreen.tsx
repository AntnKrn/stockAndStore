import React, { useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInputChangeEventData, View } from "react-native";
import axios from "axios";

import { style } from "./ProvidersStyles";
import ProductItem from "../../../components/ProductItem/ProductItem";
import SearchField from "../../../components/Search/Search";
import { useIsFocused } from "@react-navigation/native";
import ProductsService from "../../../services/ProductsService";
import ProviderItem from "../../../components/ProviderItem/ProviderItem";
import ProviderService from "../../../services/ProvidersService";

const ProductsScreen = ({navigation}: any) => {
    const [providers, setProviders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);

    const isFocused = useIsFocused();

    const filteredProviders = isLoaded ? providers.filter((el: any) => {
        return el.name.toLowerCase().includes(searchText.toLowerCase())
      })
    : [];

    const getOrders = async() => {
        try {
            const response = await axios.get("http://localhost:3000/providers");
            setProviders(response.data);
            setIsLoaded(true);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(isFocused || refresh) {
            getOrders();
        }
    }, [isFocused, refresh])

    const onPressDeleteHandler = async (id: number) => {
        await ProviderService.deleteProvider(id);
        setRefresh(true);
    }

    const onPressViewHandler = (product: any) => {
        navigation.navigate('ViewProviderScreen', { data: product });
    }


    const onPressEditHandler = (product: any) => {
        return navigation.navigate('EditProviderScreen', { data: product });
    }

    const onPressAddHandler = () => {
        return navigation.navigate('AddProviderScreen');
    }
    return (
        <ScrollView style={style.mainView}>
            <SearchField onPress={onPressAddHandler}
                onChangeText={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setSearchText(e.nativeEvent.text)}/>
            
            {isLoaded ? filteredProviders.map((el: any, index: number) => {
                return (
                    <ProviderItem
                        product={el}
                        key={index}
                        name={el.name}
                        category={el.category}
                        pic={index}
                        onPressEditHandler={() => onPressEditHandler(el)}
                        onPressDeleteHandler={() => onPressDeleteHandler(el.id)}
                        onPressViewHandler={() => onPressViewHandler(el)}
                    />);
                })
            : null}

        </ScrollView>
    )
}

export default ProductsScreen;