import { Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { LineChart } from "react-native-chart-kit";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";
import { api } from "../../services/api";
import moment from "moment";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
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
  const [dataGrafico, setDataGrafico] = useState<LineChartData | null
  >(null);
  const dataAnterior = moment().subtract(7, "days").calendar();
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
          `/${data.code}-${data.codein}/7?start_date=${dataAnteriorFormatada[2]}${dataAnteriorFormatada[0]}${dataAnteriorFormatada[1]}&end_date=${datahj}`
        );
        console.log( `/${data.code}-${data.codein}/7?start_date=${dataAnteriorFormatada[2]}${dataAnteriorFormatada[0]}${dataAnteriorFormatada[1]}&end_date=${datahj}`);
        const dataGraficoLocal: any = { labels: [], datasets: [{ data: [],  }] };
        response.data.forEach((item: any, index: any) => {
          dataGraficoLocal.labels.push(
            moment(response.data[0].create_date)
              .subtract(index, "days")
              .format("DD/MM")
          );
          dataGraficoLocal.datasets[0].data.push(Number(item.bid))
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
      <Modal isVisible={visibilidade} className="m-2 w-full flex justify-evenly">
        <View className="w-full m-0">
     
        {dataGrafico != null && (
              <LineChart
              data={dataGrafico}
              width={Dimensions.get('window').width - 15} // from react-native
              height={300}
              yAxisLabel={'R$'} 
              yLabelsOffset={5}
              
              chartConfig={{
                // backgroundColor: '#1cc910',
                backgroundGradientFrom: '#1C1C1C',
                backgroundGradientTo: '#1C1C1C',
               fillShadowGradient: "#C9C9C9",
               fillShadowGradientFromOffset: 1,
                decimalPlaces: 3, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(184, 157, 89, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
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
             
            )}
         
        </View>
        <TouchableOpacity onPress={toggle} className=" w-full flex items-center border rounded-md r">
            <Text className=" text-golden">X</Text>
           
          </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
}
