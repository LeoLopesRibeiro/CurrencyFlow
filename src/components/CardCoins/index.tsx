import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { CurrentCoins } from "../../types/current";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import moment from "moment";
import ModalGrafico from "../ModalGrafico";
type PropsCoin = {
  coin: CurrentCoins | null;
};
export default function CardCoins({ coin }: PropsCoin) {



  const [modal, setModal] = useState(false)
  if (coin === null) return <></>;
  // console.log(coin)


  function toggleModal(){
    setModal(!modal)
  }
  return (
    <TouchableOpacity onPress={toggleModal}>
      
    <View className="flex border-gray border rounded-md py-3 px-3 w-80 mt-5 mb-5">
      <View className="flex flex-row w-full justify-between">
        <View>
          <Text className="text-gray font-bold text-xl border-b border-golden w-12">
            {coin.code}
          </Text>
        </View>
        <View className="flex">
          <View className="border-b border-golden w-36">
            <Text className="text-gray-darkness text-right text-xs">
              {coin.name}
            </Text>
            <Text className="text-gray-darkness text-right">
              Data: {moment(coin.create_date).format("DD/MM/YY")}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row w-full justify-between items-center mt-5">
        <View className="flex m-0 p-0">
          <Text className="text-green">Max: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 4 }).format(coin.high)}</Text>
          <Text className="text-red mt-2">Min: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 4 }).format(coin.low)}</Text>
        </View>
      <View className="flex m-0 p-0">
        <Text className="text-gray text-right">Compra: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 4 }).format(coin.bid)}</Text>
        <Text className="text-gray mt-2 text-right">Venda:{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 4 }).format(coin.ask)}</Text>
      </View>
      </View>
      <View>
      {modal ? <ModalGrafico data={coin} visibilidade={modal} toggle={toggleModal}/> : null}
      </View>
    </View>
    
    </TouchableOpacity>
  );
}
