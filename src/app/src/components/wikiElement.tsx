import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { IconButton } from "react-native-paper";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Grid from "./grid";
import Modal from "./modal";
import Text from "./text";

const rename = (name: string) => {
    name = name.replace(/_/g, " ");
    const words = name.split(" ");

    for (let i = 0; i < words.length; i++)
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    return words.join(" ");
};

const WikiElement = ({
    name,
    imgSrc,
    file,
    heart,
    setHeart,
}: {
    name: string;
    imgSrc: any;
    file: string;
    heart: boolean;
    setHeart?: any;
}) => {
    const [modalVisible, setModalVisible] = useState(false);

    name = rename(name);

    return (
        <>
            <View
                style={{
                    ...styles.container,
                    backgroundColor: theme().colors.lightGrey,
                }}>
                <TouchableOpacity
                    activeOpacity={ActiveOpacity}
                    onPress={() => setModalVisible(true)}>
                    <View style={{ position: "relative" }}>
                        <Image source={imgSrc} style={styles.image} />
                        {/* <IconButton
                            icon={heart ? "heart" : "heart-outline"}
                            iconColor="red"
                            size={20}
                            onPress={() => {
                                setHeart(!heart);
                            }}
                            style={styles.icon}
                            animated
                        /> */}
                    </View>
                    <Text style={{ marginBottom: 8 }} bold center>
                        {name}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                setVisible={setModalVisible}
                style={{ width: "90%" }}>
                <Grid container style={{ marginBottom: 5 }}>
                    <Grid size={10.5}>
                        <Text bold>{name}</Text>
                    </Grid>
                    <Grid size={1.5}>
                        <IconButton
                            icon="close"
                            iconColor={theme().colors.dark}
                            size={24}
                            style={styles.button}
                            animated
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        />
                    </Grid>
                </Grid>
                {/*@ts-ignore */}
                <Markdown>{file}</Markdown>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "auto",
        height: "auto",
        shadowColor: "black",
        shadowOffset: { width: 10, height: 10 },
        marginBottom: 25,
        marginHorizontal: 15,
        borderRadius: 20,
    },
    image: { width: 140, height: 140 },
    icon: {
        position: "absolute",
        top: -6,
        right: -5,
    },
    button: {
        width: 35,
        height: 35,
        borderRadius: 50,
    },
});

export default WikiElement;
