import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import Text from "../components/text";
import WikiElement from "../components/wikiElement";
import { loadData } from "../util/plants";
import { theme } from "../util/theme";

const Wiki = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const data = loadData();

    // console.log(loadedImages);

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme().colors.background,
            }}>
            <View style={{ height: "90%", position: "absolute", top: 0 }}>
                <View style={{ marginTop: 50, marginBottom: 20 }}>
                    <Text fontSize={25} bold center>
                        Crop Wiki
                    </Text>
                    <Searchbar
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={(query) => setSearchQuery(query)}
                        style={{
                            ...styles.search,
                            backgroundColor: theme().colors.lightGrey,
                        }}
                        inputStyle={{
                            ...styles.input,
                            color: theme().colors.dark,
                        }}
                    />
                </View>
                <ScrollView style={styles.scroll} overScrollMode="never">
                    <View style={styles.gridContainer}>
                        {data.map(
                            (plant: any, index: any) =>
                                index < 20 &&
                                plant.name.startsWith(
                                    searchQuery.toLowerCase()
                                ) && (
                                    <WikiElement
                                        key={index}
                                        name={plant.name}
                                        imgSrc={plant.image}
                                        fileSrc={plant.file}
                                    />
                                )
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scroll: {
        width: "100%",
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
    },
    search: {
        marginTop: 20,
        width: 310,
        alignSelf: "center",
        height: 40,
    },
    input: {
        top: -8,
    },
});

export default Wiki;
