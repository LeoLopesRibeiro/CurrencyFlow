import { View, Text } from "react-native";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import CardCoins from "../../components/CardCoins";
import {CurrentCoins} from "../../types/current";
export default function Home() {
  const [dados, setDados] = useState<CurrentCoins | null>(null);
  useEffect(() => {
    async function getCoins() {
      try {
        const response = await api.get("last/USD-BRL,EUR-BRL");
        // console.log(response.data.USDBRL.ask);
        const {  code } = response.data.USDBRL;
        console.log(response.data.USDBRL)
        const coinsData: CurrentCoins = {
          code,
        };
        setDados(coinsData);
        console.log(coinsData);
      } catch (error) {
        console.log(error);
      }
    }
    getCoins();
  }, []);

//   console.log(dados);
  return (
    <View className="">
      <CardCoins coin={dados} />
    </View>
  );
}
