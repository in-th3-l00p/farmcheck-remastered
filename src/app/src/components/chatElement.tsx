import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { AuthContext } from "../context/authContext";
import { ChatContext } from "../context/chatContext";
import { theme } from "../util/theme";
import Grid from "./grid";
import Text from "./text";

interface ChatElementProps {
    chat: any;
    deleted: any;
    user: any;
}

const ChatElement = ({ chat, deleted, user }: ChatElementProps) => {
    const { deleteChat } = useContext(ChatContext);
    const { userToken } = useContext(AuthContext);

    return (
        <View
            style={{
                ...styles.container,
                borderColor: theme().colors.secondary,
            }}>
            <Grid container>
                <Grid size={10}>
                    <Text bold fontSize={18}>
                        {chat.name}
                    </Text>
                    <Text numberOfLines={1}>{chat.description}</Text>
                </Grid>
                {user.role !== "WORKER" && (
                    <Grid size={2}>
                        <IconButton
                            icon="trash-can-outline"
                            iconColor={theme().colors.light}
                            containerColor={theme().colors.danger}
                            size={22}
                            onPress={() => {
                                deleteChat(userToken, chat.id).then(() => {
                                    deleted(true);
                                });
                            }}
                        />
                    </Grid>
                )}
            </Grid>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 3,
        width: "100%",
        padding: 14,
        marginBottom: 12,
    },
});

export default ChatElement;
