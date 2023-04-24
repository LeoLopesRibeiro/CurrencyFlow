import { View, Text, ScrollView } from "react-native";
import { api } from "../../services/api";
import { useEffect, useState } from "react";
import CardCoins from "../../components/CardCoins";
import { CurrentCoins } from "../../types/current";
import { SelectList } from "react-native-dropdown-select-list";
export default function Home() {
  const [dados, setDados] = useState<{ [key: string]: CurrentCoins } | null>(
    null
  );
  const [select, setSelect] = useState("");
  const [nomes, setNomes] = useState<{ key: number; value: string }[] | null>(
    null
  );
  useEffect(() => {
    async function getCoins() {
      try {
        const response = await api.get(
          "last/USD-BRL,EUR-BRL,USD-BRLT,GBP-BRL,ARS-BRL,BTC-BRL,LTC-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL"
        );
        setDados(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCoins();
    async function getNameCoins() {
      try {
        const response = await api.get("/available");
        // console.log(response);

        setNomes(
          Object.keys(response.data).map((key, index) => {
            return { key: index, value: response.data[key] };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getNameCoins();
  }, []);
  useEffect(() => {
    function getNome() {
      if (nomes === null) return;
      const nomeFormatado = nomes[Number(select)].value;

      console.log(nomeFormatado);
    }

    getNome()
  }, [select]);


  return (
    <ScrollView>
      <View className="flex flex-col bg-cores items-center justify-center align-middle w-max h-max">
        {nomes != null ? (
          <SelectList
            data={nomes}
            setSelected={(val: string) => setSelect(val)}
          />
        ) : null}
        {}
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
