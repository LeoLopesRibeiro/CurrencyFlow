import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { CurrentCoins } from "../../types/current";
interface PropsType {
  visibilidade: boolean;
  data: CurrentCoins;
  toggle: () => void;
}
export default function ModalGrafico({ visibilidade, toggle }: PropsType) {
  return (
    <ScrollView>
      <Modal isVisible={visibilidade}>
        <View>
          <TouchableOpacity onPress={toggle}>
            <Text className="text-gray">Nada</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}
