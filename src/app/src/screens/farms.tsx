import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import FarmElement from "../components/farmElement";
import Grid from "../components/grid";
import Input from "../components/input";
import Modal from "../components/modal";
import PageController from "../components/pageController";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { FarmContext } from "../context/farmContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Farms = ({ navigation }: { navigation: any }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [farmName, setFarmName] = useState("");
    const [farmDescription, setFarmDescription] = useState("");
    const [error, setError] = useState<string>("");
    const [farms, setFarms] = useState<any>([]);
    const [farmCreated, setFarmCreated] = useState(false);
    const [users, setUsers] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [farmCount, setFarmCount] = useState(-1);
    const [showError, setShowError] = useState(false);

    const { create, getAll, getUsers, getCount } = useContext(FarmContext);
    const { userToken }: any = useContext(AuthContext);

    useEffect(() => {
        const getFarmUsers = async (res: any) => {
            const allUsers: any = [];

            for (const farm of res) {
                const farmUsers = await getUsers(userToken, farm.id);
                allUsers.push(farmUsers);
            }

            return allUsers;
        };

        getAll(userToken, page).then((res: any) => {
            setFarmCreated(false);
            setFarms(res);

            getFarmUsers(res).then((res: any) => {
                setUsers(res);
            });
        });

        getCount(userToken).then((res: any) => {
            setFarmCount(res);
        });
    }, [farmCreated, page]);

    if (
        (farms.length === 0 && farmCount !== 0) ||
        farmCount === -1 ||
        users.length !== farms.length
    )
        return <Loading />;

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
                                size={30}
                                style={styles.icon}
                                animated
                                containerColor={theme().colors.primary}
                                onPress={() => setModalVisible(true)}
                            />
                        </Grid>
                    </Grid>
                </View>

                <View
                    style={{
                        width: "100%",
                    }}>
                    <View style={{ alignItems: "center" }}>
                        {farms.length === 0 ? (
                            <View
                                style={{
                                    height: "90%",
                                    justifyContent: "center",
                                    width: 250,
                                }}>
                                <Text center>
                                    You have no farms yet. Click the plus icon
                                    to create a new farm.
                                </Text>
                            </View>
                        ) : (
                            <View>
                                {farms.map(
                                    (farm: any, index: any) =>
                                        index < 5 && (
                                            <TouchableOpacity
                                                key={index}
                                                activeOpacity={ActiveOpacity}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        "Window",
                                                        {
                                                            farm: farm,
                                                            users: users[index],
                                                        }
                                                    );
                                                }}>
                                                <FarmElement
                                                    farm={farm}
                                                    users={users[index]}
                                                    key={index}
                                                />
                                            </TouchableOpacity>
                                        )
                                )}
                            </View>
                        )}
                    </View>
                </View>
                {farmCount > 5 && (
                    <PageController
                        max={Math.ceil(farmCount / 5) - 1}
                        page={page}
                        setPage={setPage}
                        position="absolute"
                        style={{ bottom: 12 }}
                    />
                )}
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
                                    setShowError(false);
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
                            maxLength={25}
                            errorEmpty={showError && !farmName}
                        />
                        <Input
                            placeholder="Description"
                            value={farmDescription}
                            onChange={setFarmDescription}
                            style={{ marginTop: 20, height: "auto" }}
                            multiline
                            maxLength={110}
                            errorEmpty={showError && !farmDescription}
                        />
                    </View>
                    <View>
                        <Button
                            text="Create"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                setShowError(true);

                                if (farmName && farmDescription)
                                    create(farmName, farmDescription, userToken)
                                        .then(() => {
                                            setFarmName("");
                                            setFarmDescription("");
                                            setError("");
                                            setModalVisible(false);
                                            setFarmCreated(true);
                                            setShowError(false);
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
