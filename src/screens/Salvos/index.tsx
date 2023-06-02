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
        }else{
          setDados(null)
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
    className="bg-cores w-max h-max"
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
          <View className="flex flex-col bg-cores justify-center content-center align-middle items-center bottom-10 h-screen">
            <Text className="text-gray font-bold border-b border-golden text-end my-3">
              Você não tem moedas salvas !
            </Text>
          </View>
        ) : (
          Object.keys(dados).map((key, index) => {
            return <CardCoins key={index} coin={dados[key]} />;
          })
        )}
      </View>
    </ScrollView>
  );
}
