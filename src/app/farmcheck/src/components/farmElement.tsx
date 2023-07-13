import { Image, StyleSheet, View } from "react-native";
import { getRandomColor } from "../util/utils";
import Text from "./text";

const FarmElement = (farm: any) => {
    farm = farm.farm;
    return (
        <View style={{ ...styles.container, borderColor: getRandomColor() }}>
            <Image
                style={styles.image}
                source={require("../../assets/favicon.png")}
            />
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    marginLeft: 20,
                    width: "75%",
                }}>
                <Text bold fontSize={16}>
                    {farm.name}
                </Text>
                <Text fontSize={12}>{farm.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 90,
        borderRadius: 20,
        borderWidth: 2,
        width: 320,
        padding: 20,
        paddingHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    image: {
        width: 50,
        height: 50,
    },
});

export default FarmElement;
