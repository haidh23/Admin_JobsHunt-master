import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/LikedScreen";
import SettingsScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";


//Screen names
const homeName = "Account Management";
const searchName = "User Profile";
const likedName = "Company Informations";
const profileName = "Jobs";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
   
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "people" : "people-outline";
            } else if (rn === searchName) {
              iconName = focused ? "people" : "people-outline";
            } else if (rn === likedName) {
              iconName = focused ? "people" : "people-outline";
            }else if (rn === profileName) {
              iconName = focused ? "people" : "people-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: {
          padding: 10,
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden', // Để hình cong không bị tràn ra ngoài
        },
        }}
      >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={searchName}
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={likedName}
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
        
      </Tab.Navigator>
   
  );
}

export default MainContainer;
