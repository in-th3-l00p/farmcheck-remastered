import { useContext, useRef, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { IconButton } from "react-native-paper";
import FIcon from "react-native-vector-icons/FontAwesome5";
import IIcon from "react-native-vector-icons/Ionicons";
import MIcon from "react-native-vector-icons/MaterialIcons";
import Grid from "../components/grid";
import Modal from "../components/modal";
import Text from "../components/text";
import User from "../components/user";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const FarmWindow = ({ navigation, route }: { navigation: any; route: any }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { farm, users } = route.params;
    const { userInfo } = useContext(AuthContext);

    const scrollVieRef = useRef<ScrollView>(null);
    const user = users.find((user: any) => user.id === userInfo.id);

    if (users === undefined) return <Loading />;

    return (
        <View
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Image
                style={styles.backgroundImage}
                source={require("../../assets/images/farm.png")}
            />
            <View style={styles.container}>
                <View
                    style={{
                        marginTop: 55,
                        marginBottom: 20,
                        display: "flex",
                        flexDirection: "row",
                        position: "relative",
                    }}>
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

                    <TouchableOpacity
                        activeOpacity={ActiveOpacity}
                        style={{
                            ...styles.icon,
                            position: "absolute",
                            right: 0,
                            marginRight: 50,
                            backgroundColor: theme().colors.primary,
                        }}
                        onPress={() => setModalVisible(true)}>
                        <FIcon
                            name="user-friends"
                            size={18}
                            color={theme().colors.light}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: "center",
                    }}>
                    <Image
                        style={{
                            ...styles.image,
                            borderColor: theme().colors.background,
                        }}
                        source={require("../../assets/images/defaultFarm.png")}
                    />
                    <Text bold fontSize={22} center>
                        {farm.name}
                    </Text>
                    <Text
                        fontSize={16}
                        style={{ width: 250, marginTop: 10 }}
                        center>
                        {farm.description}
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 20,
                        alignItems: "center",
                    }}>
                    <User user={user} farmId={farm.id} />
                </View>

                <View style={{ position: "absolute", bottom: 30 }}>
                    <Grid
                        container
                        style={{
                            width: "85%",
                            marginLeft: 50,
                            marginTop: 20,
                        }}>
                        <Grid size={6}>
                            <TouchableOpacity
                                activeOpacity={ActiveOpacity}
                                style={{
                                    ...styles.button,
                                    backgroundColor: theme().colors.background,
                                    borderColor: theme().colors.secondary,
                                }}
                                onPress={() =>
                                    navigation.navigate("Chat", {
                                        farm: farm,
                                        user: user,
                                    })
                                }>
                                <IIcon
                                    name="chatbox-ellipses"
                                    size={40}
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 4 }}
                                />
                                <Text
                                    bold
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 10 }}
                                    fontSize={18}>
                                    Chat
                                </Text>
                            </TouchableOpacity>
                        </Grid>
                        <Grid size={6}>
                            <TouchableOpacity
                                activeOpacity={ActiveOpacity}
                                style={{
                                    ...styles.button,
                                    backgroundColor: theme().colors.background,
                                    borderColor: theme().colors.secondary,
                                }}
                                onPress={() =>
                                    navigation.navigate("Sensors", {
                                        farm: farm,
                                        user: user,
                                    })
                                }>
                                <MIcon
                                    name="wifi-tethering"
                                    size={40}
                                    color={theme().colors.secondary}
                                />
                                <Text
                                    bold
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 10 }}
                                    fontSize={18}>
                                    Sensors
                                </Text>
                            </TouchableOpacity>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        style={{ width: "85%", marginLeft: 50, marginTop: 20 }}>
                        <Grid size={6}>
                            <TouchableOpacity
                                activeOpacity={ActiveOpacity}
                                style={{
                                    ...styles.button,
                                    backgroundColor: theme().colors.background,
                                    borderColor: theme().colors.secondary,
                                }}
                                onPress={() =>
                                    navigation.navigate("Tasks", { farm: farm })
                                }>
                                <FIcon
                                    name="tasks"
                                    size={40}
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 1 }}
                                />
                                <Text
                                    bold
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 10 }}
                                    fontSize={18}>
                                    Tasks
                                </Text>
                            </TouchableOpacity>
                        </Grid>
                        <Grid size={6}>
                            <TouchableOpacity
                                activeOpacity={ActiveOpacity}
                                style={{
                                    ...styles.button,
                                    backgroundColor: theme().colors.background,
                                    borderColor: theme().colors.secondary,
                                }}>
                                <IIcon
                                    name="settings"
                                    size={40}
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 1 }}
                                />
                                <Text
                                    bold
                                    color={theme().colors.secondary}
                                    style={{ marginTop: 10 }}
                                    fontSize={18}>
                                    Settings
                                </Text>
                            </TouchableOpacity>
                        </Grid>
                    </Grid>
                </View>
            </View>

            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <View style={{ height: "80%" }}>
                    <Grid container style={{ width: "80%" }}>
                        <Grid size={10.5}>
                            <Text fontSize={20} bold>
                                Users
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

                                    scrollVieRef.current?.scrollTo({
                                        y: 0,
                                        animated: true,
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                    <View style={{ height: 480, marginTop: 10 }}>
                        <ScrollView
                            ref={scrollVieRef}
                            style={styles.scroll}
                            overScrollMode="never"
                            contentContainerStyle={{
                                alignItems: "center",
                            }}>
                            {users.map((user: any, index: any) =>
                                user.role === "OWNER" ? (
                                    <View
                                        style={{ marginBottom: 20 }}
                                        key={index}>
                                        <User
                                            key={index}
                                            user={user}
                                            farmId={farm.id}
                                        />
                                    </View>
                                ) : (
                                    <View
                                        style={{ marginBottom: 20 }}
                                        key={index}>
                                        <User
                                            key={index}
                                            user={user}
                                            changable
                                            farmId={farm.id}
                                        />
                                    </View>
                                )
                            )}
                        </ScrollView>
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
    },
    profileContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "80%",
    },
    back: {
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 50,
    },
    button: {
        borderRadius: 15,
        width: 120,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 5,
        marginTop: 15,
        marginBottom: 10,
    },
    backgroundImage: {
        width: "100%",
        height: 175,
        position: "absolute",
        top: 0,
        opacity: 0.4,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    scroll: {
        width: 250,
    },
});

export default FarmWindow;
