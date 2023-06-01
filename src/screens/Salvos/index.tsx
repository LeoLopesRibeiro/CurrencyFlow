import { View, Text, ScrollView, RefreshControl } from "react-native";
import { api } from "../../services/api";
import { useEffect, useRef, useState } from "react";
import CardCoins from "../../components/CardCoins";
import { CurrentCoins } from "../../types/current";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Salvos() {
  const [dados, setDados] = useState<{ [key: string]: CurrentCoins } | null>(
    null
  );
  const [refresh, setRefresh] = useState(true);
  const [coins, setCoins] = useState<string | null>(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function getCoins() {
      try {
        setCoins(await AsyncStorage.getItem("coin"));
        if (coins != null) {
          const response = await api.get(`last/${coins}`);
          setDados(response.data);
          console.log(response.data);
          setRefresh(false);
        }
        setRefresh(false);
      } catch (error) {
        console.log(error);
      }
    }
    getCoins();
  }, [refresh]);
  return (
    <ScrollView
      className=" bg-cores h-max"
      ref={scrollRef}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(!refresh);
          }}
        />
      }
    >
      <View className="flex flex-col bg-cores items-center justify-center align-middle w-max h-max">
        {dados === null ? (
          <View></View>
        ) : (
          Object.keys(dados).map((key, index) => {
            return <CardCoins key={index} coin={dados[key]} />;
          })
        )}
      </View>
    </ScrollView>
  );
}
