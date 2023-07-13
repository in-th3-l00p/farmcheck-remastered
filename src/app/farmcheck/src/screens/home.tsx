import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import Grid from "../components/grid";
import Input from "../components/input";
import Modal from "../components/modal";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { FarmContext } from "../context/farmContext";
import { theme } from "../util/theme";

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [farmName, setFarmName] = useState("");
    const [farmDescription, setFarmDescription] = useState("");
    const [error, setError] = useState<string>("");

    const { create } = useContext(FarmContext);
    const { userInfo, userToken }: any = useContext(AuthContext);

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
                    <Grid container style={{ width: "90%" }}>
                        <Grid size={2}>
                            <Image
                                source={require("../../assets/images/defaultWorker.png")}
                                style={styles.image}
                            />
                        </Grid>
                        <Grid size={9}>
                            <Text bold fontSize={22} style={{ marginLeft: 90 }}>
                                {userInfo.username}
                            </Text>
                        </Grid>
                    </Grid>
                </View>
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
                                    })
                                    .catch((err: any) => {
                                        console.log(err);
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
    profileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "80%",
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
});

export default Home;
