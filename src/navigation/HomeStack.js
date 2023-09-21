import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import FlatlistPage from "../screens/FlatlistPage";
import Pdfreader from "../screens/Pdfreader";
const Stack = createNativeStackNavigator();
export default HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerShown: false }} name="FlatlistPage" component={FlatlistPage} />
      <Stack.Screen options={{ headerShown: false }} name="Pdfreader" component={Pdfreader} />
    </Stack.Navigator>
  )
}