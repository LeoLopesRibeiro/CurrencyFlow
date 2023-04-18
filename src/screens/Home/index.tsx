import { View, Text, ScrollView } from "react-native";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import CardCoins from "../../components/CardCoins";
import {CurrentCoins} from "../../types/current";

export default function Home() {
  const [dados, setDados] = useState<{[key: string]: CurrentCoins } | null>(null);


  useEffect(() => {
    async function getCoins() {
      try {
        const response = await api.get("last/USD-BRL,EUR-BRL,USD-BRLT,GBP-BRL,ARS-BRL,BTC-BRL,LTC-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL");
        // console.log(response.data.USDBRL.ask);
        // console.log(response.data)
        setDados(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCoins();
  }, []);

  // console.log(dados);
  return (
    <ScrollView >
    <View className="flex flex-col bg-cores items-center justify-center align-middle w-max h-max">
    {dados === null ? (
      <View></View>
    ) : Object.keys(dados).map((key, index) => {
      return <CardCoins key={index} coin={dados[key]} />
    })}
    </View>
    </ScrollView>
  );
}
