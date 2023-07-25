import { StyleSheet, View } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

const SensorData = (data: any) => {
    data = data.data;

    const date = new Date(data.createdAt);
    return (
        <View
            style={{
                ...styles.container,
                borderColor: theme().colors.secondary,
            }}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                <Text style={{ marginRight: 20 }}>
                    Air Humidity: {data.airHumidity.toFixed(1)}%
                </Text>
                <Text>Air Temperature: {data.airTemperature.toFixed(1)}°C</Text>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                <Text style={{ marginRight: 20 }}>
                    Soil Moisture: {data.soilMoisture.toFixed(1)}%
                </Text>
                <Text>
                    Soil Temperature: {data.soilTemperature.toFixed(1)}°C
                </Text>
            </View>
            <Text>
                Time: {date.getDate()}.{date.getMonth()}.{date.getFullYear()}{" "}
                {date.getHours()}:{date.getMinutes()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: "90%",
        borderWidth: 3,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        marginHorizontal: 20,
    },
});

export default SensorData;
