import { useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Searchbar } from "react-native-paper";
import PageController from "../components/pageController";
import Text from "../components/text";
import WikiElement from "../components/wikiElement";
import { loadData } from "../util/plants";
import { theme } from "../util/theme";
import Loading from "./loading";

const Wiki = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const indexOnPage = 10;

    const scrollVieRef = useRef<ScrollView>(null);

    const data: any = loadData();

    if (data.length === 0) return <Loading />;

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
                <ScrollView
                    ref={scrollVieRef}
                    style={styles.scroll}
                    overScrollMode="never">
                    <View style={styles.gridContainer}>
                        {data.map((plant: any, index: any) =>
                            searchQuery !== ""
                                ? plant.name.startsWith(
                                      searchQuery.toLowerCase()
                                  ) && (
                                      <WikiElement
                                          key={index}
                                          name={plant.name}
                                          imgSrc={plant.image}
                                          file={plant.file}
                                          heart={plant.heart}
                                          //   setHeart={(heart: boolean) => {
                                          //       data[index].heart = heart;
                                          //       saveData(data);
                                          //   }}
                                      />
                                  )
                                : index < (page + 1) * indexOnPage &&
                                  index >= page * indexOnPage && (
                                      <WikiElement
                                          key={index}
                                          name={plant.name}
                                          imgSrc={plant.image}
                                          file={plant.file}
                                          heart={plant.heart}
                                          //   setHeart={(heart: boolean) => {
                                          //       data[index].heart = heart;
                                          //       saveData(data);
                                          //   }}
                                      />
                                  )
                        )}
                    </View>

                    {searchQuery === "" && (
                        <PageController
                            max={data.length / indexOnPage - 1}
                            page={page}
                            setPage={setPage}
                            click={() => {
                                scrollVieRef.current?.scrollTo({
                                    y: 0,
                                    animated: true,
                                });
                            }}
                        />
                    )}
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
