import { useContext, useState } from "react";
import { Image, Linking, StyleSheet, View } from "react-native";
import Button from "../components/button";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { FarmContext } from "../context/farmContext";
import { theme } from "../util/theme";
import Loading from "./loading";

const Home = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [farmName, setFarmName] = useState("");
    const [farmDescription, setFarmDescription] = useState("");
    const [error, setError] = useState<string>("");

    const { create } = useContext(FarmContext);
    const { userInfo, userToken }: any = useContext(AuthContext);

    if (userInfo === null) return <Loading />;

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <View style={{ width: "80%", height: "87%", marginTop: 20 }}>
                <View
                    style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}>
                    <Image
                        style={{ ...styles.logo }}
                        source={require("../../assets/farmcheckText.png")}
                    />
                </View>
                <View
                    style={{
                        marginTop: 10,
                        alignItems: "center",
                        position: "absolute",
                        bottom: 70,
                        width: "100%",
                    }}>
                    <Text bold fontSize={20} center>
                        Our Products
                    </Text>
                    <View
                        style={{
                            ...styles.imageContainer,
                            borderColor: theme().colors.secondary,
                        }}>
                        <Image
                            style={styles.image}
                            source={require("../../assets/images/shop/basicSensor.png")}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.imageContainer,
                            borderColor: theme().colors.secondary,
                        }}>
                        <Image
                            style={styles.image}
                            source={require("../../assets/images/shop/advancedSensor.png")}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.imageContainer,
                            borderColor: theme().colors.secondary,
                        }}>
                        <Image
                            style={styles.image}
                            source={require("../../assets/images/shop/wifiModule.png")}
                        />
                    </View>
                </View>
                <View
                    style={{
                        alignItems: "center",
                        marginTop: 20,
                    }}>
                    <Text center>
                        CyberTech Farmers is a team of aspiring programmers,
                        brought together by a desire to make farming more
                        efficient by bringing the combination of agriculture and
                        technology into the mainstream.
                    </Text>
                    <Button
                        onPress={async () => {
                            await Linking.openURL(
                                "https://www.facebook.com/FarmCheck-105867298851897"
                            );
                        }}
                        width={200}
                        style={{ marginTop: 10 }}
                        text="See More"
                    />
                </View>
            </View>
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
    logo: {
        objectFit: "contain",
        width: 300,
        height: 50,
        marginBottom: 5,
        marginTop: 30,
    },
    imageContainer: {
        borderRadius: 15,
        borderWidth: 2,
        width: "100%",
        position: "relative",
        height: 95,
        marginTop: 15,
    },
    image: {
        width: "100%",
        position: "absolute",
        height: 90,
        borderRadius: 15,
    },
});

export default Home;
