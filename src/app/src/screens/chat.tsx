import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import IIcon from "react-native-vector-icons/Ionicons";
import Button from "../components/button";
import ChatElement from "../components/chatElement";
import ErrorText from "../components/errorText";
import Grid from "../components/grid";
import Input from "../components/input";
import Modal from "../components/modal";
import PageController from "../components/pageController";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Chats = ({ navigation, route }: { navigation: any; route: any }) => {
    const [page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [chatName, setChatName] = useState("");
    const [chatDescription, setChatDescription] = useState("");
    const [error, setError] = useState<string>("");
    const [chatCreated, setChatCreated] = useState(false);
    const [chatCount, setChatCount] = useState(-1);
    const [chats, setChats] = useState<any>([]);
    const [showError, setShowError] = useState(false);

    const { farm, user } = route.params;
    const { create, getCount, getAll } = useContext(ChatContext);
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        getAll(userToken, farm.id, page).then((res: any) => {
            setChatCreated(false);
            setChats(res);
        });
        getCount(userToken, farm.id).then((res: any) => {
            setChatCount(res);
        });
    }, [chatCreated, page]);

    if ((chats.length === 0 && chatCount !== 0) || chatCount === -1)
        return <Loading />;

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
                            Chat rooms
                        </Text>
                    </View>

                    {user.role !== "WORKER" && (
                        <IconButton
                            icon="plus"
                            iconColor={theme().colors.light}
                            size={30}
                            style={styles.add}
                            animated
                            containerColor={theme().colors.primary}
                            onPress={() => setModalVisible(true)}
                        />
                    )}
                </View>
                <View>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        {chats.length === 0 ? (
                            <View
                                style={{
                                    justifyContent: "center",
                                    height: "95%",
                                    width: 250,
                                }}>
                                <Text center>
                                    {user.role === "WORKER"
                                        ? "This farm has no chat rooms yet."
                                        : "This farm has no chat rooms yet. Click the plus icon to create a new chat."}
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.gridContainer}>
                                {chats.map((chat: any, index: any) => (
                                    <TouchableOpacity
                                        activeOpacity={ActiveOpacity}
                                        onPress={() =>
                                            navigation.navigate("ChatWindow", {
                                                chat: chat,
                                                farm: farm,
                                            })
                                        }
                                        key={index}
                                        style={{ width: "100%" }}>
                                        <ChatElement
                                            chat={chat}
                                            key={index}
                                            user={user}
                                            deleted={setChatCreated}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                {chatCount > 5 && (
                    <PageController
                        max={Math.ceil(chatCount / 6) - 1}
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
                                Create new Chat room
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
                                    setChatName("");
                                    setChatDescription("");
                                    setError("");
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
                            placeholder="Chat Name"
                            value={chatName}
                            onChange={setChatName}
                            style={{ width: "100%", marginTop: error ? 0 : 20 }}
                            maxLength={25}
                            errorEmpty={showError && !chatName}
                        />
                        <Input
                            placeholder="Description"
                            value={chatDescription}
                            onChange={setChatDescription}
                            style={{ marginTop: 20, height: "auto" }}
                            multiline
                            maxLength={110}
                            errorEmpty={showError && !chatDescription}
                        />
                    </View>
                    <View>
                        <Button
                            text="Create"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                setShowError(true);

                                if (chatName && chatDescription)
                                    create(
                                        chatName,
                                        chatDescription,
                                        userToken,
                                        farm.id
                                    )
                                        .then(() => {
                                            setError("");
                                            setChatName("");
                                            setChatDescription("");
                                            setModalVisible(false);
                                            setChatCreated(true);
                                            setShowError(false);
                                        })
                                        .catch((err: any) => {
                                            console.log(err);
                                            if (
                                                err.message ===
                                                "Request failed with status code 400"
                                            )
                                                setError(
                                                    "chat name already exists"
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
        marginTop: 25,
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
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 40,
    },
});

export default Chats;
