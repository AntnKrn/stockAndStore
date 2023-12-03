import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

export const Grafic = () => {
    const isFocus = useIsFocused();

    const getOrders = async() => {
        try {
            const response = await axios.get('http://localhost:3000/orders');
            response.data.map((el: any) => {
                const date = new Date(el.data);
                const currentDate = new Date();
                //console.log(date.getMonth() + 1)
                if(date.getMonth() + 1 === 3) {
                    //console.log(date, el.price);                
                }
            })
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getOrders();
    }, [isFocus])

    return (
           <VictoryChart
                theme={VictoryTheme.grayscale}
                domain={{ y: [2000, 5000]}}
                style={{ background: { opacity: 0.1 } }}>
                <VictoryLine
                    data={[
                        { x: 0, y: 2500 },
                        { x: 1.25, y: 3000 },
                        { x: 1.8, y: 3000 },
                        { x: 2.7, y: 3300 },
                        { x: 3.1, y: 2000 },
                        { x: 3.25, y: 4000 },
                        { x: 3.5, y: 4000 },
                        { x: 4, y: 4478 },
                        { x: 4.5, y: 4300. },
                        { x: 5.1, y: 4200 },
                        { x: 6.3, y: 3500 },
                        { x: 6.75, y: 3400 },
                        { x: 7, y: 3300 },
                        { x: 7.25, y: 3200 },
                        { x: 9, y: 2900 },
                        { x: 10, y: 2000 }
                    ]}
                    style={{
                    data: { strokeWidth: 3 }
                }}/>
                <VictoryAxis dependentAxis />
            </VictoryChart>
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

