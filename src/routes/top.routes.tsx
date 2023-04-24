import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Salvos from "../screens/Salvos";

const { Screen, Navigator } = createMaterialTopTabNavigator<Tab>();

export default function TopRoutes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} />
        <Screen name="Salvos" component={Salvos} />
      </Navigator>
    </NavigationContainer>
  );
}
