import IndicatorsScreen from "../screens/Indicators/Indicators";
import TodosScreen from "../screens/OrdersScreens/OrdersScreen/OrdersScreen";
import ProductsScreen from "../screens/ProductsScreens/Products/ProductsScreen";
import AuthorizationScreen from "../screens/AuthScreens/Authorization/AuthorizationScreen";
import RegistrationScreen from "../screens/AuthScreens/Registration/RegistrationScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddProductScreen from "../screens/ProductsScreens/AddProduct/AddProductScreen";
import EditProductScreen from "../screens/ProductsScreens/EditProduct/EditProductScreen";
import ViewProductScreen from "../screens/ProductsScreens/ViewProduct/ViewProductScreen";
import ViewOrderScreen from "../screens/OrdersScreens/ViewOrder/ViewOrderScreen";
import EditOrderScreen from "../screens/OrdersScreens/EditOrder/EditOrder";
import ProvidersScreen from "../screens/ProvidersScreens/Providers/ProvidersScreen";
import AddOrderScreen from "../screens/OrdersScreens/AddOrder/AddOrder";
import AddProviderScreen from "../screens/ProvidersScreens/AddProvider/AddProviderScreen";
import ViewProviderScreen from "../screens/ProvidersScreens/ViewProvider/ViewProviderScreen";
import EditProviderScreen from "../screens/ProvidersScreens/EditProvider/EditProviderScreen";

import AddEmployeeScreen from "../screens/EmployeesScreens/AddEmployee/AddEmployee";
import ViewEmployeeScreen from "../screens/EmployeesScreens/viewEmployee/ViewEmployeeScreen";
import EditEmployeeScreen from "../screens/EmployeesScreens/EditEmployee/EditEmployee";

import { useTypedSelector } from "../hooks/useTypesSelector";
import EmployeesScreen from "../screens/EmployeesScreens/EmployeesScreen/EmployeesScreen";
import AddClientScreen from "../screens/ClientsScreen/AddClient/AddClientScreen";
import ViewClientScreen from "../screens/ClientsScreen/viewClient/ViewClientScreen";
import EditClientScreen from "../screens/ClientsScreen/EditClient/EditClientScreen";
import ClientsScreen from "../screens/ClientsScreen/ClientsScreen/ClientsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { userData } = useTypedSelector((state) => state.auth);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        unmountOnBlur: route.name === "Профиль",
      })}
    >
      {userData?.user?.role === "owner" ? (
        <Tab.Screen
          name="Показатели"
          component={IndicatorsScreen}
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="chart-line"
                color="black"
                size={26}
              />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Товары"
        component={ProductsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="dropbox" color="black" size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Заказы"
        component={TodosScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="cart-arrow-up"
              color="black"
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Поставщики"
        component={ProvidersScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-group"
              color="black"
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color="black" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="AuthorizationScreen"
        component={AuthorizationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegistrationScreen"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Склад" component={MainTabNavigator} />

      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{ title: "Добавление" }}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={{ title: "Изменение" }}
      />
      <Stack.Screen
        name="ViewProductScreen"
        component={ViewProductScreen}
        options={{ title: "Просмотр" }}
      />

      <Stack.Screen
        name="AddOrderScreen"
        component={AddOrderScreen}
        options={{ title: "Добавление" }}
      />
      <Stack.Screen
        name="ViewOrderScreen"
        component={ViewOrderScreen}
        options={{ title: "Просмотр" }}
      />
      <Stack.Screen
        name="EditOrderScreen"
        component={EditOrderScreen}
        options={{ title: "Изменение" }}
      />

      <Stack.Screen
        name="AddProviderScreen"
        component={AddProviderScreen}
        options={{ title: "Добавление" }}
      />
      <Stack.Screen
        name="ViewProviderScreen"
        component={ViewProviderScreen}
        options={{ title: "Просмотр" }}
      />
      <Stack.Screen
        name="EditProviderScreen"
        component={EditProviderScreen}
        options={{ title: "Изменение" }}
      />

      <Stack.Screen
        name="AddEmployeeScreen"
        component={AddEmployeeScreen}
        options={{ title: "Добавление" }}
      />
      <Stack.Screen
        name="ViewEmployeeScreen"
        component={ViewEmployeeScreen}
        options={{ title: "Просмотр" }}
      />
      <Stack.Screen
        name="EditEmployeeScreen"
        component={EditEmployeeScreen}
        options={{ title: "Изменение" }}
      />
      <Stack.Screen
        name="EmployeesScreen"
        component={EmployeesScreen}
        options={{ title: "Изменение" }}
      />

      <Stack.Screen
        name="AddClientScreen"
        component={AddClientScreen}
        options={{ title: "Добавление" }}
      />
      <Stack.Screen
        name="ViewClientScreen"
        component={ViewClientScreen}
        options={{ title: "Просмотр" }}
      />
      <Stack.Screen
        name="EditClientScreen"
        component={EditClientScreen}
        options={{ title: "Изменение" }}
      />
      <Stack.Screen
        name="ClientsScreen"
        component={ClientsScreen}
        options={{ title: "Клиенты" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
