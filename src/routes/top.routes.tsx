import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Salvos from "../screens/Salvos";

const { Screen, Navigator } = createMaterialTopTabNavigator<Tab>();

export default function TopRoutes() {
  return (
    <NavigationContainer>
      <Navigator
         screenOptions={{
          tabBarActiveTintColor: "#B89D59",
          tabBarInactiveTintColor: "#898686",
          tabBarStyle: {
            backgroundColor: "#1C1C1C",
            elevation: 10,
            position: "relative",
          },
          tabBarLabelStyle: {
            // fontFamily: "Poppins_600SemiBold",
            textTransform: "capitalize",
            fontSize: 16,
          },
          tabBarItemStyle: {
            padding: 0,
            margin: 0,
          },
          tabBarIndicatorContainerStyle: {
            width: "30%",
            marginTop: "6%",
            marginLeft: "15.5%",
            height: 2,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#B89D59",
          },
          tabBarPressColor: "transparent",
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="Salvos" component={Salvos} />
      </Navigator>
    </NavigationContainer>
  );
}
