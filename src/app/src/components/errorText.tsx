import { StyleSheet, View } from "react-native";
import { theme } from "../util/theme";
import Text from "./text";

const ErrorText = ({ text, style }: { text: string; style?: any }) => {
    return (
        <View style={[styles.container, style]}>
            <Text
                fontSize={25}
                bold={true}
                style={styles.dot}
                color={theme().colors.danger}>
                °
            </Text>
            <Text
                bold={true}
                color={theme().colors.danger}
                fontSize={14}
                center>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: -20,
    },
    dot: {
        marginRight: 10,
        marginTop: 12,
    },
});

export default ErrorText;
