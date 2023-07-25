import { useContext, useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { IconButton } from "react-native-paper";
import IIcon from "react-native-vector-icons/Ionicons";
import SensorData from "../components/sensorData";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { SensorContext } from "../context/sensorContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const SensorWindow = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const { sensor } = route.params;
    const [data, setData] = useState<any>(null);
    const [count, setCount] = useState(0);

    const { getData, deleteSensor } = useContext(SensorContext);
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        getData(sensor.id, userToken).then((data: any) => {
            setData(data);
        });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const counter = count + 1;
            setCount(counter);
        }, 10000);

        return () => {
            clearTimeout(timer);
            getData(sensor.id, userToken).then((data: any) => {
                setData(data);
            });
        };
    }, [count]);

    if (data === null) return <Loading />;

    return (
        <View
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={ActiveOpacity}
                        style={{
                            ...styles.back,
                            backgroundColor: theme().colors.primary,
                        }}>
                        <IIcon
                            name="chevron-back-outline"
                            size={28}
                            color={theme().colors.light}
                            style={{ marginLeft: -3 }}
                        />
                    </TouchableOpacity>

                    <IconButton
                        icon="trash-can-outline"
                        iconColor={theme().colors.light}
                        containerColor={theme().colors.danger}
                        size={20}
                        onPress={() => {
                            deleteSensor(userToken, sensor.id).then(() => {
                                navigation.goBack();
                            });
                        }}
                        style={{
                            position: "absolute",
                            right: 0,
                            marginTop: 0,
                            zIndex: 5,
                        }}
                    />

                    <View style={{ width: "100%" }}>
                        <Text fontSize={25} bold center>
                            {sensor.name}
                        </Text>
                        <View style={styles.token}>
                            <Text fontSize={18}>Token: {sensor.id}</Text>
                            <IconButton
                                icon="content-copy"
                                size={20}
                                containerColor={theme().colors.primary}
                                iconColor={theme().colors.light}
                                onPress={() => {
                                    // Clipboard.setString(sensor.token);
                                }}
                                style={{ marginLeft: 20 }}
                            />
                        </View>

                        <View
                            style={{
                                alignItems: "center",
                                marginTop: 25,
                            }}>
                            {data.length > 0 ? (
                                <View>
                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}>
                                        <View>
                                            <View style={styles.icon}>
                                                <Image
                                                    source={require("../../assets/images/sensor/airHumidity.png")}
                                                    style={styles.image}
                                                />
                                                <Text
                                                    fontSize={18}
                                                    bold
                                                    style={{ marginLeft: 20 }}>
                                                    {data[0].airHumidity.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </Text>
                                            </View>
                                            <View style={styles.icon}>
                                                <Image
                                                    source={require("../../assets/images/sensor/airTemperature.png")}
                                                    style={styles.image}
                                                />
                                                <Text
                                                    fontSize={18}
                                                    bold
                                                    style={{ marginLeft: 20 }}>
                                                    {data[0].airTemperature.toFixed(
                                                        2
                                                    )}
                                                    °C
                                                </Text>
                                            </View>
                                        </View>
                                        <View>
                                            <View style={styles.icon}>
                                                <Image
                                                    source={require("../../assets/images/sensor/soilHumidity.png")}
                                                    style={styles.image2}
                                                />
                                                <Text
                                                    fontSize={18}
                                                    bold
                                                    style={{ marginLeft: 20 }}>
                                                    {data[0].soilMoisture.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </Text>
                                            </View>
                                            <View style={styles.icon}>
                                                <Image
                                                    source={require("../../assets/images/sensor/soilTemperature.png")}
                                                    style={styles.image2}
                                                />
                                                <Text
                                                    fontSize={18}
                                                    bold
                                                    style={{ marginLeft: 20 }}>
                                                    {data[0].soilTemperature.toFixed(
                                                        2
                                                    )}
                                                    °C
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            height: "72%",
                                            alignItems: "center",
                                        }}>
                                        <ScrollView
                                            style={styles.scroll}
                                            overScrollMode="never">
                                            {data.map(
                                                (newData: any, index: any) => (
                                                    <SensorData
                                                        key={index}
                                                        data={newData}
                                                    />
                                                )
                                            )}
                                        </ScrollView>
                                    </View>
                                </View>
                            ) : (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "80%",
                                    }}>
                                    <Text fontSize={18}>No data yet.</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 55,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        marginHorizontal: 50,
    },
    container: {
        height: "90%",
        position: "absolute",
        top: 0,
        width: "100%",
        alignItems: "center",
    },
    back: {
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
    },
    token: {
        marginTop: 40,
        marginRight: 40,
        marginLeft: -10,
        display: "flex",
        flexDirection: "row",
    },
    image: {
        width: 80,
        height: 37,
    },
    image2: {
        width: 50,
        height: 50,
    },
    icon: {
        display: "flex",
        flexDirection: "row",
        marginHorizontal: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
    },
    scroll: {
        width: "100%",
    },
});

export default SensorWindow;
