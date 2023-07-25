import { Image, StyleSheet, View } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

interface SensorElementProps {
    sensor: any;
    data?: any;
}

const SensorElement = ({ sensor }: SensorElementProps) => {
    return (
        <View
            style={{
                ...styles.container,
                borderColor: theme().colors.secondary,
            }}>
            <Image
                source={require("../../assets/images/defaultAdmin.png")}
                style={styles.image}
            />
            <Text>{sensor.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: 120,
        height: 150,
        borderWidth: 3,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 15,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});

export default SensorElement;
