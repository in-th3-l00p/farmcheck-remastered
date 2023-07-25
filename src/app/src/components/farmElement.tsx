import { Dimensions, Image, StyleSheet, View } from "react-native";
import FIcon from "react-native-vector-icons/FontAwesome5";
import OIcon from "react-native-vector-icons/Octicons";
import { theme } from "../util/theme";
import Text from "./text";

interface FarmElementProps {
    farm: any;
    users: any;
}

const FarmElement = ({ farm, users = [] }: FarmElementProps) => {
    const windowHeight = Dimensions.get("window").height;

    return (
        <View
            style={{
                ...styles.container,
                borderColor: theme().colors.secondary,
                height: windowHeight > 750 ? 100 : 95,
            }}>
            <Image
                style={styles.image}
                source={require("../../assets/images/defaultFarm.png")}
            />
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    marginLeft: 20,
                    width: "60%",
                }}>
                <Text bold fontSize={16}>
                    {farm.name}
                </Text>
                <Text fontSize={12} numberOfLines={2}>
                    {farm.description}
                </Text>
            </View>
            <View style={{ marginLeft: -20 }}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginVertical: 5,
                    }}>
                    <FIcon
                        name="user-friends"
                        size={20}
                        color={theme().colors.grey}
                        style={{ marginRight: 7, marginTop: 2 }}
                    />
                    <Text bold color={theme().colors.grey} fontSize={18}>
                        {users.length}
                    </Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginVertical: 5,
                    }}>
                    <OIcon
                        name="tasklist"
                        size={24}
                        color={theme().colors.grey}
                        style={{
                            marginLeft: 2.5,
                            marginRight: 8,
                            marginTop: 1,
                        }}
                    />
                    <Text bold color={theme().colors.grey} fontSize={18}>
                        0
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 3,
        width: 320,
        padding: 20,
        paddingHorizontal: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },
});

export default FarmElement;
