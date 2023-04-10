import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../Screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Data from "../Screens/Data";

const { Screen, Navigator } = createMaterialTopTabNavigator<Tab>();

export default function TopRoutes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Data" component={Data} />
      </Navigator>
    </NavigationContainer>
  );
}
