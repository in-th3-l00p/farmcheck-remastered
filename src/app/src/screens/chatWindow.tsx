import { Client } from "@stomp/stompjs";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import IIcon from "react-native-vector-icons/Ionicons";
import Input from "../components/input";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const ChatWindow = ({ navigation, route }: { navigation: any; route: any }) => {
    const [text, setText] = useState("");

    const { farm, chat } = route.params;
    const { userToken } = useContext(AuthContext);
    const [client, setClient] = useState<Client>();

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://192.168.125.9:8080/api/v1/ws/chat",
            connectHeaders: {
                Authorization: `Bearer ${userToken}`,
            },
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                setClient(client);
                console.log(client);
                client.subscribe("/topic/chat/" + chat.id, (message) => {
                    console.log(JSON.parse(message.body));
                });
            },
            onStompError: () => {
                console.log("stomp error");
            },
            onWebSocketError: (err) => {
                console.log("websocket error", err);
            },
        });
        client.activate();
    }, []);

    if (client === undefined) return <Loading />;

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
                            {chat.name}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.textBar}>
                <Input
                    placeholder="Type a message"
                    value={text}
                    onChange={(text) => setText(text)}
                    style={{
                        borderWidth: 3,
                        borderColor: theme().colors.lightGrey,
                        height: 50,
                        borderRadius: 60,
                    }}
                />
                <IconButton
                    icon="send"
                    size={28}
                    iconColor={theme().colors.primary}
                    onPress={() => {
                        client.publish({
                            destination: "/app/api/v1/ws/chat/" + chat.id,
                            headers: { token: userToken },
                            body: text,
                        });
                        setText("");
                    }}
                    style={{
                        position: "absolute",
                        right: 0,
                        bottom: -5,
                        backgroundColor: theme().colors.light,
                        borderRadius: 50,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "90%",
        position: "absolute",
        top: 0,
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
    textBar: {
        position: "absolute",
        bottom: 90,
        width: "90%",
    },
});

export default ChatWindow;
