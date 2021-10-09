import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home.Screen";
import UpdateRecord from "../screens/UpdateRecord.Screen";
import RecordProvider from "../services/record/record.service";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RecordProvider>
        <Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#1E319D" },
            headerTitleStyle: { color: "#FFFFFF" },
          }}
        >
          <Screen name="Records" component={HomeScreen} />
          <Screen name="Edit" component={UpdateRecord} />
        </Navigator>
      </RecordProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
