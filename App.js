import React from "react";
import {
  Lato_400Regular_Italic,
  useFonts,
  Lato_700Bold,
  Lato_400Regular,
} from "@expo-google-fonts/lato";
import AppLoading from "expo-app-loading";
// import AppNavigator from "./src/navigation/AccountNavigatior";
import AuthProvider from "./src/services/auth/auth.service";
import Navigation from "./src/navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_400Regular_Italic,
    Lato_700Bold,
    Lato_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <React.Fragment>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </React.Fragment>
  );
}
