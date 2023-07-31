import * as React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
const Stack = createNativeStackNavigator();
export default HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
    </Stack.Navigator>
  )
}