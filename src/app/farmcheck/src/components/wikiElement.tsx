import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { IconButton } from "react-native-paper";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import Button from "./button";
import Modal from "./modal";
import Text from "./text";

const rename = (name: string) => {
    name = name.replace(/_/g, " ");
    const words = name.split(" ");

    for (let i = 0; i < words.length; i++)
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);

    return words.join(" ");
};

const getFile = async (
    fileSrc: string,
    setContent: (content: string) => void
) => {
    // try {
    //     const asset = Asset.fromModule(
    //         require("./assets/wiki/pages/potato.md")
    //     );
    //     await asset.downloadAsync();
    //     const fileUri = asset.localUri || asset.uri;
    //     const fileContent = await FileSystem.readAsStringAsync(fileUri);
    //     console.log("File content:", fileContent);
    // } catch (error) {
    //     console.error("Error reading directories:", error);
    // }
};

const WikiElement = ({
    name,
    imgSrc,
    fileSrc,
}: {
    name: string;
    imgSrc: any;
    fileSrc: string;
}) => {
    const [hearted, setHearted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [markdownContent, setMarkdownContent] = useState("");

    name = rename(name);

    useEffect(() => {
        const fetchMarkdownFile = async () => {
            getFile(fileSrc, setMarkdownContent);
            console.log(markdownContent);
        };

        fetchMarkdownFile();
    }, [fileSrc]);

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
                        <IconButton
                            icon={hearted ? "heart" : "heart-outline"}
                            iconColor="red"
                            size={20}
                            onPress={() => {
                                setHearted(!hearted);
                            }}
                            style={styles.icon}
                            animated
                        />
                    </View>
                    <Text style={{ marginBottom: 8 }} bold center>
                        {name}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} setVisible={setModalVisible}>
                <Button text="Close" onPress={() => setModalVisible(false)} />
                {/*@ts-ignore */}
                <Markdown>{markdownContent}</Markdown>
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
});

export default WikiElement;
