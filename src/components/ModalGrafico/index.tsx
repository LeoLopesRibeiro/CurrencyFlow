import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { LineChart } from "react-native-chart-kit";
import { api } from "../../services/api";
import moment from "moment";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { CurrentCoins, DataType } from "../../types/current";
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
  const [dataGrafico, setDataGrafico] = useState<LineChartData | null>(null);
  const dataAnterior = moment().subtract(7, "days").calendar();
  const datahj = moment().format("YYYYMMDD");

  const dataAnteriorFormatada = dataAnterior.split("/");

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(
          `/${data.code}-${data.codein}/5?start_date=${dataAnteriorFormatada[2]}${dataAnteriorFormatada[0]}${dataAnteriorFormatada[1]}&end_date=${datahj}`
        );
        // console.log(response.data)
        // console.log( `/${data.code}-${data.codein}/5?start_date=${dataAnteriorFormatada[2]}${dataAnteriorFormatada[0]}${dataAnteriorFormatada[1]}&end_date=${datahj}`);
        const dataGraficoLocal: DataType = {
          labels: [],
          datasets: [{ data: [] }],
        };
        response.data.forEach((item: CurrentCoins, index: number) => {
          dataGraficoLocal.labels.push(
            moment(response.data[0].create_date)
              .subtract(index, "days")
              .format("DD/MM")
          );
          dataGraficoLocal.datasets[0].data.push(Number(item.bid));
        });
        dataGraficoLocal.labels.reverse();
        console.log(dataGraficoLocal.datasets[0].data);
        setDataGrafico(dataGraficoLocal);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <ScrollView>
      <Modal isVisible={visibilidade} className="m-2 w-full flex">
        <View className="flex bg-cores right-2 m-2 rounded-md">
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={toggle}
              className="flex w-min items-start top-3 left-3"
            >
              <AntDesign
                className=" text"
                name="closecircleo"
                size={24}
                color="#C9C9C9"
              />
            </TouchableOpacity>
            <TouchableOpacity className="w-min flex items-end right-5 top-3">
              <AntDesign name="hearto" size={24} color="#C9C9C9" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray font-bold border-b border-golden top-5 text-center my-3">
            {data.name}
          </Text>
          <View className="w-full m-0">
            {dataGrafico != null ? (
              <LineChart
                data={dataGrafico}
                width={Dimensions.get("window").width - 15} // from react-native
                height={300}
                yAxisLabel={"R$"}
                // yLabelsOffset={-10}
                chartConfig={{
                  // backgroundColor: '#1cc910',
                  backgroundGradientFrom: "#1C1C1C",
                  backgroundGradientTo: "#1C1C1C",
                  fillShadowGradient: "#C9C9C9",
                  propsForHorizontalLabels: {
                    x: 60,
                  },
                  fillShadowGradientFromOffset: 1,
                  decimalPlaces: 3, // optional, defaults to 2
                  color: (opacity = 1) => `rgba(184, 157, 89, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForLabels: {
                    fontSize: 10,
                  },
                  // propsForDots:{
                  //   r: "4",
                  //   strokeWidth: "2",
                  //   stroke: "#B89D59"
                  // }
                }}
                bezier
                style={{
                  paddingTop: 30,
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            ) : null}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
