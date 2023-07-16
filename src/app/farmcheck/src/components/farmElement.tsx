import { Image, StyleSheet, View } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

const FarmElement = (farm: any) => {
    farm = farm.farm;
    return (
        <View
            style={{
                ...styles.container,
                borderColor: theme().colors.secondary,
            }}>
            <Image
                style={styles.image}
                source={require("../../assets/images/defaultAdmin.png")}
            />
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    marginLeft: 20,
                    width: "60%",
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
        height: 95,
        borderRadius: 20,
        borderWidth: 3,
        width: 320,
        padding: 20,
        paddingHorizontal: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },
});

export default FarmElement;
