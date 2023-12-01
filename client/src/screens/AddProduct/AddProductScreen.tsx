import React from "react";
import { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";

import { style } from "./AddProductStyles";

type items = string[] | number[];

//СОЗДАТЬ ХУКИ ДЛЯ ЛАБЕЛ И ВАЛЬЮ И ПОТОМ РЕНДЕРИТЬ ОБЪЕКТ ДЛЯ СЕЛЕКТА И ПРОБЕГАТЬСЯ ПО МАССИВУ
const AddProductScreen = ({navigation}: any) => {
    const [providers, setProviders] = useState<any>();
    const [isLoaded, setIsLoaded] = useState<boolean>();
    const [labels, setLabels] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]);

    useEffect(() => {
        const sendGetRequest = async() => {
            try {
                const response = await axios.get("http://localhost:3000/providers");
                setProviders(response.data);
                setIsLoaded(true);
                const arrayLabels: string[] = [];
                const arrayValues: number[] = [];
                response.data.map((el: any, index: number) => {
                    arrayLabels.push(el.name);
                    arrayValues.push(el.id);
                })
                setLabels(arrayLabels);
                setValues(arrayValues);
            } catch(err) {
                console.log(err);
            } 
        }
        sendGetRequest();
    }, [])

    const arrayNames: any[] = [];

    return (
        <View style={style.mainView}>
            <TextInput 
              style={style.inputText}
              placeholder="Название" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputText}
              placeholder="Бренд" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputText}
              placeholder="Код" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Количество" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            
            <View style={style.providers as any}>
              <RNPickerSelect
                  placeholder={{label: 'Выберите поставщика', value: null }}
                  onValueChange={(value) => console.log(value)}
                  items={values.map((el: any, index: number) => {
                    return {label: labels[index], value: values[index]}
                  })}><TextInput placeholder="Выберите поставщика"></TextInput></RNPickerSelect>
            </View>

            <TextInput 
            style={style.inputNumber}
            placeholder="Цена покупки" 
            autoCapitalize="none"
            autoCorrect= {false}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Цена продажи" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Объем" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Вес" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputNumber}
              placeholder="Дата поставки" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            <TextInput 
              style={style.inputText}
              placeholder="Описание" 
              autoCapitalize="none"
              autoCorrect= {false}
            />
            
        </View>
    )
}

export default AddProductScreen;

