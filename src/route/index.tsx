import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from "./tab-navigator";
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator();

const Route: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Main'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
        </NavigationContainer>  
    )
};

export default Route;