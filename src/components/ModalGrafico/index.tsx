import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { api } from "../../services/api";
import moment from "moment";
import { CurrentCoins } from "../../types/current";
interface PropsType {
  visibilidade: boolean;
  data: CurrentCoins;
  toggle: () => void;
}

export default function ModalGrafico({
  visibilidade,
  toggle,
  data,
}: PropsType) {
  const [dataGrafico, setDataGrafico] = useState<
    { x: string | number; y: string | number }[] | null
  >(null);
  const dataAnterior = moment().subtract(8, "days").calendar();
  const datahj = moment().format("YYYYMMDD");

  const dataAnteriorFormatada = dataAnterior.split("/");
  console.log(
    dataAnteriorFormatada[2],
    dataAnteriorFormatada[0],
    dataAnteriorFormatada[1]
  );
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(
          `/${data.code}-${data.codein}/8?start_date=${dataAnteriorFormatada[2]}${dataAnteriorFormatada[0]}${dataAnteriorFormatada[1]}&end_date=${datahj}`
        );
        console.log(response.data);
        const dataGraficoLocal: any = [];
        response.data.forEach((item: any, index: any) => {
          dataGraficoLocal.push({
            x:  moment(response.data[0].create_date)
            .subtract(index, "days")
            .format("DD/MM"),
            y: Number(item.bid),
          });
        });
        setDataGrafico(dataGraficoLocal);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <ScrollView>
      <Modal isVisible={visibilidade}>
        <View className=" bg-gray w-full">
          <TouchableOpacity onPress={toggle}>
            <Text className="">Nada</Text>
            {dataGrafico != null && (
              <VictoryChart theme={VictoryTheme.material} domainPadding={10} >
                <VictoryLine
                width={20}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
                  style={{
                    data: { stroke: "#B89D59", },
                    parent: {},
                    
                  }}
                  data={dataGrafico}
                />
              </VictoryChart>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}
