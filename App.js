import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AccountDetailsScreen from "./navigation/screens/AccountDetails";
import ProfileUser from "./navigation/screens/ProfileDetail";
import JobsDetails from "./navigation/screens/JobsDetails";
import CompanyDetails from "./navigation/screens/CompanyDetail";
import MainContainer from './navigation/MainContainer';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainContainer} />
        <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
        <Stack.Screen name="CompanyDetails" component={CompanyDetails} />
        <Stack.Screen name="JobsDetails" component={JobsDetails} />
        <Stack.Screen name="ProfileUser" component={ProfileUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
