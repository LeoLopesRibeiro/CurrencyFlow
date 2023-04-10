import { View, Text, ScrollView } from "react-native";
import { CurrentCoins } from "../../types/current";
import { useEffect, useState } from "react";
import moment from "moment";
import { api } from "../../services/api";
type PropsCoin = {
  coin: CurrentCoins | null;
};
export default function CardCoins({ coin }: PropsCoin) {
  if (coin === null) return <></>;
  // console.log(coin)
  return (
    
    <View className="flex border-gray border rounded-md py-3 px-3 w-80">
      <View>
        <Text>{coin.code}</Text>
        <Text>{coin.name}</Text>
        <Text className=" text-gray">Data: {moment(coin.create_date).format("DD/MM/YY hh:mm:ss")}</Text>
      </View>
      <Text className="">{coin.ask}</Text>
      <Text className="">{coin.bid}</Text>
      <Text className="">{coin.high}</Text>
      <Text className="">{coin.low}</Text>
    </View>
  );
}
