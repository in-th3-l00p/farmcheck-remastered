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
                    Air Humidity: {data.airHumidity}%
                </Text>
                <Text>Air Temperature: {data.airTemperature}°C</Text>
            </View>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                <Text style={{ marginRight: 20 }}>
                    Soil Moisture: {data.soilMoisture}%
                </Text>
                <Text>Soil Temperature: {data.soilTemperature}°C</Text>
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
        width: "100%",
        borderWidth: 3,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});

export default SensorData;
