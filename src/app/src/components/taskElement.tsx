import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Grid from "./grid";
import Modal from "./modal";
import Text from "./text";

interface TaskElementProps {
    task: any;
    farm: any;
}

const calculateTime = (left: number) => {
    if (left < 0) return "Expired";

    let days = Math.floor(left / (1000 * 60 * 60 * 24));
    let hours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d, ${hours}h, ${minutes}m`;
};

const TaskElement = ({ task, farm }: TaskElementProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    const date = new Date(task.deadline);
    const time = calculateTime(date.getTime() - Date.now());

    return (
        <View
            style={{
                ...styles.container,
                borderColor: theme().colors.secondary,
            }}>
            <TouchableOpacity
                activeOpacity={ActiveOpacity}
                onPress={() => {
                    setModalVisible(true);
                }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text bold fontSize={18}>
                        {task.name} {task.important ? " - " : ""}
                    </Text>
                    <Text bold fontSize={18} color={theme().colors.danger}>
                        {task.important ? " IMPORTANT" : ""}
                    </Text>
                </View>
                <Text numberOfLines={1}>{task.description}</Text>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text>Time left: </Text>
                    <Text
                        bold
                        color={
                            time === "Expired"
                                ? theme().colors.danger
                                : theme().colors.dark
                        }>
                        {time}
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <View style={{ width: "80%" }}>
                    <Grid container>
                        <Grid size={10}>
                            <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                <Text bold fontSize={18}>
                                    {task.name} {task.important ? " - " : ""}
                                </Text>
                                <Text
                                    bold
                                    fontSize={18}
                                    color={theme().colors.danger}>
                                    {task.important ? " IMPORTANT" : ""}
                                </Text>
                            </View>
                        </Grid>
                        <Grid size={2}>
                            <IconButton
                                icon="close"
                                iconColor={theme().colors.dark}
                                size={24}
                                style={styles.icon}
                                animated
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Text>{task.description}</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 10,
                        }}>
                        <Text fontSize={16}>Time left: </Text>
                        <Text
                            bold
                            color={
                                time === "Expired"
                                    ? theme().colors.danger
                                    : theme().colors.dark
                            }>
                            {time}
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 3,
        width: "100%",
        padding: 15,
        marginBottom: 11,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
});

export default TaskElement;
