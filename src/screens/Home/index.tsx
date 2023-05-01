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
  const [moedaUnica, setMoedaUnica] = useState<{
    [codigo: string]: CurrentCoins;
  } | null>(null);
  const [select, setSelect] = useState(NaN);
  const [nomes, setNomes] = useState<{ key: number; value: string }[] | null>(
    null
  );
  const [search, setSearch] = useState([]);
  const [codigo, setCodigo] = useState("");
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
        setSearch(response.data);
        // console.log(Object.keys(response.data)[0]);

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
    // function getNome() {
    //   if (nomes === null) return;
    //   console.log(select);
    // const nomeFormatado = nomes[Number(select)].value;
    // console.log(nomeFormatado);
    // }

    // getNome();

    async function getMoedaUnica() {
      setMoedaUnica(null);
      if (!Number.isNaN(select)) {
        try {
          const response = await api.get(`last/${Object.keys(search)[select]}`);
          setCodigo(Object.keys(response.data)[0]);
          setMoedaUnica(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("nada");
      }
    }
    getMoedaUnica();
  }, [select]);
  return (
    <ScrollView>
      <View className="flex flex-col bg-cores items-center justify-center align-middle w-max h-max">
        {nomes != null ? (
          <SelectList
            boxStyles={{ marginTop: 20, borderColor: "#B89D59" }}
            inputStyles={{ width: "70%", color: "#C9C9C9" }}
            data={nomes}
            setSelected={(val: number) => setSelect(val)}
            dropdownTextStyles={{ color: "#C9C9C9" }}
            dropdownStyles={{
              borderColor: "#B89D59",
            }}
            placeholder="Escolha uma moeda"
            searchPlaceholder="Escolha uma moeda"
          />
        ) : null}
        {moedaUnica != null ? (
          <View className="flex border-golden border-b-2 rounded-md py-3 px-3 w-80 mt-5 mb-5 items-center">
            <CardCoins coin={moedaUnica[codigo]} />
          </View>
        ) : (
          <></>
        )}
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
