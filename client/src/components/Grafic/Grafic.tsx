import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme, VictoryBar} from "victory-native";

export const Grafic = ({navigation} : any) => {
    
    const [quantity, setQuantity] = useState();
    const [spent, setSpent] = useState();
    const [total, setTotal] = useState();

    const isFocus = useIsFocused();
    const [data, setData] = useState([
        {quarter: 1, earnings: 0},
        {quarter: 2, earnings: 0},
        {quarter: 3, earnings: 0},
    ]);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    
    const getOrders = async() => {
        try {
            const response = await axios.get('http://localhost:3000/orders');
            let quantity_ = 0;
            let spent_ = 0;
            let total_ = 0
            const sum1: any = [];
            const sum2: any = [];
            const sum3: any = [];
            response.data.map((el: any) => {
    
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
                    sum1.push(Number(el.price))
                    quantity_ += el.quantity;
                    total_ += el.price
                }
 
                if(date >= secondMonthStart && date <= secondMonthEnd) {
                    sum2.push(Number(el.price))
                    quantity_ += el.quantity;
                    total_ += el.price
                }

                if(date >= thirdMonthStart && date <= thirdMonthEnd) {
                    sum3.push(Number(el.price));
                    quantity_ += el.quantity;
                    total_ += el.price
                }
            })
            const summa1 = sum1.reduce((acc: any, number: any) => acc + number, 0);
            const summa2 = sum2.reduce((acc: any, number: any) => acc + number, 0);            const summ1 = sum1.reduce((acc: any, number: any) => acc + number, 0);
            const summa3 = sum3.reduce((acc: any, number: any) => acc + number, 0);
            setIsLoaded(true);
            setData([
                {quarter: 1, earnings: summa3},
                {quarter: 2, earnings: summa2},
                {quarter: 3, earnings: summa1},
            ]);
        } catch(err) { 
            console.log(err);
        }
    }

    useEffect(() => {
        getOrders();
    }, [isFocus])

    return (
        isLoaded ? <VictoryChart domainPadding={20}>
        <VictoryAxis
          tickValues={[1, 2, 3]}
          tickFormat={["Октябрь", "Ноябрь", "Декабрь"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`${x / 1000}`)}
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings" 
        />  
      </VictoryChart> : null
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  }
});

