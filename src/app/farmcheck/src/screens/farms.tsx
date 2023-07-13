import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import FarmElement from "../components/farmElement";
import Grid from "../components/grid";
import Input from "../components/input";
import Modal from "../components/modal";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { FarmContext } from "../context/farmContext";
import { theme } from "../util/theme";

const Farms = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [farmName, setFarmName] = useState("");
    const [farmDescription, setFarmDescription] = useState("");
    const [error, setError] = useState<string>("");
    const [farms, setFarms] = useState<any>([]);
    const [farmCreated, setFarmCreated] = useState(false);

    const { create, getAll } = useContext(FarmContext);
    const { userToken }: any = useContext(AuthContext);

    useEffect(() => {
        getAll(userToken).then((res: any) => {
            setFarmCreated(false);
            setFarms(res);
        });
    }, [farmCreated]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <View style={styles.container}>
                <View style={{ marginTop: 50, marginBottom: 20 }}>
                    <Grid container>
                        <Grid size={8}>
                            <Text bold fontSize={25}>
                                Your Farms
                            </Text>
                        </Grid>
                        <Grid size={2}>
                            <IconButton
                                icon="plus"
                                iconColor={theme().colors.light}
                                size={24}
                                style={styles.icon}
                                animated
                                containerColor={theme().colors.primary}
                                onPress={() => setModalVisible(true)}
                            />
                        </Grid>
                    </Grid>
                </View>

                <ScrollView style={styles.scroll} overScrollMode="never">
                    <View style={{ alignItems: "center" }}>
                        {farms.length < 0 ? (
                            <View>
                                <Text>
                                    You have no farms yet. Click the plus icon
                                    to create a
                                </Text>
                            </View>
                        ) : (
                            <View>
                                {farms.map((farm: any, index: any) => (
                                    <FarmElement farm={farm} key={index} />
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>

            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <View>
                    <Grid container style={{ width: "80%" }}>
                        <Grid size={10.5}>
                            <Text fontSize={18} bold>
                                Create new Farm
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
                                    setError("");
                                    setFarmName("");
                                    setFarmDescription("");
                                    setModalVisible(false);
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
                            placeholder="Farm Name"
                            value={farmName}
                            onChange={setFarmName}
                            style={{ width: "100%", marginTop: error ? 0 : 20 }}
                        />
                        <Input
                            placeholder="Description"
                            value={farmDescription}
                            onChange={setFarmDescription}
                            style={{ marginTop: 20, height: "auto" }}
                            multiline
                        />
                    </View>
                    <View>
                        <Button
                            text="Create"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                create(farmName, farmDescription, userToken)
                                    .then(() => {
                                        setFarmName("");
                                        setFarmDescription("");
                                        setError("");
                                        setModalVisible(false);
                                        setFarmCreated(true);
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
        height: "92%",
        position: "absolute",
        top: -5,
        width: "100%",
        alignItems: "center",
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
    scroll: {
        width: "100%",
    },
});

export default Farms;
