import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import IIcon from "react-native-vector-icons/Ionicons";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import Grid from "../components/grid";
import Input from "../components/input";
import Modal from "../components/modal";
import PageController from "../components/pageController";
import SensorElement from "../components/sensorElement";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { SensorContext } from "../context/sensorContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

const Sensors = ({ navigation, route }: { navigation: any; route: any }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [sensorName, setSensorName] = useState("");
    const [sensorDescription, setSensorDescription] = useState("");
    const [error, setError] = useState<string>("");
    const [sensorCreated, setSensorCreated] = useState(false);
    const [sensorCount, setSensorCount] = useState(-1);
    const [sensors, setSensors] = useState<any>([]);

    const { farm } = route.params;
    const { create, getCount, getAll } = useContext(SensorContext);
    const { userToken } = useContext(AuthContext);

    const sensor = {};
    const data: any = [];

    useEffect(() => {
        getAll(userToken, farm.id, page).then((res: any) => {
            setSensorCreated(false);
            setSensors(res);
        });

        getCount(userToken, farm.id).then((res: any) => {
            setSensorCount(res);
        });
    }, [sensorCreated, page]);

    // if (
    //     (sensors.length === 0 && sensorCount !== 0) ||
    //     sensorCount === -1
    // )
    //     return <Loading />;

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

                    <View style={{ width: "100%" }}>
                        <Text fontSize={25} bold center>
                            Sensors
                        </Text>
                    </View>

                    <IconButton
                        icon="plus"
                        iconColor={theme().colors.light}
                        size={30}
                        style={styles.add}
                        animated
                        containerColor={theme().colors.primary}
                        onPress={() => setModalVisible(true)}
                    />
                </View>

                <View>
                    <Searchbar
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={(query) => setSearchQuery(query)}
                        style={{
                            ...styles.search,
                            backgroundColor: theme().colors.lightGrey,
                        }}
                        inputStyle={{
                            ...styles.input,
                            color: theme().colors.dark,
                        }}
                    />
                </View>
                <View style={{ width: "100%" }}>
                    <View style={{ alignItems: "center" }}>
                        {sensors.length === 0 ? (
                            <View
                                style={{
                                    justifyContent: "center",
                                    height: "90%",
                                    width: 250,
                                }}>
                                <Text center>
                                    You have no sensors yet. Click the plus icon
                                    to create a new sensor.
                                </Text>
                            </View>
                        ) : (
                            <View>
                                {sensors.map(
                                    (farm: any, index: any) =>
                                        index < 5 && (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={ActiveOpacity}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "Window",
                                                        {
                                                            sensor: sensor,
                                                            data: data,
                                                        }
                                                    );
                                                }}>
                                                <SensorElement
                                                    sensor={sensor}
                                                    data={data[index]}
                                                    key={index}
                                                />
                                            </TouchableOpacity>
                                        )
                                )}
                            </View>
                        )}
                    </View>
                </View>
                {sensorCount > 5 && (
                    <PageController
                        max={0}
                        page={page}
                        setPage={setPage}
                        position="absolute"
                        style={{ bottom: 0 }}
                    />
                )}
            </View>

            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <View>
                    <Grid container style={{ width: "80%" }}>
                        <Grid size={10.5}>
                            <Text fontSize={18} bold>
                                Create new Sensor
                            </Text>
                        </Grid>
                        <Grid size={1.5}>
                            <IconButton
                                icon="close"
                                iconColor={theme().colors.dark}
                                size={24}
                                style={styles.icon}
                                animated
                                onPress={() => {
                                    setModalVisible(false);
                                    setSensorName("");
                                    setSensorDescription("");
                                    setError("");
                                }}
                            />
                        </Grid>
                    </Grid>
                    {error && (
                        <View style={{ marginVertical: 10, marginRight: 10 }}>
                            <ErrorText text={error} />
                        </View>
                    )}
                    <View style={{ width: "80%" }}>
                        <Input
                            placeholder="Sensor Name"
                            value={sensorName}
                            onChange={setSensorName}
                            style={{ width: "100%", marginTop: error ? 0 : 20 }}
                            maxLength={25}
                        />
                        <Input
                            placeholder="Description"
                            value={sensorDescription}
                            onChange={setSensorDescription}
                            style={{ marginTop: 20, height: "auto" }}
                            multiline
                            maxLength={110}
                        />
                    </View>
                    <View>
                        <Button
                            text="Create"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                create(sensorName, sensorDescription, userToken)
                                    .then(() => {
                                        setError("");
                                        setSensorName("");
                                        setSensorDescription("");
                                        setModalVisible(false);
                                        setSensorCreated(true);
                                    })
                                    .catch((err: any) => {
                                        if (
                                            err.message ===
                                            "Request failed with status code 400"
                                        )
                                            setError(
                                                "Farm name already exists"
                                            );
                                        else setError(err.message);
                                    });
                            }}
                            full
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "90%",
        position: "absolute",
        top: 0,
        width: "100%",
        alignItems: "center",
    },
    titleContainer: {
        marginTop: 55,
        display: "flex",
        flexDirection: "row",
        position: "relative",
        marginHorizontal: 50,
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
    search: {
        marginTop: 35,
        width: 310,
        alignSelf: "center",
        height: 40,
    },
    input: {
        top: -8,
    },
    add: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: -40,
        marginTop: 0,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
});

export default Sensors;
