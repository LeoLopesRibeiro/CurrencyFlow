import React from "react";
import { Text, View, StatusBar, SafeAreaView } from "react-native";
import TopRoutes from "./src/routes/top.routes";
export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <TopRoutes/>
      <StatusBar barStyle="light-content" backgroundColor="#1C1C1C"/>
    </SafeAreaView>
  );
}
