import { View } from "react-native";
import Text from "../components/text";

const FarmWindow = ({ navigation, route }: { navigation: any; route: any }) => {
    const { farm } = route.params;

    return (
        <View
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Text>{farm.name}</Text>
        </View>
    );
};

export default FarmWindow;
