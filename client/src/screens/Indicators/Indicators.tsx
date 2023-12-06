import React, { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";
import axios from "axios";

import { style } from "./IndicatorsStyles";
import {Grafic} from '../../components/Grafic/Grafic';
import { useIsFocused } from "@react-navigation/native";

const IndicatorsScreen = ({navigation}: any) => {
  const isFocus = useIsFocused();
  const [earned, setEarned] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [spent, setSpent] = useState<number>();
  const [total, setTotal] = useState<number>();
  const [metrs, setMetrs] = useState<number>();
  const [isLoaded, setIsLoaded] = useState(false);
  const getPrice = async () => {
            const responseOrders = await axios.get('http://localhost:3000/orders');
            const responseProducts = await axios.get('http://localhost:3000/products');

            let quantity_ = 0;
            let spent_ = 0;
            let total_ = 0
            responseOrders.data.map((el: any) => {
              const date = new Date(el.data);
              const currentDate: any = new Date();

              const thisMonthStart = new Date(currentDate);
              thisMonthStart.setMonth(currentDate.getMonth());
              thisMonthStart.setDate(1);

              const thisMonthEnd = new Date(currentDate);
              thisMonthEnd.setMonth(currentDate.getMonth());
              thisMonthEnd.setDate(31);

              const secondMonthStart = new Date(currentDate);
              secondMonthStart.setMonth(currentDate.getMonth() - 1);
              secondMonthStart.setDate(1);

              const secondMonthEnd = new Date(currentDate);
              secondMonthEnd.setMonth(currentDate.getMonth() - 1);
              secondMonthEnd.setDate(31);

              const thirdMonthStart = new Date(currentDate);
              thirdMonthStart.setMonth(currentDate.getMonth() - 2);
              thirdMonthStart.setDate(1);

              const thirdMonthEnd = new Date(currentDate);
              thirdMonthEnd.setMonth(currentDate.getMonth() - 2);
              thirdMonthEnd.setDate(31);

              if(date >= thisMonthStart && date <= thisMonthEnd) {
                  console.log(el)
                  quantity_ += el.quantity;
                  total_ += Number(el.price)
                  responseProducts.data.map((elPr: any) => {
                    if(elPr.productID === el.IDproduct) {
                      spent_ += elPr.pricePurchase * el.quantity;
                      console.log('frst', spent_)
                    }
                  })
              }

              if(date >= secondMonthStart && date <= secondMonthEnd) {
                  quantity_ += el.quantity;
                  total_ += Number(el.price)
                  responseProducts.data.map((elPr: any) => {
                    if(elPr.productID === el.IDproduct) {
                      spent_ += elPr.pricePurchase * el.quantity;
                      console.log('sec', spent_)
                    }
                  })
              }

              if(date >= thirdMonthStart && date <= thirdMonthEnd) {
                  quantity_ += el.quantity;
                  total_ += Number(el.price)
                  responseProducts.data.map((elPr: any) => {
                    if(elPr.productID === el.IDproduct) {
                      spent_ += elPr.pricePurchase * el.quantity;
                      console.log('third', spent_)
                    }
                  })
              }
              
            }) 
            
            setQuantity(quantity_);
            setTotal(total_);
            setIsLoaded(true);
            setSpent(spent_);
            setEarned(total_ - spent_)
  }
  const getMeters = async() => {
    const responseProducts = await axios.get('http://localhost:3000/products');
    let metrs_ = 0;
    responseProducts.data.map((el: any) => {
      metrs_ += el.volume * el.quantity;
    })
    setMetrs(metrs_);
  }

  useEffect(() => {
    getMeters();
    getPrice();
  }, [isFocus])
  return (
        <View style={style.container}>
            <Text style={{ alignSelf: 'center' }}>Продажи</Text>
            <Grafic />
            <View style={style.quantitySumContainer}>
              <View>
                <Text>Количество</Text>
                <Text style={{ alignSelf: 'center' }}>{isLoaded ? quantity : null}</Text>
              </View>
              <View>
                <Text>Сумма</Text>
                <Text style={{ alignSelf: 'center' }}>{total}</Text>
              </View>
              <View>
                <Text>Затрачено</Text>
                <Text style={{ alignSelf: 'center' }}>{spent}</Text>
              </View>
              <View>
                <Text>Прибыль</Text>
                <Text style={{ alignSelf: 'center' }}>{isLoaded ? <Text>{earned}</Text> : null}</Text>
              </View>
            </View>
            <View style={{alignSelf: 'center', paddingVertical: 80}}>
              <Text>Заполненность склада</Text>
              <Text style={{ alignSelf: 'center' }}>{metrs}м{'\u00B3'} из 850м{'\u00B3'}</Text>
            </View>
        </View>
  )
}

export default IndicatorsScreen;