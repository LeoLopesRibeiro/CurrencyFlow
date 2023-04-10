import {View, Text} from "react-native"
import {CurrentCoins} from "../../types/current"

type PropsCoin ={
    coin: CurrentCoins | null;
}
export default function CardCoins({coin}: PropsCoin){

    if(coin === null) return <></>
    console.log(coin)
    return(
        <View className="">
            <Text>{coin.code}</Text>
            <Text className=" text-white">{coin.code}</Text>
            <Text className="">{coin.code}</Text>
        </View>
    )
}