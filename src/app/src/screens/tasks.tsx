import { useContext, useEffect, useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import IIcon from "react-native-vector-icons/Ionicons";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import Grid from "../components/grid";
import Input from "../components/input";
import Modal from "../components/modal";
import PageController from "../components/pageController";
import TaskElement from "../components/taskElement";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { TaskContext } from "../context/taskContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Tasks = ({ navigation, route }: { navigation: any; route: any }) => {
    const [page, setPage] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [error, setError] = useState<string>("");
    const [taskCreated, setTaskCreated] = useState(false);
    const [taskCount, setTaskCount] = useState(-1);
    const [tasks, setTasks] = useState<any>([]);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const [showError, setShowError] = useState(false);

    const { farm, user } = route.params;
    const { create, getCountFromFarm, getAllFromFarm } =
        useContext(TaskContext);
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        getAllFromFarm(userToken, farm.id, page).then((res: any) => {
            setTaskCreated(false);
            setTasks(res);
        });
        getCountFromFarm(userToken, farm.id).then((res: any) => {
            setTaskCount(res);
        });
    }, [taskCreated, page]);

    if ((tasks.length === 0 && taskCount !== 0) || taskCount === -1)
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
                            Tasks
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
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        {tasks.length === 0 ? (
                            <View
                                style={{
                                    justifyContent: "center",
                                    height: "95%",
                                    width: 250,
                                }}>
                                <Text center>
                                    You have no tasks yet. Click the plus icon
                                    to create a new task.
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.gridContainer}>
                                {tasks.map((task: any, index: any) => (
                                    <TaskElement
                                        task={task}
                                        key={index}
                                        farm={farm}
                                        user={user}
                                        deleted={setTaskCreated}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                {taskCount > 5 && (
                    <PageController
                        max={Math.ceil(taskCount / 6) - 1}
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
                                Create new Task
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
                                    setTaskName("");
                                    setTaskDescription("");
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
                            placeholder="Task Name"
                            value={taskName}
                            onChange={setTaskName}
                            style={{ width: "100%", marginTop: error ? 0 : 20 }}
                            maxLength={25}
                            errorEmpty={showError && !taskName}
                        />
                        <Input
                            placeholder="Description"
                            value={taskDescription}
                            onChange={setTaskDescription}
                            style={{ marginTop: 20, height: "auto" }}
                            multiline
                            maxLength={110}
                            errorEmpty={showError && !taskDescription}
                        />
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                                marginLeft: 5,
                            }}>
                            <Text fontSize={16}>Important: </Text>
                            <Switch
                                trackColor={{
                                    false: theme().colors.grey,
                                    true: theme().colors.lightGrey,
                                }}
                                thumbColor={
                                    isEnabled
                                        ? theme().colors.secondary
                                        : theme().colors.light
                                }
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={{ marginTop: 2 }}
                            />
                        </View>
                    </View>
                    <View>
                        <Button
                            text="Create"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                setShowError(true);

                                if (taskName && taskDescription)
                                    create(
                                        taskName,
                                        taskDescription,
                                        isEnabled,
                                        userToken,
                                        farm.id
                                    )
                                        .then(() => {
                                            setError("");
                                            setTaskName("");
                                            setTaskDescription("");
                                            setModalVisible(false);
                                            setTaskCreated(true);
                                            setShowError(false);
                                        })
                                        .catch((err: any) => {
                                            console.log(err);
                                            if (
                                                err.message ===
                                                "Request failed with status code 400"
                                            )
                                                setError(
                                                    "Task name already exists"
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

export default Tasks;
